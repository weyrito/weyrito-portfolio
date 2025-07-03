import React from 'react';
import { PortfolioData, SkillItem } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import Section from './Section';

interface SkillsSectionProps {
  skills: PortfolioData['skills'];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { t } = useLanguage();
  
  return (
    <Section title={t('skills')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {Object.values(skills).map((skill, index) => (
          <div
            key={index}
            className="bg-cyber-dark/60 border border-cyber-border rounded-lg p-4 sm:p-6 transition-all duration-300 relative overflow-hidden hover:border-cyber-cyan hover:scale-105 group"
          >
            <div className="absolute top-[-2px] left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan transition-all duration-300 group-hover:left-0"></div>
            <h4 className="text-cyber-cyan mb-3 sm:mb-4 text-lg sm:text-xl font-orbitron flex items-center break-words">
              <span className="text-text-gray mr-2 flex-shrink-0">{'//'}</span>
              <span className="min-w-0">{skill.title}</span>
            </h4>
            <ul className="space-y-2">
              {skill.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green hover:bg-primary-green/5 hover:translate-x-1 transition-all duration-300 relative text-sm sm:text-base"
                >
                  <span className="text-primary-green mr-2 text-sm flex-shrink-0">▶</span>
                  {typeof item === 'string' ? (
                    <span className="break-words">{item}</span>
                  ) : (
                    <a
                      href={(item as SkillItem).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit hover:text-primary-green hover:shadow-lg hover:shadow-primary-green/20 transition-all duration-300 relative break-words"
                    >
                      {(item as SkillItem).text}
                      <span className="text-xs ml-1 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300">🔗</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;
