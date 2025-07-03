import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { portfolioDataEN } from '../data/portfolio-en';
import { translations } from '../data/translations';
import { PortfolioData } from '../types/portfolio';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  portfolioData: PortfolioData;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  // Get portfolio data based on current language
  const currentPortfolioData = language === 'en' ? portfolioDataEN : portfolioData;

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        portfolioData: currentPortfolioData,
        t
      }}
    >
      {/* Éviter le flash en attendant que la langue soit chargée depuis localStorage */}
      {isLoaded ? children : (
        <div className="min-h-screen bg-cyber-darker flex items-center justify-center">
          <div className="text-primary-green font-orbitron text-xl animate-pulse">
            Loading...
          </div>
        </div>
      )}
    </LanguageContext.Provider>
  );
};
