import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import Section from './Section';

interface ExperienceSectionProps {
  experience: PortfolioData['experience'];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => (
  <Section title="Expériences">
    <div className="space-y-4 sm:space-y-6">
      {experience.map((exp, index) => (
        <div key={index} className="border-l-4 border-cyber-cyan pl-4 sm:pl-6 hover:border-primary-green transition-colors duration-300">
          <h4 className="text-cyber-cyan text-lg sm:text-xl font-orbitron flex items-start break-words">
            <span className="text-text-gray mr-2 flex-shrink-0 mt-1">{'//'}</span>
            <span className="min-w-0">{exp.title}</span>
          </h4>
          <p className="text-text-gray italic mb-3 sm:mb-4 text-sm sm:text-base break-words">
            {exp.period}{exp.location && ` | ${exp.location}`}
          </p>
          <ul className="space-y-2">
            {exp.highlights.map((highlight, highlightIndex) => (
              <li
                key={highlightIndex}
                className="pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green hover:bg-primary-green/5 hover:translate-x-1 transition-all duration-300 text-sm sm:text-base"
              >
                <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                <span className="break-words">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

export default ExperienceSection;
