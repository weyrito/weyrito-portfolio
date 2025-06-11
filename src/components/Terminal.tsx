import React, { useRef, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showMobileKeyboard, setShowMobileKeyboard] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle virtual keyboard on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;
      
      if (heightDiff > 150) { // Keyboard is likely open
        setKeyboardHeight(heightDiff);
        setShowMobileKeyboard(true);
      } else {
        setKeyboardHeight(0);
        setShowMobileKeyboard(false);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  // Auto-focus on mobile with better handling
  useEffect(() => {
    if (isOpen && hiddenInputRef.current && isMobile) {
      // Delay focus on mobile to avoid issues with keyboard
      setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMobile]);

  // Enhanced focus management for mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      const handleTouchStart = (e: TouchEvent) => {
        // Only focus if touching the terminal area, not buttons
        const target = e.target as HTMLElement;
        if (!target.closest('button') && hiddenInputRef.current) {
          setTimeout(() => {
            hiddenInputRef.current?.focus();
          }, 100);
        }
      };

      const handleVisibilityChange = () => {
        if (!document.hidden && hiddenInputRef.current) {
          setTimeout(() => {
            hiddenInputRef.current?.focus();
          }, 100);
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isOpen, isMobile]);

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

  // Mobile command shortcuts
  const mobileCommands = [
    { cmd: 'help', icon: '❓', label: 'Aide' },
    { cmd: 'about', icon: '👨‍💻', label: 'À propos' },
    { cmd: 'skills', icon: '🛠️', label: 'Compétences' },
    { cmd: 'projects', icon: '📁', label: 'Projets' },
    { cmd: 'contact', icon: '📞', label: 'Contact' },
    { cmd: 'clear', icon: '🧹', label: 'Effacer' }
  ];

  const handleMobileCommand = (command: string) => {
    if (hiddenInputRef.current) {
      setCurrentInput(command);
      setCursorPosition(command.length);
      hiddenInputRef.current.focus();
      
      // Simulate Enter key press
      setTimeout(() => {
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          which: 13,
          bubbles: true
        });
        hiddenInputRef.current?.dispatchEvent(enterEvent);
      }, 100);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-cyber-darker z-50 flex flex-col ${isMobile ? 'touch-manipulation' : ''}`}
      ref={terminalRef}
      style={isMobile && showMobileKeyboard ? { 
        height: `calc(100vh - ${keyboardHeight}px)`,
        minHeight: '400px'
      } : {}}
    >
      {/* Enhanced input for mobile */}
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
        inputMode="text"
        enterKeyHint="send"
      />

      {/* Enhanced Header */}
      <div className="bg-cyber-terminal border-b-2 border-cyber-border p-2 sm:p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex gap-1 sm:gap-2">
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-status-danger"></span>
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-status-warning"></span>
          <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary-green"></span>
        </div>
        
        <div className="text-text-gray font-mono text-xs flex items-center gap-1 sm:gap-2 min-w-0">
          <span className="hidden xs:inline truncate">terminal@thomas</span>
          <span className="xs:hidden text-xs">term</span>
          {isLoading && (
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse"></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
          {isMobile && showMobileKeyboard && (
            <span className="text-xs text-primary-green" title="Clavier virtuel actif">⌨️</span>
          )}
          {lines.length > 1 && (
            <span className="text-xs text-primary-green opacity-70" title="Session restaurée">💾</span>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="text-text-gray hover:bg-status-danger hover:text-white px-2 py-1 rounded transition-colors text-sm flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="Fermer le terminal"
        >
          ✕
        </button>
      </div>

      {/* Mobile Command Shortcuts */}
      {isMobile && (
        <div className="bg-cyber-terminal/90 border-b border-cyber-border/50 p-2 flex-shrink-0">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {mobileCommands.map((item) => (
              <button
                key={item.cmd}
                onClick={() => handleMobileCommand(item.cmd)}
                className="flex-shrink-0 bg-cyber-dark/60 border border-cyber-border/50 rounded px-2 py-1 text-xs flex flex-col items-center gap-1 hover:bg-primary-green/10 hover:border-primary-green transition-all duration-200"
                style={{ minWidth: '50px' }}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-[10px] text-text-gray">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Terminal Content */}
      <div 
        className="flex-1 p-2 sm:p-4 overflow-hidden flex flex-col"
        onClick={() => {
          if (isMobile && hiddenInputRef.current) {
            hiddenInputRef.current.focus();
          }
        }}
        style={{ 
          touchAction: 'manipulation',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto font-mono text-[10px] xs:text-xs sm:text-sm leading-tight sm:leading-relaxed scroll-smooth"
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
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
                        <span className={`inline-block w-[2px] h-3 xs:h-4 sm:h-5 bg-primary-green flex-shrink-0 ${isMobile ? 'animate-pulse' : 'animate-[blink_1s_infinite]'}`}></span>
                        <span>{currentInput.slice(cursorPosition)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced suggestions for mobile */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="mt-2 ml-1 sm:ml-2 text-[10px] xs:text-xs">
                      <div className="text-cyber-cyan mb-1">💡 Suggestions:</div>
                      <div className={`grid gap-1 sm:gap-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                        {suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (isMobile) {
                                setCurrentInput(suggestion + ' ');
                                setCursorPosition(suggestion.length + 1);
                                hiddenInputRef.current?.focus();
                              }
                            }}
                            className={`text-left text-text-gray hover:text-primary-green transition-colors px-1 sm:px-2 py-1 bg-cyber-terminal/50 rounded border border-cyber-border/30 text-[10px] xs:text-xs truncate ${isMobile ? 'active:bg-primary-green/20' : ''}`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                      <div className="text-text-gray mt-1 text-[10px] xs:text-xs opacity-70">
                        {isMobile ? 'Touchez pour compléter' : 'Appuyez sur Tab pour compléter'}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Enhanced Mobile instructions */}
        {isMobile && (
          <div className="mt-2 text-[10px] text-text-gray opacity-70 border-t border-cyber-border/30 pt-2 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span>
                {showMobileKeyboard ? '⌨️ Clavier actif' : '👆 Touchez pour taper'}
              </span>
              <div className="flex gap-2">
                {!showMobileKeyboard && (
                  <button
                    onClick={() => hiddenInputRef.current?.focus()}
                    className="text-primary-green hover:text-cyber-cyan"
                  >
                    📝 Taper
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom padding when keyboard is open */}
      {isMobile && showMobileKeyboard && (
        <div style={{ height: '10px' }} className="flex-shrink-0"></div>
      )}
    </div>
  );
};

export default Terminal;
