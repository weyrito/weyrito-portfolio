import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import Section from './Section';

interface EducationSectionProps {
  education: PortfolioData['education'];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => (
  <Section title="Formations">
    <div className="space-y-4 sm:space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="border-l-4 border-cyber-cyan pl-4 sm:pl-6 hover:border-primary-green transition-colors duration-300">
          <h4 className="text-cyber-cyan text-lg sm:text-xl font-orbitron flex items-start break-words">
            <span className="text-text-gray mr-2 flex-shrink-0 mt-1">{'//'}</span>
            <span className="min-w-0">{edu.title}</span>
          </h4>
          <p className="text-text-gray italic mb-2 text-sm sm:text-base break-words">
            {edu.period}
            {edu.institution && (
              <>
                {' | '}
                {typeof edu.institution === 'string' ? (
                  edu.institution
                ) : (
                  <a
                    href={edu.institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-green hover:underline break-all"
                  >
                    {edu.institution.text}
                  </a>
                )}
              </>
            )}
          </p>
          {edu.specialization && (
            <p className="mb-2 text-sm sm:text-base break-words">
              <strong>Spécialisation:</strong> {edu.specialization}
            </p>
          )}
          {edu.subjects && (
            <ul className="space-y-1">
              {edu.subjects.map((subject, subjectIndex) => (
                <li
                  key={subjectIndex}
                  className="pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green hover:bg-primary-green/5 hover:translate-x-1 transition-all duration-300 text-sm sm:text-base"
                >
                  <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
                  <span className="break-words">{subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </Section>
);

export default EducationSection;
