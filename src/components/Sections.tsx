import React from 'react';
import { PortfolioData, SkillItem } from '../types/portfolio';

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section: React.FC<SectionProps> = ({ children, title }) => (
  <section className="m-4 sm:m-6 md:m-8 lg:m-12 p-4 sm:p-6 md:p-8 bg-cyber-terminal/80 border border-cyber-border rounded-xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-green/10 hover:border-primary-green group">
    <div className="absolute top-0 left-[-100%] w-full h-0.5 bg-gradient-to-r from-primary-green to-cyber-cyan transition-all duration-500 group-hover:left-0"></div>
    <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl text-primary-green mb-4 sm:mb-6 uppercase tracking-wide border-l-4 border-primary-green pl-3 sm:pl-4 relative break-words">
      <span className="text-cyber-cyan">&gt; </span>
      {title}
    </h3>
    {children}
  </section>
);

export const AboutSection: React.FC<{ personal: PortfolioData['personal'] }> = ({ personal }) => (
  <Section title="À propos">
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

export const SkillsSection: React.FC<{ skills: PortfolioData['skills'] }> = ({ skills }) => (
  <Section title="Compétences techniques">
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

export const ProjectsSection: React.FC<{ projects: PortfolioData['projects'] }> = ({ projects }) => (
  <Section title="Projets réalisés">
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
              <strong>Technologies:</strong> 
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
              Voir le site
            </a>
          )}
        </div>
      ))}
    </div>
  </Section>
);

export const ExperienceSection: React.FC<{ experience: PortfolioData['experience'] }> = ({ experience }) => (
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

export const EducationSection: React.FC<{ education: PortfolioData['education'] }> = ({ education }) => (
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

export const LanguagesSection: React.FC<{ languages: PortfolioData['languages'] }> = ({ languages }) => (
  <Section title="Langues">
    <ul className="space-y-3">
      {languages.map((lang, index) => (
        <li
          key={index}
          className="pl-3 sm:pl-4 border-l-2 border-transparent hover:border-primary-green hover:bg-primary-green/5 hover:translate-x-1 transition-all duration-300 text-sm sm:text-base"
        >
          <span className="text-primary-green mr-2 flex-shrink-0">▶</span>
          <span className="break-words"><strong>{lang.language}:</strong> {lang.level}</span>
        </li>
      ))}
    </ul>
  </Section>
);

export const InterestsSection: React.FC<{ interests: PortfolioData['interests'] }> = ({ interests }) => (
  <Section title="Centres d'intérêt">
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
