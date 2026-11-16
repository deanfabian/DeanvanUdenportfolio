import React from 'react';

export const NextSectionPlaceholder: React.FC = () => {
  return (
    <section
      id="story"
      aria-label="Story Chapter Continuation"
      className="relative min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center px-6 py-24 select-none"
    >
      {/* Subtle separator thread */}
      <div className="w-12 h-px bg-slate-800/80 mb-12" />

      {/* Gentle placeholder header for the future story chapter */}
      <div className="text-center max-w-md mx-auto space-y-4">
        <span className="text-[11px] tracking-[0.3em] uppercase font-mono text-slate-500">
          Chapter I
        </span>
        <h2 className="font-serif text-2xl md:text-3xl text-slate-300 font-light tracking-wide">
          Origins & Foundations
        </h2>
        <p className="text-sm text-slate-500 font-light leading-relaxed">
          The quiet beginning of a creative business, late-night pitching mechanics, and crafting a brand from scratch.
        </p>
      </div>

      {/* Placeholder content card wireframes */}
      <div className="mt-16 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 opacity-30">
        <div className="h-48 rounded-lg border border-slate-800/60 bg-slate-900/20 p-6 flex flex-col justify-end">
          <div className="w-24 h-2 bg-slate-800 rounded mb-2" />
          <div className="w-48 h-3 bg-slate-700 rounded" />
        </div>
        <div className="h-48 rounded-lg border border-slate-800/60 bg-slate-900/20 p-6 flex flex-col justify-end">
          <div className="w-24 h-2 bg-slate-800 rounded mb-2" />
          <div className="w-48 h-3 bg-slate-700 rounded" />
        </div>
      </div>
    </section>
  );
};
