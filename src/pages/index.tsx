import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Terminal from '../components/Terminal';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import CVGeneratorComponent from '../components/CVGenerator';
import { 
  AboutSection, 
  SkillsSection, 
  ProjectsSection, 
  ExperienceSection, 
  EducationSection,
  LanguagesSection,
  InterestsSection 
} from '../components/sections';
import { portfolioData } from '../data/portfolio';

const HomePage: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleOpenTerminal = () => {
    setIsTerminalOpen(true);
  };

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cyber-darker">
        <CVGeneratorComponent portfolioData={portfolioData}>
          {(generateCV) => (
            <Header 
              personal={portfolioData.personal}
              onOpenTerminal={handleOpenTerminal}
              onGenerateCV={generateCV}
            />
          )}
        </CVGeneratorComponent>
        
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <AboutSection personal={portfolioData.personal} />
          <SkillsSection skills={portfolioData.skills} />
          <ProjectsSection projects={portfolioData.projects} />
          <ExperienceSection experience={portfolioData.experience} />
          <EducationSection education={portfolioData.education} />
          <LanguagesSection languages={portfolioData.languages} />
          <InterestsSection interests={portfolioData.interests} />
        </main>
        
        <Footer personal={portfolioData.personal} />
        
        <Terminal 
          portfolioData={portfolioData}
          isOpen={isTerminalOpen}
          onClose={handleCloseTerminal}
        />
        
        <CookieConsent />
      </div>
    </Layout>
  );
};

export default HomePage;
