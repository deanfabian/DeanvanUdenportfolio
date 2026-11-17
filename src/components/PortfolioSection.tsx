import React, { useRef, useState } from 'react';
import { Project, PROJECTS } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!prefersReducedMotion && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const isNl = language === 'nl';
  const roleText = isNl && project.cardRoleNl ? project.cardRoleNl : project.cardRole;
  const typeText = isNl && project.typeNl ? project.typeNl : project.type;
  const isPortrait = (project.cardAspectRatio || project.aspectRatio) === 'portrait';

  return (
    <a
      href={`#${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block w-full ${
        isPortrait ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-[16/10] sm:aspect-[16/9]'
      } overflow-hidden border border-white/15 bg-[#0a0f1d] hover:border-white/40 transition-colors focus:outline-none focus:border-amber-400 select-text`}
      aria-label={`${project.displayTitle} →`}
    >
      {/* 1. Base Still Frame */}
      <img
        src={project.card.stillImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        loading="lazy"
      />

      {/* 2. Muted Video Preview Loop */}
      {!prefersReducedMotion && project.card.previewVideo && (
        <video
          ref={videoRef}
          src={project.card.previewVideo}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ease-out ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Shadow scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/55 to-transparent pointer-events-none" />

      {/* 4. Top Meta */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs font-mono tracking-wider text-slate-300 pointer-events-none">
        <span>{project.year}</span>
        <span>{roleText}</span>
      </div>

      {/* 5. Bottom Title Link & Type */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-1 pointer-events-none">
        <p className="text-xs font-sans text-slate-300 leading-snug">
          {typeText}
        </p>
        <div className="pt-1">
          <span className="font-serif text-2xl sm:text-3xl text-slate-100 font-normal group-hover:text-amber-200 transition-colors">
            {project.displayTitle} →
          </span>
        </div>
      </div>
    </a>
  );
};

export const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'film' | 'social' | 'design' | 'photography'>('all');

  // Complete portfolio collection across all disciplines
  const allProjects = [
    PROJECTS.mustang,
    PROJECTS.cracked,
    PROJECTS.twins,
    PROJECTS['throwers-lab'],
    PROJECTS['beyond-bases'],
    PROJECTS['logo-design'],
    PROJECTS['twins-graphics'],
    PROJECTS['boer-tot-bord'],
    PROJECTS.unpluggd,
    PROJECTS.photography,
  ].filter(Boolean);

  const filteredProjects = allProjects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'film', label: t.portfolio.filterFilms },
    { id: 'social', label: t.portfolio.filterSocial },
    { id: 'design', label: t.portfolio.filterDesign },
    { id: 'photography', label: t.portfolio.filterPhotography },
  ] as const;

  return (
    <section
      id="portfolio"
      aria-label="Portfolio"
      className="relative min-h-screen w-full bg-[#070b14] px-4 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10"
    >
      <div className="w-full max-w-6xl mx-auto select-text space-y-10 sm:space-y-12">
        {/* Clean Header: "Portfolio" */}
        <div className="border-b border-white/10 pb-6">
          <h2 className="font-serif text-3xl sm:text-5xl text-slate-100 font-light tracking-tight">
            {t.portfolio.title}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter portfolio categories"
          className="flex flex-wrap items-center gap-4 sm:gap-6 border-b border-white/10 pb-4 text-xs font-mono tracking-wider"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`py-1 transition-colors focus:outline-none ${
                  isActive
                    ? 'text-amber-300 border-b border-amber-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: adapts to portrait and landscape formats naturally */}
        <div className="columns-1 md:columns-2 gap-8 sm:gap-10 space-y-8 sm:space-y-10 [column-fill:_balance]">
          {filteredProjects.map((project) => (
            <div key={project.id} className="break-inside-avoid">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
