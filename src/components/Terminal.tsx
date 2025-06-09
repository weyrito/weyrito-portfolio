import React, { useRef, useEffect } from 'react';
import { TerminalProps } from '../types/terminal';
import { useTerminal } from '../hooks/useTerminal';

const Terminal: React.FC<TerminalProps> = ({ portfolioData, isOpen, onClose }) => {
  const {
    lines,
    currentInput,
    setCurrentInput,
    isLoading,
    cursorPosition,
    setCursorPosition,
    suggestions,
    showSuggestions,
    terminalRef,
    outputRef
  } = useTerminal({ portfolioData, isOpen, onClose });

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus sur l'input caché quand le terminal s'ouvre
  useEffect(() => {
    if (isOpen && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [isOpen]);

  // Maintenir le focus sur l'input caché
  useEffect(() => {
    if (isOpen) {
      const handleFocusLoss = () => {
        if (hiddenInputRef.current && document.activeElement !== hiddenInputRef.current) {
          setTimeout(() => {
            hiddenInputRef.current?.focus();
          }, 0);
        }
      };

      // Remettre le focus périodiquement
      const focusInterval = setInterval(() => {
        if (hiddenInputRef.current && document.activeElement !== hiddenInputRef.current) {
          hiddenInputRef.current.focus();
        }
      }, 100);

      document.addEventListener('focusout', handleFocusLoss);
      document.addEventListener('click', handleFocusLoss);

      return () => {
        clearInterval(focusInterval);
        document.removeEventListener('focusout', handleFocusLoss);
        document.removeEventListener('click', handleFocusLoss);
      };
    }
  }, [isOpen]);

  // Synchroniser l'input caché avec l'état du terminal
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = currentInput;
      hiddenInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [currentInput, cursorPosition]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const newCursorPos = e.target.selectionStart || 0;
    
    setCurrentInput(newValue);
    setCursorPosition(newCursorPos);
  };

  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPosition(target.selectionStart || 0);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-cyber-darker z-50 flex flex-col" 
      ref={terminalRef}
      onClick={() => hiddenInputRef.current?.focus()}
    >
      {/* Input caché pour capturer les frappes */}
      <input
        ref={hiddenInputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onSelect={handleInputSelect}
        className="absolute opacity-0 pointer-events-none -z-10"
        style={{ 
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px'
        }}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />

      {/* Header */}
      <div className="bg-cyber-terminal border-b-2 border-cyber-border p-2 sm:p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex gap-2">
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-status-danger"></span>
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-status-warning"></span>
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary-green"></span>
        </div>
        <div className="text-text-gray font-mono text-xs sm:text-sm flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline truncate">terminal@thomas</span>
          <span className="sm:hidden text-xs">term</span>
          {isLoading && (
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse"></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
          {lines.length > 1 && (
            <span className="text-xs text-primary-green opacity-70" title="Session restaurée">
              💾
            </span>
          )}
          <span className="text-xs text-primary-green opacity-70" title="Saisie automatique active">
            ⌨️
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-text-gray hover:bg-status-danger hover:text-white px-2 py-1 rounded transition-colors text-sm flex-shrink-0"
          aria-label="Fermer le terminal"
        >
          ✕
        </button>
      </div>
      
      {/* Terminal Content */}
      <div 
        className="flex-1 p-2 sm:p-4 overflow-hidden flex flex-col cursor-text"
        onClick={() => hiddenInputRef.current?.focus()}
      >
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto font-mono text-[10px] xs:text-xs sm:text-sm leading-tight sm:leading-relaxed scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
          onClick={() => hiddenInputRef.current?.focus()}
        >
          {lines.map((line, index) => (
            <div key={index} className="min-h-[1.2rem] sm:min-h-[1.4rem] mb-1">
              {line.type === 'welcome' && (
                <div className="text-primary-green text-center border border-cyber-border p-2 sm:p-4 my-2 sm:my-4 rounded bg-primary-green/5 whitespace-pre-wrap text-[10px] xs:text-xs sm:text-sm overflow-x-auto">
                  {line.content}
                </div>
              )}
              
              {line.type === 'output' && (
                <div className="text-text-white whitespace-pre-wrap mb-1 sm:mb-2 break-words overflow-x-auto">
                  {line.content}
                </div>
              )}
              
              {line.type === 'input' && (
                <div className="text-text-white mb-1 break-words">
                  <div className="flex flex-wrap items-start">
                    <div className="flex items-center flex-shrink-0 text-[10px] xs:text-xs sm:text-sm">
                      <span className="text-primary-green">thomas</span>
                      <span className="text-text-gray">@</span>
                      <span className="text-cyber-cyan">portfolio</span>
                      <span className="text-text-gray">:</span>
                      <span className="text-cyber-cyan">~</span>
                      <span className="text-text-white">$</span>
                    </div>
                    <div className="ml-1 break-all text-[10px] xs:text-xs sm:text-sm">
                      {line.content.replace('thomas@portfolio:~$ ', '')}
                    </div>
                  </div>
                </div>
              )}
              
              {line.type === 'prompt' && line.isCurrentInput && (
                <div className="text-text-white">
                  <div className="flex flex-wrap items-start">
                    <div className="flex items-center flex-shrink-0 text-[10px] xs:text-xs sm:text-sm">
                      <span className="text-primary-green">thomas</span>
                      <span className="text-text-gray">@</span>
                      <span className="text-cyber-cyan">portfolio</span>
                      <span className="text-text-gray">:</span>
                      <span className="text-cyber-cyan">~</span>
                      <span className="text-text-white">$</span>
                    </div>
                    <div className="ml-1 flex items-center min-w-0 flex-1">
                      <div className="break-all text-[10px] xs:text-xs sm:text-sm flex items-center">
                        <span>{currentInput.slice(0, cursorPosition)}</span>
                        <span className="inline-block w-[2px] h-3 xs:h-4 sm:h-5 bg-primary-green animate-[blink_1s_infinite] flex-shrink-0"></span>
                        <span>{currentInput.slice(cursorPosition)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Suggestions d'auto-complétion */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="mt-2 ml-2 text-[10px] xs:text-xs">
                      <div className="text-cyber-cyan mb-1">💡 Suggestions:</div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2">
                        {suggestions.map((suggestion, i) => (
                          <div key={i} className="text-text-gray hover:text-primary-green transition-colors px-1 sm:px-2 py-1 bg-cyber-terminal/50 rounded border border-cyber-border/30 text-[10px] xs:text-xs truncate">
                            {suggestion}
                          </div>
                        ))}
                      </div>
                      <div className="text-text-gray mt-1 text-[10px] xs:text-xs opacity-70">
                        Appuyez sur Tab pour compléter
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile instructions */}
        <div className="sm:hidden mt-2 text-[10px] text-text-gray opacity-70 border-t border-cyber-border/30 pt-2">
          <div className="flex justify-between items-center">
            <span>Terminal actif - Tapez directement</span>
            <span>help pour aide</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
