import React, { useState, useEffect } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { ChapterOne } from './components/ChapterOne';
import { ProjectPage } from './components/ProjectPage';
import { PROJECTS } from './projectsConfig';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    // If initial load or returning with #story, scroll down to story section
    if (window.location.hash === '#story') {
      const timer = setTimeout(() => {
        const el = document.getElementById('story');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        clearTimeout(timer);
      };
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentHash]);

  const handleBackToStory = () => {
    window.location.hash = '#story';
  };

  const projectKey = currentHash.replace(/^#/, '');
  const activeProject = PROJECTS[projectKey];

  // Initialize Lenis smooth momentum scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f8fafc] font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {activeProject ? (
        <main>
          <ProjectPage project={activeProject} onBackToStory={handleBackToStory} />
        </main>
      ) : (
        <main>
          {/* Welcome Page Experience: "The Window" (500vh pin sequence) */}
          <WelcomePage />

          {/* Chapter I: Origins & Foundations with Mustang and CRACKED project cards */}
          <ChapterOne />
        </main>
      )}
    </div>
  );
};

export default App;
