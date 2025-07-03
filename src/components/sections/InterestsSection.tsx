import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import Section from './Section';

interface InterestsSectionProps {
  interests: PortfolioData['interests'];
}

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests }) => {
  const { t } = useLanguage();
  
  return (
    <Section title={t('interests')}>
    <ul className="space-y-3">
      {interests.map((interest, index) => (
        <li
          key={index}
          className="pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green hover:bg-primary-green/5 hover:translate-x-1 transition-all duration-300 text-sm sm:text-base"
        >
          <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
          <span className="break-words">{typeof interest === 'string' ? interest : interest.text}</span>
        </li>
      ))}
    </ul>
    </Section>
  );
};

export default InterestsSection;
