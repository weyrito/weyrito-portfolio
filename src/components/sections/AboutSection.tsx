import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import Section from './Section';

interface AboutSectionProps {
  personal: PortfolioData['personal'];
}

const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  const { t } = useLanguage();
  
  return (
    <Section title={t('about')}>
      <div itemScope itemType="https://schema.org/Person">
        <meta itemProp="name" content="Thomas Fouquet" />
        <meta itemProp="jobTitle" content={personal.title} />
        <meta itemProp="email" content={personal.email} />
        <p className="text-justify hyphens-auto leading-relaxed text-sm sm:text-base" itemProp="description">
          {personal.about}
        </p>
      </div>
    </Section>
  );
};

export default AboutSection;
