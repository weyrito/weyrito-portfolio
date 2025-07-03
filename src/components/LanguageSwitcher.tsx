import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-cyber-terminal/50 backdrop-blur-sm border border-cyber-border rounded-lg p-1">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded text-sm font-mono transition-all duration-200 ${
          language === 'fr'
            ? 'bg-primary-green text-cyber-dark font-bold'
            : 'text-text-gray hover:text-primary-green hover:bg-primary-green/10'
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded text-sm font-mono transition-all duration-200 ${
          language === 'en'
            ? 'bg-primary-green text-cyber-dark font-bold'
            : 'text-text-gray hover:text-primary-green hover:bg-primary-green/10'
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
