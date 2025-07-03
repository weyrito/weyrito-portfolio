import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onGenerateCV: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGenerateCV }) => {
  const { portfolioData, t } = useLanguage();
  const { personal } = portfolioData;

  return (
    <header className="relative p-4 sm:p-8 md:p-16 text-center bg-gradient-to-br from-cyber-darker to-cyber-dark border-b-2 border-cyber-border overflow-hidden">
      {/* Language switcher positioned in top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="absolute top-0 left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan animate-scanLine"></div>
      
      <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-green uppercase tracking-wider mb-4 animate-glitch relative break-words">
        {personal.name}
        <span className="animate-blink">_</span>
      </h1>
      
      <h2 className="text-lg sm:text-xl md:text-2xl text-cyber-cyan mb-6 opacity-90 px-2">
        {personal.title}
      </h2>
      
      <div className="text-text-gray text-xs sm:text-sm mb-6 px-2 space-y-2 sm:space-y-0">
        <div className="block sm:inline">
          <strong>Email:</strong>{' '}
          <a 
            href={`mailto:${personal.email}`} 
            className="text-text-white hover:text-primary-green transition-colors underline break-all"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {personal.email}
          </a>
        </div>
        <span className="hidden sm:inline"> | </span>
        <div className="block sm:inline">
          <strong>{t('phone')}:</strong> 
          <span className="ml-1">{personal.phone}</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
        <button
          onClick={onGenerateCV}
          className="w-full sm:w-auto group bg-gradient-to-r from-primary-green to-cyber-cyan border-2 border-primary-green text-cyber-dark px-6 sm:px-8 py-3 rounded-lg font-mono font-bold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide shadow-lg shadow-primary-green/30 hover:scale-105 hover:shadow-xl hover:shadow-primary-green/50 inline-flex items-center justify-center relative overflow-hidden"
        >
          <span className="mr-2 text-lg animate-pulse">📄</span>
          <span className="text-xs sm:text-sm">{t('downloadCV')}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
