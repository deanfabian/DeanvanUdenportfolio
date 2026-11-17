import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, ExternalLink, Instagram } from 'lucide-react';
import { Project } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectPageProps {
  project: Project;
  onBackToStory: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBackToStory }) => {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  // Headline fade-in on load state
  const [headlineVisible, setHeadlineVisible] = useState(false);

  // Click-to-play video facade state
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Active gallery still index (drives the sonder private detail in the corner)
  const [activeStillIndex, setActiveStillIndex] = useState(0);

  const galleryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset video play and still index when project changes
    setIsPlayingVideo(false);
    setActiveStillIndex(0);
    setHeadlineVisible(false);

    // Scroll window to top when mounting project page
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Smooth fade-in of the opening headline
    const timer = setTimeout(() => {
      setHeadlineVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [project.id]);

  const handleStillSelect = (index: number) => {
    setActiveStillIndex(index);
  };

  // Language-aware content selection
  const isNl = language === 'nl';
  const displayTagline = isNl && project.taglineNl ? project.taglineNl : project.tagline;
  const displayLogline = isNl && project.loglineNl ? project.loglineNl : project.logline;
  const displayOutline = isNl && project.outlineNl ? project.outlineNl : project.outline;
  const displayType = isNl && project.typeNl ? project.typeNl : project.type;
  const displayRole = isNl && project.myRoleNl ? project.myRoleNl : project.myRole;
  const displayWrittenByLabel = isNl && project.writtenByLabelNl
    ? project.writtenByLabelNl
    : (project.writtenByLabel || (isNl ? 'Scenario door' : 'Written by'));

  // Opening headline: use tagline if defined; otherwise use logline
  const openingHeadline = displayTagline || displayLogline;
  const hasSeparateLoglineSection = Boolean(displayTagline && displayLogline);

  const currentStill = project.stills[activeStillIndex];
  const stillCaption = isNl && currentStill?.characterDetailNl
    ? currentStill.characterDetailNl
    : currentStill?.characterDetail;

  return (
    <article
      id={`${project.id}-page`}
      aria-label={`${project.displayTitle} Project Case Study`}
      className="min-h-screen w-full bg-[#070b14] text-slate-100 pb-28 selection:bg-amber-500/20 selection:text-amber-200 select-text"
    >
      {/* Fixed subtle back shortcut at top left */}
      <header className="fixed top-5 left-4 sm:top-6 sm:left-6 z-50">
        <button
          onClick={onBackToStory}
          type="button"
          aria-label={t.nav.backToPortfolio}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-xs font-mono tracking-widest uppercase text-slate-300 hover:text-amber-200 hover:border-amber-500/50 transition-colors duration-300 shadow-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.nav.backToPortfolio}</span>
        </button>
      </header>

      {/* ============================================================== */}
      {/* 1. OPENING: HEADLINE ALONE ON DARK SCREEN IN LARGE SERIF TYPE   */}
      {/* ============================================================== */}
      <section
        aria-label="Opening Headline"
        className="min-h-screen w-full flex flex-col items-center justify-between px-6 py-24 text-center relative"
      >
        <div className="h-6" />

        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-mono tracking-[0.35em] uppercase text-amber-400/90">
            {project.displayTitle} · {project.year}
          </p>

          <h1
            className={`font-serif ${
              displayTagline
                ? 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
                : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto'
            } font-light text-slate-100 tracking-tight leading-[1.25] transition-all duration-1000 ease-out ${
              headlineVisible || prefersReducedMotion
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {openingHeadline}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono tracking-widest text-slate-400 uppercase pt-2">
            <span>{displayType}</span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <span>{displayRole}</span>
          </div>
        </div>

        {/* Downward breathing cue leading to content */}
        <div className="flex flex-col items-center gap-2.5 opacity-70">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-400">
            {t.welcome.scrollCue}
          </span>
          <div className="w-px h-7 bg-gradient-to-b from-slate-400/80 to-transparent anim-pulse-down" />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE LOGLINE (FOLLOWS ON SCROLL, IF SEPARATE FROM TAGLINE)   */}
      {/* ============================================================== */}
      {hasSeparateLoglineSection && (
        <section
          aria-label="Film Logline"
          className="w-full max-w-3xl mx-auto px-6 py-16 text-center border-t border-slate-800/80"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 block mb-6">
            {t.portfolio.loglineLabel}
          </span>
          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-amber-100/95 font-light leading-relaxed">
            {displayLogline}
          </blockquote>
        </section>
      )}

      {/* ============================================================== */}
      {/* 3. MEDIA EMBED / SHOWCASE (16:9 RESPONSIVE)                    */}
      {/* ============================================================== */}
      <section aria-label="Media Showcase" className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/90 bg-slate-950 shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
          {project.embedUrl ? (
            !isPlayingVideo ? (
              /* Click-to-Play Facade: zero external request until user clicks */
              <button
                onClick={() => setIsPlayingVideo(true)}
                type="button"
                className="group relative w-full h-full block text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label={`Play ${project.displayTitle} film`}
              >
                {/* Thumbnail still */}
                <img
                  src={project.card.stillImage}
                  alt={`${project.displayTitle} poster`}
                  className="w-full h-full object-cover"
                />

                {/* Dark cinematic lighting vignette */}
                <div className="absolute inset-0 bg-slate-950/45 group-hover:bg-slate-950/30 transition-colors duration-500" />

                {/* Centered Golden Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/80 flex items-center justify-center text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-mono tracking-widest uppercase text-slate-200 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {isNl ? 'Film afspelen' : 'Play Film'}
                  </span>
                </div>
              </button>
            ) : (
              /* Embedded YouTube Player */
              <iframe
                src={`${project.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.displayTitle} Film`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )
          ) : (
            /* Interactive Visual Showcase for non-embed projects (e.g. Brabant Twins Instagram) */
            <a
              href={project.links.instagram || project.links.external || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full h-full block focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={`Open ${project.displayTitle} on Instagram`}
            >
              <img
                src={project.card.stillImage}
                alt={`${project.displayTitle} showcase`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30 group-hover:via-slate-950/25 transition-colors duration-500" />

              {/* Instagram Card Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-500">
                <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-[0_12px_40px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:border-sky-400/80 group-hover:scale-105">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 border border-sky-400/80 flex items-center justify-center text-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-colors group-hover:bg-sky-500 group-hover:text-slate-950">
                    <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-100 group-hover:text-sky-200 transition-colors block font-semibold">
                      {project.links.externalLabel || (isNl ? 'Bekijk @brabanttwins op Instagram' : 'View @brabanttwins on Instagram')}
                    </span>
                    <span className="text-[11px] font-mono tracking-wider text-slate-400 block">
                      instagram.com/brabanttwins ↗
                    </span>
                  </div>
                </div>
              </div>
            </a>
          )}
        </div>

        {/* External Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-6 text-xs sm:text-sm font-mono tracking-wider text-slate-300">
          {project.links.youtube && (
            <a
              href={project.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-amber-300"
            >
              <span>{t.portfolio.watchYouTube}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
            </a>
          )}
          {project.links.imdb && (
            <>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
              <a
                href={project.links.imdb}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-amber-300"
              >
                <span>{t.portfolio.viewImdb}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
              </a>
            </>
          )}
          {(project.links.instagram || project.links.external) && (
            <>
              {project.links.youtube && <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>}
              <a
                href={project.links.instagram || project.links.external}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-sky-400/60 hover:text-sky-300 transition-all duration-300 text-slate-200"
              >
                <Instagram className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                <span>{project.links.externalLabel || (isNl ? 'Bekijk op Instagram' : 'View on Instagram')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-colors" />
              </a>
            </>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE OUTLINE                                                 */}
      {/* ============================================================== */}
      <section
        aria-label="Story Outline"
        className="w-full max-w-3xl mx-auto px-6 py-16"
      >
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 block mb-4 text-center">
          {t.portfolio.outlineLabel}
        </span>
        <p className="font-serif text-base sm:text-lg text-slate-200 font-light leading-relaxed text-left sm:text-center">
          {displayOutline}
        </p>
      </section>

      {/* ============================================================== */}
      {/* 5. HORIZONTAL GALLERY STRIP WITH SONDER DETAILS                */}
      {/* ============================================================== */}
      <section aria-label="Character Stills Gallery" className="w-full max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400">
            {t.portfolio.stills}
          </span>
          <span className="text-[11px] font-mono tracking-widest text-slate-400">
            {activeStillIndex + 1} / {project.stills.length}
          </span>
        </div>

        {/* Featured Still Frame */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl mb-5">
          <img
            src={project.stills[activeStillIndex]?.image}
            alt={project.stills[activeStillIndex]?.alt}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* SONDER TOUCH: In the corner of the gallery, one small low-emphasis line */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none">
            <div className="inline-block px-4 py-2 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/60 shadow-lg pointer-events-auto">
              <p className="text-xs sm:text-sm font-serif italic text-amber-100 font-light tracking-wide">
                {stillCaption}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Thumbnail Strip */}
        <div
          ref={galleryScrollRef}
          className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none"
        >
          {project.stills.map((still, idx) => (
            <button
              key={still.id}
              onClick={() => handleStillSelect(idx)}
              type="button"
              className={`relative flex-shrink-0 w-32 sm:w-44 aspect-video rounded-lg overflow-hidden border transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                activeStillIndex === idx
                  ? 'border-amber-400 ring-1 ring-amber-400/50'
                  : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
              }`}
              aria-label={`View still ${idx + 1}: ${still.alt}`}
            >
              <img
                src={still.image}
                alt={still.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CREDITS BLOCK (STYLED LIKE FILM END CREDITS)                */}
      {/* ============================================================== */}
      <section
        aria-label="Film End Credits"
        className="w-full max-w-3xl mx-auto px-6 py-20 border-t border-slate-800/80 text-center"
      >
        <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-amber-400/90 block mb-12">
          {t.portfolio.credits}
        </span>

        <div className="space-y-10">
          {/* Written by / Disciplines */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              {displayWrittenByLabel}
            </span>
            <p className="font-serif text-base sm:text-lg text-slate-100 font-light">
              {project.writtenBy}
            </p>
          </div>

          {/* Crew */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              Crew
            </span>
            <p className="font-serif text-base sm:text-lg text-slate-100 font-light leading-relaxed">
              {project.crew}
            </p>
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              Cast
            </span>
            <p className="font-serif text-base sm:text-lg text-slate-100 font-light leading-relaxed">
              {project.cast}
            </p>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              {isNl ? 'Locaties' : 'Locations'}
            </span>
            <p className="font-serif text-base sm:text-lg text-slate-100 font-light">
              {project.locations}
            </p>
          </div>

          {/* Production & Year */}
          <div className="pt-6 space-y-2 border-t border-slate-800/50 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              {isNl ? 'Productie' : 'Production'}
            </span>
            <p className="font-serif text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              {project.production}
            </p>
            <p className="text-xs font-mono text-slate-400 pt-1 tracking-widest">
              {project.shot ? `${isNl ? 'Gedraaid' : 'Shot'}: ${project.shot} · ` : ''}{isNl ? 'Jaar' : 'Year'}: {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. QUIET ENDING LINK: "TERUG NAAR PORTFOLIO"                   */}
      {/* ============================================================== */}
      <footer className="text-center pt-8">
        <button
          onClick={onBackToStory}
          type="button"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-slate-400 hover:text-amber-200 transition-colors duration-300 focus:outline-none focus:text-amber-300"
        >
          <span aria-hidden="true">←</span>
          <span>{t.nav.backToPortfolio}</span>
        </button>
      </footer>
    </article>
  );
};
