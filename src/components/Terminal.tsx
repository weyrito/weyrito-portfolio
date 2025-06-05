import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PortfolioData } from '../types/portfolio';

interface TerminalProps {
  portfolioData: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLine {
  type: 'prompt' | 'input' | 'output' | 'welcome';
  content: string;
  isCurrentInput?: boolean;
}

interface TerminalState {
  lines: TerminalLine[];
  commandHistory: string[];
  hasShownWelcome: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ portfolioData, isOpen, onClose }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const PROMPT = 'thomas@portfolio:~$ ';
  const STORAGE_KEY = 'thomas-portfolio-terminal-state';

  // Commandes disponibles
  const COMMANDS = [
    'help', 'about', 'skills', 'projects', 'experience', 'education', 
    'languages', 'contact', 'ls', 'cat', 'pwd', 'whoami', 'date', 'clear', 'exit'
  ];

  // Fichiers disponibles
  const FILES = ['README.md', 'portfolio.json', 'skills.txt', 'contact.info'];

  // Sauvegarder l'état du terminal
  const saveTerminalState = useCallback(() => {
    const state: TerminalState = {
      lines: lines.filter(line => !line.isCurrentInput),
      commandHistory,
      hasShownWelcome
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Impossible de sauvegarder l\'état du terminal:', error);
    }
  }, [lines, commandHistory, hasShownWelcome]);

  // Charger l'état du terminal
  const loadTerminalState = useCallback((): TerminalState | null => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.warn('Impossible de charger l\'état du terminal:', error);
    }
    return null;
  }, []);

  // Effacer l'état du terminal
  const clearTerminalState = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Impossible d\'effacer l\'état du terminal:', error);
    }
  }, []);

  // Auto-scroll optimisé
  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      requestAnimationFrame(() => {
        outputRef.current!.scrollTop = outputRef.current!.scrollHeight;
      });
    }
  }, []);

  // Focus automatique sur l'input caché
  const focusTerminal = useCallback(() => {
    if (isOpen && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-complétion
  const getCompletions = useCallback((input: string): string[] => {
    const [cmd, ...args] = input.trim().split(' ');
    
    if (args.length === 0) {
      // Complétion de commande
      return COMMANDS.filter(command => command.startsWith(cmd.toLowerCase()));
    } else if (cmd.toLowerCase() === 'cat' && args.length === 1) {
      // Complétion de fichier pour la commande cat
      return FILES.filter(file => file.toLowerCase().startsWith(args[0].toLowerCase()));
    }
    
    return [];
  }, []);

  // Gestion de l'auto-complétion avec Tab
  const handleTabCompletion = useCallback(() => {
    const inputBeforeCursor = currentInput.slice(0, cursorPosition);
    const inputAfterCursor = currentInput.slice(cursorPosition);
    const completions = getCompletions(inputBeforeCursor);
    
    if (completions.length === 1) {
      // Une seule completion, on l'applique
      const [cmd, ...args] = inputBeforeCursor.trim().split(' ');
      let newInput = '';
      
      if (args.length === 0) {
        // Complétion de commande
        newInput = completions[0] + ' ' + inputAfterCursor;
        setCursorPosition(completions[0].length + 1);
      } else if (cmd.toLowerCase() === 'cat' && args.length === 1) {
        // Complétion de fichier
        newInput = cmd + ' ' + completions[0] + inputAfterCursor;
        setCursorPosition(cmd.length + 1 + completions[0].length);
      }
      
      setCurrentInput(newInput);
      setShowSuggestions(false);
    } else if (completions.length > 1) {
      // Plusieurs completions, on affiche les suggestions
      setSuggestions(completions);
      setShowSuggestions(true);
      
      // Trouver le préfixe commun
      const commonPrefix = completions.reduce((prefix, completion) => {
        let common = '';
        for (let i = 0; i < Math.min(prefix.length, completion.length); i++) {
          if (prefix[i].toLowerCase() === completion[i].toLowerCase()) {
            common += prefix[i];
          } else {
            break;
          }
        }
        return common;
      });
      
      // Appliquer le préfixe commun s'il est plus long que l'input actuel
      const [cmd, ...args] = inputBeforeCursor.trim().split(' ');
      if (args.length === 0 && commonPrefix.length > cmd.length) {
        const newInput = commonPrefix + inputAfterCursor;
        setCurrentInput(newInput);
        setCursorPosition(commonPrefix.length);
      } else if (cmd.toLowerCase() === 'cat' && args.length === 1 && commonPrefix.length > args[0].length) {
        const newInput = cmd + ' ' + commonPrefix + inputAfterCursor;
        setCurrentInput(newInput);
        setCursorPosition(cmd.length + 1 + commonPrefix.length);
      }
    } else {
      setShowSuggestions(false);
    }
  }, [currentInput, cursorPosition, getCompletions]);

  const createWelcomeMessage = useCallback(() => {
    return `╔══════════════════════════════════════════════════════════╗
║                  THOMAS FOUQUET TERMINAL                 ║
╚══════════════════════════════════════════════════════════╝

🚀 Bienvenue dans mon portfolio interactif !
⌨️  Tapez 'help' pour voir les commandes disponibles.
💡 Utilisez ↑/↓ pour naviguer dans l'historique.
🔄 Utilisez Tab pour l'auto-complétion.`;
  }, []);

  const createHelpMessage = useCallback(() => {
    return `🔧 Commandes disponibles:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Portfolio:
  about       - À propos de moi
  skills      - Compétences techniques  
  projects    - Projets réalisés
  experience  - Expériences professionnelles
  education   - Formation
  languages   - Langues parlées
  contact     - Informations de contact

📁 Fichiers:
  ls          - Lister les fichiers
  cat <file>  - Afficher le contenu d'un fichier

⚙️  Système:
  pwd         - Afficher le répertoire courant
  whoami      - Afficher l'utilisateur
  date        - Afficher la date et l'heure
  clear       - Effacer le terminal
  exit        - Retourner au portfolio

🎮 Navigation:
  ↑/↓         - Historique des commandes
  Tab         - Auto-complétion des commandes et fichiers
  Ctrl+L      - Effacer le terminal
  Ctrl+C      - Interrompre la commande`;
  }, []);

  const executeCommand = useCallback((input: string): string => {
    const [cmd, ...args] = input.trim().split(' ');

    switch (cmd.toLowerCase()) {
      case 'help':
        return createHelpMessage();
      
      case 'about':
        return `👨‍💻 ${portfolioData.personal.name}
🎓 ${portfolioData.personal.title}

📝 ${portfolioData.personal.about}

🎯 ${portfolioData.personal.status} dans la ${portfolioData.personal.location}

💼 Toujours prêt pour de nouveaux défis !`;
      
      case 'skills':
        return Object.values(portfolioData.skills)
          .filter(skill => !skill.excludeFromCV)
          .map(skill => {
            const items = skill.items.map(item => {
              if (typeof item === 'string') {
                return `    ▶ ${item}`;
              } else {
                return `    ▶ ${item.text}${item.url ? ` [🔗 ${item.url}]` : ''}`;
              }
            }).join('\n');
            return `🛡️  ${skill.title}:\n${items}`;
          }).join('\n\n');
      
      case 'projects':
        return portfolioData.projects
          .filter(project => !project.excludeFromCV)
          .map((project, i) => {
            const icons = ['🥊', '🌐', '🌱'];
            const icon = icons[i] || '📁';
            return `${icon} ${project.title}
   📊 Type: ${project.type}
   🔧 Technologies: ${project.technologies.join(', ')}
   ${project.url ? `🔗 URL: ${project.url}` : ''}
   ${project.features.map(f => `   ✅ ${f}`).join('\n')}`;
          }).join('\n\n');
      
      case 'experience':
        return portfolioData.experience
          .filter(exp => !exp.excludeFromCV)
          .map(exp => `💼 ${exp.title} (${exp.period})${exp.location ? `\n   📍 ${exp.location}` : ''}\n${exp.highlights.map(h => `   ▶ ${h}`).join('\n')}`)
          .join('\n\n');
      
      case 'education':
        return portfolioData.education
          .filter(edu => !edu.excludeFromCV)
          .map(edu => {
            let result = `🎓 ${edu.title} (${edu.period})`;
            if (edu.institution) {
              if (typeof edu.institution === 'string') {
                result += `\n   🏫 ${edu.institution}`;
              } else {
                result += `\n   🏫 ${edu.institution.text} [🔗 ${edu.institution.url}]`;
              }
            }
            if (edu.specialization) result += `\n   🎯 Spécialisation: ${edu.specialization}`;
            return result;
          }).join('\n\n');
      
      case 'languages':
        const flags: Record<string, string> = { 
          'Français': '🇫🇷', 
          'Anglais': '🇬🇧', 
          'Espagnol': '🇪🇸' 
        };
        return portfolioData.languages
          .filter(lang => !lang.excludeFromCV)
          .map(lang => {
            const flag = flags[lang.language] || '🗣️';
            return `${flag} ${lang.language}: ${lang.level}`;
          }).join('\n');
      
      case 'contact':
        return `📞 Informations de contact:

📧 Email: ${portfolioData.personal.email}
📱 Téléphone: ${portfolioData.personal.phone}
🌍 Localisation: ${portfolioData.personal.location}
💼 Statut: ${portfolioData.personal.status}

🔗 Liens sociaux:
  • GitHub: ${portfolioData.personal.social.github}
  • LinkedIn: ${portfolioData.personal.social.linkedin}

💡 N'hésitez pas à me contacter pour toute opportunité !`;
      
      case 'ls':
        return `📁 Contenu du répertoire:

drwxr-xr-x  thomas  thomas  4096  README.md
-rw-r--r--  thomas  thomas  2048  portfolio.json
-rw-r--r--  thomas  thomas  1024  skills.txt
-rw-r--r--  thomas  thomas   512  contact.info

💡 Utilisez 'cat <filename>' pour afficher le contenu
🔄 Utilisez Tab pour l'auto-complétion des noms de fichiers`;
      
      case 'cat':
        if (!args[0]) return `❌ Usage: cat <filename>

📁 Fichiers disponibles:
${FILES.map(file => `  • ${file}`).join('\n')}

💡 Utilisez Tab pour l'auto-complétion`;
        
        switch (args[0].toLowerCase()) {
          case 'readme.md':
            return `# Portfolio Thomas Fouquet

Étudiant en cybersécurité passionné par les technologies souveraines.

## Objectif
Contribuer à renforcer la souveraineté numérique française.

## Compétences clés
- Cybersécurité & analyse de vulnérabilités
- Administration système Linux
- Développement web moderne

💡 Tapez 'help' pour explorer mes compétences !`;
          
          case 'portfolio.json':
            return `{
  "name": "${portfolioData.personal.name}",
  "status": "${portfolioData.personal.status}",
  "specialization": "Cybersécurité",
  "projects_count": ${portfolioData.projects.length},
  "skills_categories": ${Object.keys(portfolioData.skills).length}
}`;

          case 'skills.txt':
            return `📋 COMPÉTENCES TECHNIQUES

${Object.values(portfolioData.skills)
  .filter(skill => !skill.excludeFromCV)
  .map(skill => `${skill.title}:\n${skill.items.map(item => 
    typeof item === 'string' ? `  - ${item}` : `  - ${item.text}`
  ).join('\n')}`).join('\n\n')}`;

          case 'contact.info':
            return `📞 CONTACT INFORMATION

Name: ${portfolioData.personal.name}
Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
Location: ${portfolioData.personal.location}
Status: ${portfolioData.personal.status}

Social Links:
- GitHub: ${portfolioData.personal.social.github}
- LinkedIn: ${portfolioData.personal.social.linkedin}`;
          
          default:
            return `❌ cat: ${args[0]}: Fichier introuvable

📁 Fichiers disponibles:
${FILES.map(file => `  • ${file}`).join('\n')}

💡 Utilisez Tab pour l'auto-complétion`;
        }
      
      case 'pwd':
        return '/home/thomas/portfolio';
      
      case 'whoami':
        return `thomas

👨‍💻 Étudiant passionné en cybersécurité
🎯 Toujours en quête d'apprentissage et de défis`;
      
      case 'date':
        const now = new Date();
        return `📅 ${now.toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
⏰ ${now.toLocaleTimeString('fr-FR')}
🌍 Fuseau horaire: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
      
      case 'clear':
        return 'CLEAR_COMMAND';
      
      case 'exit':
        setTimeout(() => onClose(), 500);
        return '👋 Fermeture du terminal... À bientôt !';
      
      default:
        const cmdSuggestions = COMMANDS.filter(c => c.startsWith(cmd.toLowerCase())).slice(0, 3);
        let errorMsg = `❌ bash: ${cmd}: commande introuvable`;
        
        if (cmdSuggestions.length > 0) {
          errorMsg += `\n💡 Peut-être vouliez-vous dire: ${cmdSuggestions.join(', ')}`;
        }
        errorMsg += `\n🔧 Tapez 'help' pour voir toutes les commandes disponibles`;
        errorMsg += `\n🔄 Utilisez Tab pour l'auto-complétion`;
        
        return errorMsg;
    }
  }, [portfolioData, createHelpMessage, onClose]);

  const addPromptLine = useCallback(() => {
    setLines(prev => [...prev, { type: 'prompt', content: PROMPT, isCurrentInput: true }]);
  }, []);

  const handleCommand = useCallback((command: string) => {
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Ajouter la commande tapée à l'affichage
    setLines(prev => {
      const newLines = [...prev];
      // Remplacer la ligne de prompt par la ligne complète avec la commande
      newLines[newLines.length - 1] = {
        type: 'input',
        content: PROMPT + command,
        isCurrentInput: false
      };
      return newLines;
    });

    // Simuler un délai de traitement
    setTimeout(() => {
      const output = executeCommand(command);
      
      if (output === 'CLEAR_COMMAND') {
        setLines([]);
        // Effacer l'état sauvegardé aussi
        clearTerminalState();
        setHasShownWelcome(false);
        addPromptLine();
      } else {
        setLines(prev => [
          ...prev,
          { type: 'output', content: output },
        ]);
        
        // Ajouter une nouvelle ligne de prompt après la sortie
        setTimeout(() => {
          addPromptLine();
        }, 50);
      }
      
      setIsLoading(false);
    }, 100);

    // Mettre à jour l'historique
    setCommandHistory(prev => {
      const newHistory = [...prev, command];
      return newHistory.slice(-50);
    });
    setHistoryIndex(-1);
    setCurrentInput('');
    setCursorPosition(0);
  }, [executeCommand, addPromptLine, clearTerminalState]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (isLoading) return;

    // Cacher les suggestions sur certaines touches
    if (!['Tab', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      setShowSuggestions(false);
    }

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
          // Ligne vide, juste ajouter un nouveau prompt
          setLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = {
              type: 'input',
              content: PROMPT,
              isCurrentInput: false
            };
            return newLines;
          });
          setTimeout(() => addPromptLine(), 50);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          const newInput = commandHistory[newIndex];
          setCurrentInput(newInput);
          setCursorPosition(newInput.length);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput('');
            setCursorPosition(0);
          } else {
            setHistoryIndex(newIndex);
            const newInput = commandHistory[newIndex];
            setCurrentInput(newInput);
            setCursorPosition(newInput.length);
          }
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        setCursorPosition(prev => Math.max(0, prev - 1));
        break;

      case 'ArrowRight':
        e.preventDefault();
        setCursorPosition(prev => Math.min(currentInput.length, prev + 1));
        break;

      case 'Home':
        e.preventDefault();
        setCursorPosition(0);
        break;

      case 'End':
        e.preventDefault();
        setCursorPosition(currentInput.length);
        break;

      case 'Backspace':
        e.preventDefault();
        if (cursorPosition > 0) {
          const newInput = currentInput.slice(0, cursorPosition - 1) + currentInput.slice(cursorPosition);
          setCurrentInput(newInput);
          setCursorPosition(prev => prev - 1);
        }
        break;

      case 'Delete':
        e.preventDefault();
        if (cursorPosition < currentInput.length) {
          const newInput = currentInput.slice(0, cursorPosition) + currentInput.slice(cursorPosition + 1);
          setCurrentInput(newInput);
        }
        break;

      default:
        if (e.ctrlKey) {
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
                const newLines = [...prev];
                newLines[newLines.length - 1] = {
                  type: 'input',
                  content: PROMPT + currentInput + '^C',
                  isCurrentInput: false
                };
                return newLines;
              });
              setTimeout(() => addPromptLine(), 50);
              break;
            case 'a':
              setCursorPosition(0);
              break;
            case 'e':
              setCursorPosition(currentInput.length);
              break;
          }
        } else if (e.key.length === 1 && !e.altKey && !e.metaKey) {
          e.preventDefault();
          // Caractère normal
          const newInput = currentInput.slice(0, cursorPosition) + e.key + currentInput.slice(cursorPosition);
          setCurrentInput(newInput);
          setCursorPosition(prev => prev + 1);
        }
        break;
    }
  }, [currentInput, cursorPosition, commandHistory, historyIndex, isLoading, handleCommand, addPromptLine, handleTabCompletion]);

  // Mettre à jour la ligne de prompt actuelle avec l'input en cours
  useEffect(() => {
    setLines(prev => {
      const newLines = [...prev];
      if (newLines.length > 0 && newLines[newLines.length - 1].isCurrentInput) {
        newLines[newLines.length - 1] = {
          type: 'prompt',
          content: PROMPT + currentInput,
          isCurrentInput: true
        };
      }
      return newLines;
    });
  }, [currentInput, PROMPT]);

  // Initialisation avec restauration de l'état
  useEffect(() => {
    if (isOpen) {
      const savedState = loadTerminalState();
      
      if (savedState && savedState.lines.length > 0) {
        // Restaurer l'état précédent
        setLines(savedState.lines);
        setCommandHistory(savedState.commandHistory);
        setHasShownWelcome(savedState.hasShownWelcome);
        
        // Toujours ajouter un nouveau prompt après restauration car on filtre les prompts actifs lors de la sauvegarde
        setTimeout(() => addPromptLine(), 100);
      } else if (!hasShownWelcome) {
        // Premier démarrage - afficher le message de bienvenue
        setLines([
          { type: 'welcome', content: createWelcomeMessage() },
        ]);
        setTimeout(() => addPromptLine(), 100);
        setHasShownWelcome(true);
      } else {
        // Session vide mais déjà initialisée, juste ajouter un prompt
        setTimeout(() => addPromptLine(), 100);
      }
    }
  }, [isOpen, hasShownWelcome, createWelcomeMessage, addPromptLine, loadTerminalState]);

  // Sauvegarder l'état quand le terminal se ferme
  useEffect(() => {
    if (!isOpen && lines.length > 0) {
      saveTerminalState();
    }
  }, [isOpen, saveTerminalState, lines.length]);

  // Sauvegarder l'état périodiquement pendant l'utilisation
  useEffect(() => {
    if (isOpen && lines.length > 0) {
      const timeoutId = setTimeout(() => {
        saveTerminalState();
      }, 1000); // Sauvegarder après 1 seconde d'inactivité

      return () => clearTimeout(timeoutId);
    }
  }, [lines, commandHistory, hasShownWelcome, isOpen, saveTerminalState]);

  // Auto-scroll
  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Focus
  useEffect(() => {
    if (isOpen) {
      focusTerminal();
    }
  }, [isOpen, focusTerminal]);

  // Nettoyage à la fermeture - SUPPRIMER cette partie pour maintenir la persistance
  // useEffect(() => {
  //   if (!isOpen) {
  //     setLines([]);
  //     setCurrentInput('');
  //     setCommandHistory([]);
  //     setHistoryIndex(-1);
  //     setHasShownWelcome(false);
  //     setIsLoading(false);
  //     setCursorPosition(0);
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //   }
  // }, [isOpen]);

  // Nettoyage minimal à la fermeture - garder seulement l'état de l'input courant
  useEffect(() => {
    if (!isOpen) {
      setCurrentInput('');
      setHistoryIndex(-1);
      setIsLoading(false);
      setCursorPosition(0);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cyber-darker z-50 flex flex-col" ref={terminalRef}>
      {/* Header */}
      <div className="bg-cyber-terminal border-b-2 border-cyber-border p-3 flex items-center justify-between flex-shrink-0">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-status-danger"></span>
          <span className="w-3 h-3 rounded-full bg-status-warning"></span>
          <span className="w-3 h-3 rounded-full bg-primary-green"></span>
        </div>
        <div className="text-text-gray font-mono text-sm flex items-center gap-2">
          <span className="hidden sm:inline">thomas@portfolio: ~</span>
          <span className="sm:hidden">terminal</span>
          {isLoading && (
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse"></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 h-1 bg-primary-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}
          {/* Indicateur de session persistante */}
          {lines.length > 1 && (
            <span className="text-xs text-primary-green opacity-70" title="Session restaurée">
              💾
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-text-gray hover:bg-status-danger hover:text-white px-2 py-1 rounded transition-colors text-sm"
          aria-label="Fermer le terminal"
        >
          ✕
        </button>
      </div>
      
      {/* Terminal Content */}
      <div 
        className="flex-1 p-4 overflow-hidden flex flex-col cursor-text"
        onClick={focusTerminal}
      >
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {lines.map((line, index) => (
            <div key={index} className="min-h-[1.4rem]">
              {line.type === 'welcome' && (
                <div className="text-primary-green text-center border border-cyber-border p-4 my-4 rounded bg-primary-green/5 whitespace-pre-wrap">
                  {line.content}
                </div>
              )}
              
              {line.type === 'output' && (
                <div className="text-text-white whitespace-pre-wrap mb-2">
                  {line.content}
                </div>
              )}
              
              {line.type === 'input' && (
                <div className="text-text-white mb-1">
                  <span className="text-primary-green">thomas@portfolio</span>
                  <span className="text-text-gray">:</span>
                  <span className="text-cyber-cyan">~</span>
                  <span className="text-text-white">$ {line.content.replace('thomas@portfolio:~$ ', '')}</span>
                </div>
              )}
              
              {line.type === 'prompt' && line.isCurrentInput && (
                <div className="text-text-white">
                  <div className="flex items-center">
                    <span className="text-primary-green">thomas@portfolio</span>
                    <span className="text-text-gray">:</span>
                    <span className="text-cyber-cyan">~</span>
                    <span className="text-text-white">$</span>
                    <span className="ml-1">{currentInput.slice(0, cursorPosition)}</span>
                    <span className="inline-block w-1 h-6 text-lg animate-[blink_1s_infinite]">|</span>
                    <span>{currentInput.slice(cursorPosition)}</span>
                  </div>
                  
                  {/* Suggestions d'auto-complétion */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="mt-1 ml-4 text-xs">
                      <div className="text-cyber-cyan mb-1">💡 Suggestions:</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {suggestions.map((suggestion, i) => (
                          <div key={i} className="text-text-gray hover:text-primary-green transition-colors px-2 py-1 bg-cyber-terminal/50 rounded border border-cyber-border/30">
                            {suggestion}
                          </div>
                        ))}
                      </div>
                      <div className="text-text-gray mt-1 text-xs opacity-70">
                        Appuyez sur Tab pour compléter
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input caché pour capturer les événements clavier */}
      <input
        ref={hiddenInputRef}
        type="text"
        className="fixed -left-[9999px] opacity-0 pointer-events-none"
        value=""
        onChange={() => {}} // Géré par onKeyDown
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
};

export default Terminal;
