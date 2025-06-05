import React from 'react';
import { PersonalInfo } from '../types/portfolio';

interface FooterProps {
  personal: PersonalInfo;
}

const Footer: React.FC<FooterProps> = ({ personal }) => {
  return (
    <footer className="text-center p-12 bg-gradient-to-br from-cyber-darker to-cyber-dark border-t-2 border-cyber-border mt-16 relative">
      <p className="text-xl font-bold mb-8">
        <strong>{personal.status} dans la {personal.location}</strong>
      </p>
      
      <div className="flex justify-center gap-8 mb-8 flex-wrap">
        <a
          href={personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl">🐙</span>
          <span className="font-medium tracking-wide">GitHub</span>
        </a>
        
        <a
          href={personal.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl">💼</span>
          <span className="font-medium tracking-wide">LinkedIn</span>
        </a>
        
        <a
          href={personal.social.email}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-cyber-terminal/80 border border-cyber-border rounded-lg text-text-white hover:transform hover:-translate-y-1 hover:scale-105 hover:border-primary-green hover:shadow-xl hover:shadow-primary-green/20 hover:bg-primary-green/10 transition-all duration-300 font-mono text-sm backdrop-blur-xl"
        >
          <span className="text-xl">📧</span>
          <span className="font-medium tracking-wide">Email</span>
        </a>
      </div>
      
      <p className="mb-4">Portfolio mis à jour en mai 2025</p>
      <p className="text-sm text-text-gray">
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
    </footer>
  );
};

export default Footer;
