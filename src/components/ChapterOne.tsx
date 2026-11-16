import React, { useRef, useState } from 'react';
import { Project, PROJECTS } from '../projectsConfig';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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

  return (
    <a
      href={`#${project.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-slate-700/90 bg-slate-900/60 shadow-[0_16px_40px_rgba(0,0,0,0.8)] transition-colors duration-500 hover:border-amber-500/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
      aria-label={`View project: ${project.title}`}
    >
      {/* 1. Base Still Frame - steady, no bounce */}
      <img
        src={project.card.stillImage}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* 2. Muted Video Preview Loop (subtle fade-in on hover without zoom/bounce) */}
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

      {/* 4. Top Tag: Sonder glimpse cue */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-300/80 uppercase">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/90" />
          <span>Project · {project.year}</span>
        </span>
        <span className="text-slate-300 group-hover:text-amber-200 transition-colors">
          {project.cardRole}
        </span>
      </div>

      {/* 5. Bottom Metadata & Title */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3 pointer-events-none">
        <div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300/90 block mb-1">
            {project.type}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-light tracking-wide group-hover:text-amber-100 transition-colors">
            {project.displayTitle}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-slate-300 group-hover:text-amber-200 transition-colors">
          <span>View project</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
};

export const ChapterOne: React.FC = () => {
  const projectsList = [PROJECTS.mustang, PROJECTS.cracked];

  return (
    <section
      id="story"
      aria-label="Story Chapter I"
      className="relative min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center px-6 py-28 select-none"
    >
      {/* Subtle separator thread */}
      <div className="w-12 h-px bg-slate-700/80 mb-12" aria-hidden="true" />

      {/* Gentle header with verified WCAG AA high-contrast typography */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
        <span className="text-xs tracking-[0.3em] uppercase font-mono text-slate-300 font-medium">
          Chapter I
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-100 font-light tracking-wide">
          Origins & Foundations
        </h2>
        <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
          The quiet beginning of a creative business, late-night pitching mechanics, and crafting a brand from scratch.
        </p>
      </div>

      {/* Project Cards: Mustang and CRACKED side-by-side (no placeholder skeletons remain) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {projectsList.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
