import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { useLanguage } from '../../contexts/LanguageContext';
import Section from './Section';

interface ProjectsSectionProps {
  projects: PortfolioData['projects'];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const { t } = useLanguage();
  
  return (
    <Section title={t('projects')}>
      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-cyber-dark to-cyber-terminal border border-cyber-border rounded-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-400 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:shadow-primary-green/15 hover:border-cyber-cyan group"
          >
            <div className="absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-primary-green/10 to-transparent animate-pulse group-hover:animate-none"></div>
            
            <h4 className="text-cyber-purple font-orbitron text-xl sm:text-2xl mb-2 break-words">
              {project.title}
          </h4>
          <p className="text-status-warning text-sm mb-4 uppercase tracking-wide">
            {project.type}
          </p>
          <p className="mb-4 leading-relaxed text-sm sm:text-base">
            {project.description}
          </p>
          <ul className="space-y-1 mb-4">
            <li className="text-sm break-words">
              <strong>{t('technologies')}:</strong> 
              <span className="ml-1">{project.technologies.join(', ')}</span>
            </li>
            {project.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="text-sm pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green transition-colors duration-300 break-words">
                <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                {feature}
              </li>
            ))}
          </ul>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-cyber-cyan border border-cyber-cyan px-3 sm:px-4 py-2 rounded hover:bg-cyber-cyan hover:text-cyber-dark hover:shadow-lg hover:shadow-cyber-cyan/20 hover:scale-105 transition-all duration-300 text-xs sm:text-sm break-all"
            >
              {t('seeProject')}
            </a>
          )}
        </div>
      ))}
    </div>
    </Section>
  );
};

export default ProjectsSection;
