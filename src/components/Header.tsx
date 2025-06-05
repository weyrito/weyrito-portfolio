import React from 'react';
import { PersonalInfo } from '../types/portfolio';

interface HeaderProps {
  personal: PersonalInfo;
  onOpenTerminal: () => void;
  onGenerateCV: () => void;
}

const Header: React.FC<HeaderProps> = ({ personal, onOpenTerminal, onGenerateCV }) => {
  return (
    <header className="relative p-16 text-center bg-gradient-to-br from-cyber-darker to-cyber-dark border-b-2 border-cyber-border overflow-hidden">
      <div className="absolute top-0 left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan animate-scanLine"></div>
      
      <h1 className="font-orbitron text-5xl md:text-6xl font-black text-primary-green uppercase tracking-wider mb-4 animate-glitch relative">
        {personal.name}
        <span className="animate-blink">_</span>
      </h1>
      
      <h2 className="text-xl md:text-2xl text-cyber-cyan mb-6 opacity-90">
        {personal.title}
      </h2>
      
      <p className="text-text-gray text-sm mb-6">
        <strong>Email:</strong>{' '}
        <a 
          href={`mailto:${personal.email}`} 
          className="text-text-white hover:text-primary-green transition-colors underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          {personal.email}
        </a>
        {' | '}
        <strong>Téléphone:</strong> {personal.phone}
      </p>
      
      <div className="flex gap-4 justify-center items-center flex-wrap">
        <button
          onClick={onGenerateCV}
          className="group bg-gradient-to-r from-primary-green to-cyber-cyan border-2 border-primary-green text-cyber-dark px-8 py-3 rounded-lg font-mono font-bold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide shadow-lg shadow-primary-green/30 hover:scale-105 hover:shadow-xl hover:shadow-primary-green/50 inline-flex items-center relative overflow-hidden"
        >
          <span className="mr-2 text-lg animate-pulse">📄</span>
          Voir CV
        </button>
        
        <button
          onClick={onOpenTerminal}
          className="group bg-gradient-to-r from-primary-green to-cyber-cyan border-2 border-primary-green text-cyber-dark px-8 py-3 rounded-lg font-mono font-bold text-sm cursor-pointer transition-all duration-300 uppercase tracking-wide shadow-lg shadow-primary-green/30 hover:scale-105 hover:shadow-xl hover:shadow-primary-green/50 inline-flex items-center relative overflow-hidden"
        >
          <span className="mr-2 text-lg font-bold">&gt;</span>
          Mode Terminal
        </button>
      </div>
    </header>
  );
};

export default Header;
