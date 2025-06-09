import { TerminalState } from '../types/terminal';

const STORAGE_KEY = 'thomas-portfolio-terminal-state';

export const saveTerminalState = (
  lines: TerminalState['lines'],
  commandHistory: string[],
  hasShownWelcome: boolean
): void => {
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
};

export const loadTerminalState = (): TerminalState | null => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.warn('Impossible de charger l\'état du terminal:', error);
  }
  return null;
};

export const clearTerminalState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Impossible d\'effacer l\'état du terminal:', error);
  }
};
