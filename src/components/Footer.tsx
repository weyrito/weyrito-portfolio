import React from 'react';
import Link from 'next/link';
import { PersonalInfo } from '../types/portfolio';

interface FooterProps {
  personal: PersonalInfo;
}

const Footer: React.FC<FooterProps> = ({ personal }) => {
  return (
    <footer className="text-center p-6 sm:p-8 md:p-12 bg-gradient-to-br from-cyber-darker to-cyber-dark border-t-2 border-cyber-border mt-8 sm:mt-12 md:mt-16 relative">
      <p className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 px-2 break-words">
        <strong>{personal.status} dans la {personal.location}</strong>
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 px-4">
        <a
          href={personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl flex-shrink-0">🐙</span>
          <span className="font-medium tracking-wide">GitHub</span>
        </a>
        
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl flex-shrink-0">💼</span>
          <span className="font-medium tracking-wide">LinkedIn</span>
        </a>
        
        <a
          href={personal.social.email}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl flex-shrink-0">📧</span>
          <span className="font-medium tracking-wide">Email</span>
        </a>
      </div>
      
      <p className="mb-4 text-sm sm:text-base px-2">Portfolio mis à jour en juin 2025</p>
      
      <div className="text-xs sm:text-sm text-text-gray px-2 space-y-2">
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/privacy" 
            className="text-cyber-cyan hover:text-primary-green hover:underline transition-colors"
          >
            🔒 Politique de confidentialité
          </Link>
          <span className="text-primary-green">•</span>
          <span title="Aucun cookie de tracking">🍪 Sans cookies</span>
          <span className="text-primary-green">•</span>
          <span title="Conforme au Règlement Général sur la Protection des Données">✅ RGPD</span>
        </div>
        
        <p className="break-words">
          📄 Ce projet est sous{' '}
          <a
            href="https://github.com/weyrito/weyrito-portfolio/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline"
          >
            licence MIT
          </a>
          {' '}- Code source libre et réutilisable
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
