import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { WelcomePage } from './components/WelcomePage';
import { PortfolioSection } from './components/PortfolioSection';
import { StorySection } from './components/StorySection';
import { ContactSection } from './components/ContactSection';
import { ProjectPage } from './components/ProjectPage';
import { PROJECTS } from './projectsConfig';
import { useLenis } from './hooks/useLenis';
import { LanguageProvider } from './context/LanguageContext';

const MainContent: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentHash(hash);

      // Handle section scroll
      if (hash === '#portfolio' || hash === '#story' || hash === '#contact' || hash === '#work') {
        const targetId = hash === '#work' ? 'portfolio' : hash.replace(/^#/, '');
        const timer = setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleBackToPortfolio = () => {
    window.location.hash = '#portfolio';
    setTimeout(() => {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const projectKey = currentHash.replace(/^#/, '');
  const activeProject = PROJECTS[projectKey];

  // Initialize Lenis smooth momentum scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f8fafc] font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {activeProject ? (
        <main>
          <ProjectPage project={activeProject} onBackToStory={handleBackToPortfolio} />
        </main>
      ) : (
        <>
          <Nav />
          <main>
            {/* Welcome Page Experience: "The Window" */}
            <WelcomePage />

            {/* Tab 1: Portfolio (Film & Fictie + Social Media & Content) */}
            <PortfolioSection />

            {/* Tab 2: Story (Dean's vision and background) */}
            <StorySection />

            {/* Tab 3: Contact (Collaboration form & deanfabianvanuden@gmail.com) */}
            <ContactSection />
          </main>
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;
