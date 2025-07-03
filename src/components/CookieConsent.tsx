import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'thomas-portfolio-consent';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si le consentement a déjà été donné
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setTimeout(() => {
        setShowConsent(true);
        setIsVisible(true);
      }, 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      accepted: true,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      accepted: false,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  if (!showConsent) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'
    }`}>
      <div className="bg-cyber-terminal/95 backdrop-blur-xl border-t-2 border-cyber-border p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0">🍪</span>
                <div>
                  <h3 className="text-primary-green font-orbitron text-lg font-bold mb-2">
                    Respect de votre vie privée
                  </h3>
                  <p className="text-text-white text-sm leading-relaxed">
                    Ce site ne utilise <strong>aucun cookie de tracking</strong> ou de publicité. 
                    Seules les préférences utilisateur sont stockées localement dans votre navigateur 
                    pour améliorer votre expérience.
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-text-gray">
                <Link 
                  href="/privacy" 
                  className="text-cyber-cyan hover:text-primary-green underline"
                >
                  Politique de confidentialité
                </Link>
                {' | '}
                <span>Aucune donnée personnelle collectée</span>
                {' | '}
                <span>Conforme RGPD</span>
              </div>
            </div>
            
            <div className="flex flex-col xs:flex-row gap-2 w-full lg:w-auto">
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-primary-green text-cyber-dark font-mono font-bold text-sm rounded hover:bg-primary-green/90 transition-colors"
              >
                ✓ J&apos;accepte
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-transparent border border-text-gray text-text-gray font-mono text-sm rounded hover:border-text-white hover:text-text-white transition-colors"
              >
                ✗ Refuser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;