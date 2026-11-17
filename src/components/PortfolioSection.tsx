import React, { useRef, useState } from 'react';
import { Project, PROJECTS } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  featuredWide?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, featuredWide = false }) => {
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
  const indexStr = `№ 0${index + 1}`;

  return (
    <a
      href={`#${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block w-full overflow-hidden border border-white/15 bg-[#0a0f1d] transition-all duration-300 hover:border-amber-400 focus:outline-none focus:border-amber-400 select-text ${
        featuredWide
          ? 'aspect-[16/10] sm:aspect-[21/9]'
          : 'aspect-[16/10] sm:aspect-[16/9]'
      }`}
      aria-label={`${t.portfolio.viewProject}: ${project.displayTitle}`}
    >
      {/* 1. Base Still Frame */}
      <img
        src={project.card.stillImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        loading="lazy"
      />

      {/* 2. Muted Video Preview Loop */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src={project.card.previewVideo}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ease-out ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Hairline Dark Gradient for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/50 to-transparent pointer-events-none" />

      {/* 4. Top Metadata Bar */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-300 uppercase pointer-events-none">
        <span className="flex items-center gap-2.5">
          <span className="text-amber-400 font-semibold">{indexStr}</span>
          <span className="text-slate-500">/</span>
          <span>{project.year}</span>
        </span>
        <span className="px-2.5 py-1 border border-white/20 bg-black/60 backdrop-blur-sm text-[10px] text-slate-200 group-hover:border-amber-400 group-hover:text-amber-200 transition-colors">
          {roleText}
        </span>
      </div>

      {/* 5. Bottom Title & Category Metadata */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-300 block mb-1">
            {typeText}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-light tracking-tight group-hover:text-amber-100 transition-colors">
            {project.displayTitle}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 group-hover:text-amber-300 transition-colors">
          <span className="border-b border-transparent group-hover:border-amber-300 pb-0.5">
            {t.portfolio.viewProject}
          </span>
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
    { id: 'all', label: t.portfolio.filterAll, index: '01' },
    { id: 'film', label: t.portfolio.filterFilms, index: '02' },
    { id: 'social', label: t.portfolio.filterSocial, index: '03' },
  ] as const;

  return (
    <section
      id="portfolio"
      aria-label="Portfolio Showcase"
      className="relative min-h-screen w-full bg-[#070b14] px-4 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto select-text space-y-12 sm:space-y-16">
        {/* Asymmetrical Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end border-b border-white/10 pb-10">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-amber-400 block font-medium">
              {t.portfolio.badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-slate-100 font-light tracking-tight leading-tight">
              {t.portfolio.title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {t.portfolio.subtitle}
            </p>
          </div>
        </div>

        {/* Editorial Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Filter portfolio categories"
          className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-white/10 pb-4"
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
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors focus:outline-none focus:text-amber-300 ${
                  isActive
                    ? 'text-amber-300 border-b-2 border-amber-400 font-medium'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] text-slate-500 font-mono">[{cat.index}]</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => {
            let colSpan = 'lg:col-span-6';
            let featuredWide = false;

            if (filteredProjects.length === 3) {
              if (idx === 0) colSpan = 'lg:col-span-7';
              else if (idx === 1) colSpan = 'lg:col-span-5';
              else if (idx === 2) {
                colSpan = 'lg:col-span-12';
                featuredWide = true;
              }
            } else if (filteredProjects.length === 1) {
              colSpan = 'lg:col-span-10 lg:col-start-2';
            }

            return (
              <div key={project.id} className={colSpan}>
                <ProjectCard project={project} index={idx} featuredWide={featuredWide} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
