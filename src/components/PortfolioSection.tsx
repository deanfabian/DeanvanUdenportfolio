import React, { useRef, useState } from 'react';
import { Project, PROJECTS } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { language, t } = useLanguage();
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

  const roleText = language === 'nl' && project.cardRoleNl ? project.cardRoleNl : project.cardRole;
  const typeText = language === 'nl' && project.typeNl ? project.typeNl : project.type;

  return (
    <a
      href={`#${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/60 shadow-[0_16px_40px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
      aria-label={`${t.portfolio.viewProject}: ${project.displayTitle}`}
    >
      {/* 1. Base Still Frame */}
      <img
        src={project.card.stillImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* 2. Muted Video Preview Loop (fades in on hover) */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src={project.card.previewVideo}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-out ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Cinematic Film Shadow & Light Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 pointer-events-none" />

      {/* 4. Top Tag */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-300/90 uppercase">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>{project.year}</span>
        </span>
        <span className="px-2.5 py-1 rounded bg-slate-950/70 border border-slate-800 text-slate-300 group-hover:text-amber-200 group-hover:border-amber-500/40 transition-colors">
          {roleText}
        </span>
      </div>

      {/* 5. Bottom Metadata & Title */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3 pointer-events-none">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300/90 block mb-1">
            {typeText}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-light tracking-wide group-hover:text-amber-100 transition-colors">
            {project.displayTitle}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-300 group-hover:text-amber-200 transition-colors">
          <span>{t.portfolio.viewProject}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
};

export const PortfolioSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'film' | 'social'>('all');

  const allProjects = [PROJECTS.mustang, PROJECTS.cracked, PROJECTS.twins];

  const filteredProjects = allProjects.filter((project) => {
    if (activeCategory === 'all') return true;
    return project.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'film', label: t.portfolio.filterFilms },
    { id: 'social', label: t.portfolio.filterSocial },
  ] as const;

  return (
    <section
      id="portfolio"
      aria-label="Portfolio Showcase"
      className="relative min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-28"
    >
      {/* Subtle separator thread */}
      <div className="w-12 h-px bg-slate-700/80 mb-12" aria-hidden="true" />

      {/* Section Header with selectable text */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 select-text">
        <span className="text-xs tracking-[0.3em] uppercase font-mono text-amber-400 font-medium">
          {t.portfolio.badge}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-100 font-light tracking-tight">
          {t.portfolio.title}
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-xl mx-auto">
          {t.portfolio.subtitle}
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter portfolio categories"
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14"
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
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                isActive
                  ? 'bg-amber-400/15 border border-amber-400/80 text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.18)] font-medium'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      <div
        className={`w-full max-w-6xl mx-auto grid gap-8 ${
          filteredProjects.length === 1
            ? 'grid-cols-1 max-w-2xl'
            : filteredProjects.length === 2
            ? 'grid-cols-1 md:grid-cols-2 max-w-5xl'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
