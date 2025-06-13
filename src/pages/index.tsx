import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Header from '../components/Header';
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
  const router = useRouter();

  const handleOpenTerminal = () => {
    router.push('/terminal');
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
        <CookieConsent />
      </div>
    </Layout>
  );
};

export default HomePage;
