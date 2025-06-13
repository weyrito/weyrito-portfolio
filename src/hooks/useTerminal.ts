import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TerminalLine, 
  UseTerminalProps, 
  UseTerminalReturn,
  TERMINAL_PROMPT
} from '../types/terminal';
import { executeCommand } from '../utils/terminalCommands';
import { saveTerminalState, loadTerminalState, clearTerminalState } from '../utils/terminalStorage';

export const useTerminal = ({ portfolioData, isOpen, onClose }: UseTerminalProps): UseTerminalReturn => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Supprimer les constantes liées aux fichiers si elles ne sont plus utilisées
  const TERMINAL_COMMANDS = [
    'help', 'about', 'skills', 'projects', 'experience', 
    'education', 'languages', 'contact', 'pwd', 'whoami', 
    'date', 'clear', 'exit'
  ];

  // Auto-complétion simplifiée
  const getCompletions = useCallback((input: string): string[] => {
    const [cmd = ''] = input.trim().split(' ');
    
    // Seules les commandes principales sont autocompletées
    return TERMINAL_COMMANDS.filter(command => command.startsWith(cmd.toLowerCase()));
  }, []);

  // Gestion de l'auto-complétion avec Tab
  const handleTabCompletion = useCallback(() => {
    const inputBeforeCursor = currentInput.slice(0, cursorPosition);
    const inputAfterCursor = currentInput.slice(cursorPosition);
    const completions = getCompletions(inputBeforeCursor);
    
    if (completions.length === 1) {
      const [cmd = '', ...args] = inputBeforeCursor.trim().split(' ');
      const completion = completions[0];
      if (!completion) return;
      
      let newInput = '';
      
      if (args.length === 0) {
        newInput = completion + ' ' + inputAfterCursor;
        setCursorPosition(completion.length + 1);
      } else if (cmd && cmd.toLowerCase() === 'cat' && args.length === 1) {
        newInput = cmd + ' ' + completion + inputAfterCursor;
        setCursorPosition(cmd.length + 1 + completion.length);
      }
      
      setCurrentInput(newInput);
      setShowSuggestions(false);
    } else if (completions.length > 1) {
      setSuggestions(completions);
      setShowSuggestions(true);
      
      // Trouver le préfixe commun
      const commonPrefix = completions.reduce((prefix, completion) => {
        let common = '';
        for (let i = 0; i < Math.min(prefix.length, completion.length); i++) {
          if (prefix[i] && completion[i] && prefix[i]!.toLowerCase() === completion[i]!.toLowerCase()) {
            common += prefix[i];
          } else {
            break;
          }
        }
        return common;
      });
      
      // Appliquer le préfixe commun s'il est plus long que l'input actuel
      const [cmd = '', ...args] = inputBeforeCursor.trim().split(' ');
      if (args.length === 0 && commonPrefix.length > cmd.length) {
        const newInput = commonPrefix + inputAfterCursor;
        setCurrentInput(newInput);
        setCursorPosition(commonPrefix.length);
      } else if (cmd.toLowerCase() === 'cat' && args.length === 1 && args[0] && commonPrefix.length > args[0]!.length) {
        const newInput = cmd + ' ' + commonPrefix + inputAfterCursor;
        setCurrentInput(newInput);
        setCursorPosition(cmd.length + 1 + commonPrefix.length);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [currentInput, cursorPosition, getCompletions]);

  const addPromptLine = useCallback(() => {
    setLines(prev => {
      const hasActivePrompt = prev.length > 0 && prev[prev.length - 1]?.isCurrentInput;
      if (hasActivePrompt) {
        return prev;
      }
      return [...prev, { type: 'prompt', content: TERMINAL_PROMPT, isCurrentInput: true }];
    });
  }, []);

  const handleCommand = useCallback((command: string) => {
    setIsLoading(true);
    setShowSuggestions(false);
    
    setLines(prev => {
      const newLines = prev.filter(line => !line.isCurrentInput);
      newLines.push({
        type: 'input',
        content: TERMINAL_PROMPT + command,
        isCurrentInput: false
      });
      return newLines;
    });

    setTimeout(() => {
      const output = executeCommand(command, portfolioData);
      
      if (output === 'CLEAR_COMMAND') {
        setLines([]);
        clearTerminalState();
        setHasShownWelcome(false);
        addPromptLine();
      } else {
        if (command.trim() === 'exit') {
          setTimeout(() => onClose(), 500);
        }
        
        setLines(prev => [
          ...prev,
          { type: 'output', content: output },
        ]);
        
        setTimeout(() => {
          addPromptLine();
        }, 50);
      }
      
      setIsLoading(false);
    }, 100);

    setCommandHistory(prev => {
      const newHistory = [...prev, command];
      return newHistory.slice(-50);
    });
    setHistoryIndex(-1);
    setCurrentInput('');
    setCursorPosition(0);
  }, [portfolioData, addPromptLine, onClose]);

  // Détection améliorée du clavier mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const detectMobileKeyboard = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (!isMobile) return;

      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const heightDiff = windowHeight - viewportHeight;
      
      setIsMobileKeyboardOpen(heightDiff > 150);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', detectMobileKeyboard);
      return () => {
        window.visualViewport?.removeEventListener('resize', detectMobileKeyboard);
      };
    } else {
      window.addEventListener('resize', detectMobileKeyboard);
      return () => {
        window.removeEventListener('resize', detectMobileKeyboard);
      };
    }
  }, []);

  // Gestionnaire d'événements clavier simplifié
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || isLoading) return;

    // Prévenir le comportement par défaut pour la plupart des touches sur mobile afin d'éviter des comportements indésirables
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        handleTabCompletion();
        break;

      case 'Enter':
        e.preventDefault();
        if (currentInput.trim()) {
          handleCommand(currentInput.trim());
        } else {
          setLines(prev => {
            const newLines = prev.filter(line => !line.isCurrentInput);
            newLines.push({
              type: 'input',
              content: TERMINAL_PROMPT,
              isCurrentInput: false
            });
            return newLines;
          });
          setTimeout(() => addPromptLine(), 50);
        }
        break;

      case 'ArrowUp':
        if (!isMobile || !isMobileKeyboardOpen) {
          e.preventDefault();
          if (commandHistory.length > 0) {
            const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            const newInput = commandHistory[newIndex] || '';
            setCurrentInput(newInput);
            setCursorPosition(newInput.length);
          }
        }
        break;

      case 'ArrowDown':
        if (!isMobile || !isMobileKeyboardOpen) {
          e.preventDefault();
          if (historyIndex !== -1) {
            const newIndex = historyIndex + 1;
            if (newIndex >= commandHistory.length) {
              setHistoryIndex(-1);
              setCurrentInput('');
              setCursorPosition(0);
            } else {
              setHistoryIndex(newIndex);
              const newInput = commandHistory[newIndex] || '';
              setCurrentInput(newInput);
              setCursorPosition(newInput.length);
            }
          }
        }
        break;

      default:
        if (e.ctrlKey && !isMobile) {
          e.preventDefault();
          switch (e.key) {
            case 'l':
              setLines([]);
              addPromptLine();
              break;
            case 'c':
              setCurrentInput('');
              setCursorPosition(0);
              setLines(prev => {
                const newLines = prev.filter(line => !line.isCurrentInput);
                newLines.push({
                  type: 'input',
                  content: TERMINAL_PROMPT + currentInput + '^C',
                  isCurrentInput: false
                });
                return newLines;
              });
              setTimeout(() => addPromptLine(), 50);
              break;
          }
        }
        break;
    }
  }, [currentInput, commandHistory, historyIndex, isOpen, isLoading, handleCommand, addPromptLine, handleTabCompletion, isMobileKeyboardOpen]);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      requestAnimationFrame(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      });
    }
  }, [lines]);

  // Mettre à jour la ligne de prompt actuelle
  useEffect(() => {
    setLines(prev => {
      const newLines = [...prev];
      const lastLineIndex = newLines.length - 1;
      
      if (lastLineIndex >= 0 && newLines[lastLineIndex]?.isCurrentInput) {
        newLines[lastLineIndex] = {
          type: 'prompt',
          content: TERMINAL_PROMPT + currentInput,
          isCurrentInput: true
        };
      }
      return newLines;
    });
  }, [currentInput]);

  // Initialisation
  useEffect(() => {
    if (isOpen) {
      const savedState = loadTerminalState();
      
      if (savedState && savedState.lines.length > 0) {
        setLines(savedState.lines);
        setCommandHistory(savedState.commandHistory);
        setHasShownWelcome(savedState.hasShownWelcome);
        setTimeout(() => addPromptLine(), 100);
      } else {
        // Supprimer l'affichage du message d'accueil
        setTimeout(() => addPromptLine(), 100);
        setHasShownWelcome(true);
      }
    }
  }, [isOpen, hasShownWelcome, addPromptLine]);

  // Sauvegarde
  useEffect(() => {
    if (!isOpen && lines.length > 0) {
      saveTerminalState(lines, commandHistory, hasShownWelcome);
    }
  }, [isOpen, lines, commandHistory, hasShownWelcome]);

  // Sauvegarde périodique
  useEffect(() => {
    if (isOpen && lines.length > 0) {
      const timeoutId = setTimeout(() => {
        saveTerminalState(lines, commandHistory, hasShownWelcome);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    return () => {};
  }, [lines, commandHistory, hasShownWelcome, isOpen]);

  // Gestionnaire d'événements clavier
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {};
  }, [isOpen, handleKeyDown]);

  // Nettoyage à la fermeture
  useEffect(() => {
    if (!isOpen) {
      setCurrentInput('');
      setHistoryIndex(-1);
      setIsLoading(false);
      setCursorPosition(0);
      setSuggestions([]);
      setShowSuggestions(false);
    }
    return () => {};
  }, [isOpen]);

  return {
    lines,
    currentInput,
    setCurrentInput,
    isLoading,
    cursorPosition,
    setCursorPosition,
    suggestions,
    showSuggestions,
    handleKeyDown,
    terminalRef,
    outputRef
  };
};
