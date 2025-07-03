import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Custom404: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Layout 
      title={`404 - ${t('pageNotFoundTitle')} - Thomas Fouquet`}
      description={t('pageNotFoundDescription')}
    >
      <div className="min-h-screen bg-cyber-darker flex items-center justify-center px-4 relative">
        {/* Language switcher positioned in top right */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-cyber-terminal/80 border border-cyber-border rounded-xl p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
            {/* Ligne décorative animée */}
            <div className="absolute top-0 left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan animate-scanLine"></div>
            
            {/* Code d'erreur */}
            <div className="font-orbitron text-6xl sm:text-8xl font-black text-primary-green mb-6 animate-glitch">
              404
            </div>
            
            {/* Message principal */}
            <h1 className="text-2xl sm:text-3xl text-cyber-cyan font-orbitron mb-4">
              {t('pageNotFound')}
            </h1>
            
            <p className="text-text-gray mb-8 text-lg leading-relaxed">
              {t('pageNotFoundMessage')}
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-green text-cyber-dark font-mono font-bold text-sm rounded-lg hover:bg-primary-green/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-green/30"
              >
                <span className="mr-2">🏠</span>
                {t('backToHome')}
              </Link>
            </div>
            
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;
