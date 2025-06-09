import { PortfolioData } from './portfolio';

export interface TerminalProps {
  portfolioData: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export interface TerminalLine {
  type: 'prompt' | 'input' | 'output' | 'welcome';
  content: string;
  isCurrentInput?: boolean;
}

export interface TerminalState {
  lines: TerminalLine[];
  commandHistory: string[];
  hasShownWelcome: boolean;
}

export interface UseTerminalProps {
  portfolioData: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export interface UseTerminalReturn {
  lines: TerminalLine[];
  currentInput: string;
  setCurrentInput: (input: string) => void;
  isLoading: boolean;
  cursorPosition: number;
  setCursorPosition: (pos: number | ((prev: number) => number)) => void;
  suggestions: string[];
  showSuggestions: boolean;
  handleKeyDown: (e: KeyboardEvent) => void;
  terminalRef: React.RefObject<HTMLDivElement>;
  outputRef: React.RefObject<HTMLDivElement>;
}

export const TERMINAL_COMMANDS = [
  'help', 'about', 'skills', 'projects', 'experience', 'education', 
  'languages', 'contact', 'ls', 'cat', 'pwd', 'whoami', 'date', 'clear', 'exit'
] as const;

export const TERMINAL_FILES = ['README.md', 'portfolio.json', 'skills.txt', 'contact.info'] as const;

export const TERMINAL_PROMPT = 'thomas@portfolio:~$ ';
export const STORAGE_KEY = 'thomas-portfolio-terminal-state';
