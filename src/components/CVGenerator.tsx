import React from 'react';
import { CVGenerator } from '../utils/cvGenerator';
import { useLanguage } from '../contexts/LanguageContext';

interface CVGeneratorProps {
  children: (generateCV: () => Promise<void>) => React.ReactNode;
}

const CVGeneratorComponent: React.FC<CVGeneratorProps> = ({ children }) => {
  const { portfolioData, language } = useLanguage();
  
  const generateCV = async (): Promise<void> => {
    try {
      const generator = new CVGenerator(portfolioData, language);
      await generator.generatePDF();
      
      // Notification de succès
      if (typeof window !== 'undefined') {
        console.log('✅ CV généré avec succès ! Tous les liens sont cliquables.');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la génération du CV:', error);
      
      // Afficher une notification d'erreur plus détaillée
      if (typeof window !== 'undefined') {
        alert('Erreur lors de la génération du CV. Vérifiez la console pour plus de détails.');
      }
      throw error;
    }
  };

  return <>{children(generateCV)}</>;
};

export default CVGeneratorComponent;
