import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowLeft, ExternalLink } from 'lucide-react';
import { Project } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectPageProps {
  project: Project;
  onBackToStory: () => void;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBackToStory }) => {
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

  // Opening headline: use tagline if defined; otherwise use logline
  const openingHeadline = project.tagline || project.logline;
  const hasSeparateLoglineSection = Boolean(project.tagline && project.logline);
  const writtenByLabel = project.writtenByLabel || 'Written by';

  return (
    <article
      id={`${project.id}-page`}
      aria-label={`${project.displayTitle} Project Case Study`}
      className="min-h-screen w-full bg-[#070b14] text-slate-100 select-none pb-28 selection:bg-amber-500/20 selection:text-amber-200"
    >
      {/* Fixed subtle back shortcut at top left */}
      <header className="fixed top-6 left-6 z-50">
        <button
          onClick={onBackToStory}
          type="button"
          aria-label="Back to the story"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-xs font-mono tracking-widest uppercase text-slate-300 hover:text-amber-200 hover:border-amber-500/50 transition-colors duration-300 shadow-xl focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to the story</span>
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
              project.tagline
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
            <span>{project.type}</span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
            <span>{project.myRole}</span>
          </div>
        </div>

        {/* Downward breathing cue leading to content */}
        <div className="flex flex-col items-center gap-2.5 opacity-70">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-slate-400">
            Scroll to read
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
            Logline
          </span>
          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-amber-100/95 font-light leading-relaxed">
            {project.logline}
          </blockquote>
        </section>
      )}

      {/* ============================================================== */}
      {/* 3. FILM EMBED WITH CLICK-TO-PLAY FACADE (16:9 RESPONSIVE)      */}
      {/* ============================================================== */}
      <section aria-label="Film Player" className="w-full max-w-4xl mx-auto px-6 py-8">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/90 bg-slate-950 shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
          {!isPlayingVideo ? (
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

              {/* Centered Golden Play Button - steady, no scale bounce */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/80 flex items-center justify-center text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase text-slate-200 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Play Film
                </span>
              </div>
            </button>
          ) : (
            /* Embedded YouTube Player starting at beginning */
            <iframe
              src={`${project.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={`${project.displayTitle} Film`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* Understated External Links */}
        <div className="flex items-center justify-center gap-8 mt-6 text-xs sm:text-sm font-mono tracking-wider text-slate-300">
          <a
            href={project.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-amber-300"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
          </a>
          {project.links.imdb && (
            <>
              <span className="text-slate-700" aria-hidden="true">·</span>
              <a
                href={project.links.imdb}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 transition-colors duration-300 hover:text-amber-300"
              >
                <span>View on IMDb</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
              </a>
            </>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. THE OUTLINE (ONE SHORT PARAGRAPH)                           */}
      {/* ============================================================== */}
      <section
        aria-label="Story Outline"
        className="w-full max-w-3xl mx-auto px-6 py-16"
      >
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400 block mb-4 text-center">
          Outline
        </span>
        <p className="font-serif text-base sm:text-lg text-slate-200 font-light leading-relaxed text-left sm:text-center">
          {project.outline}
        </p>
      </section>

      {/* ============================================================== */}
      {/* 5. HORIZONTAL GALLERY STRIP WITH SONDER CHARACTER DETAILS      */}
      {/* ============================================================== */}
      <section aria-label="Character Stills Gallery" className="w-full max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-slate-400">
            Scene Stills
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
            <div className="inline-block px-4 py-2 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/60 shadow-lg">
              <p className="text-xs sm:text-sm font-serif italic text-amber-100 font-light tracking-wide">
                {project.stills[activeStillIndex]?.characterDetail}
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
          Credits
        </span>

        <div className="space-y-10">
          {/* Written by / Originally written by */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              {writtenByLabel}
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
              Locations
            </span>
            <p className="font-serif text-base sm:text-lg text-slate-100 font-light">
              {project.locations}
            </p>
          </div>

          {/* Production & Year */}
          <div className="pt-6 space-y-2 border-t border-slate-800/50 max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400 block">
              Production
            </span>
            <p className="font-serif text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              {project.production}
            </p>
            <p className="text-xs font-mono text-slate-400 pt-1 tracking-widest">
              {project.shot ? `Shot: ${project.shot} · ` : ''}Year: {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. QUIET ENDING LINK: "BACK TO THE STORY"                      */}
      {/* ============================================================== */}
      <footer className="text-center pt-8">
        <button
          onClick={onBackToStory}
          type="button"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-slate-400 hover:text-amber-200 transition-colors duration-300 focus:outline-none focus:text-amber-300"
        >
          <span aria-hidden="true">←</span>
          <span>Back to the story</span>
        </button>
      </footer>
    </article>
  );
};
