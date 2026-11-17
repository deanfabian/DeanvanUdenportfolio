import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StorySection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="story"
      aria-label="About Dean van Uden"
      className="relative min-h-screen w-full bg-[#070b14] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-28 border-t border-slate-900"
    >
      {/* Subtle separator thread */}
      <div className="w-12 h-px bg-slate-700/80 mb-12" aria-hidden="true" />

      <div className="w-full max-w-4xl mx-auto space-y-16 select-text">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase font-mono text-amber-400 font-medium">
            {t.story.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-100 font-light tracking-tight leading-tight">
            {t.story.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-400">
            {t.story.subtitle}
          </p>
        </div>

        {/* Story Text Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-slate-300 font-serif font-light text-base sm:text-lg leading-relaxed">
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-xl space-y-3">
            <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase block">01 // AV Productie</span>
            <p>{t.story.p1}</p>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-xl space-y-3">
            <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase block">02 // Het Perspectief</span>
            <p>{t.story.p2}</p>
          </div>
          <div className="p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 shadow-xl space-y-3">
            <span className="text-xs font-mono tracking-widest text-amber-300/80 uppercase block">03 // Creatieve Drive</span>
            <p>{t.story.p3}</p>
          </div>
        </div>

        {/* Quick Facts / Focus Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/60 text-center sm:text-left">
          <div className="px-5 py-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-1">
              {t.story.stats.role}
            </span>
            <p className="font-serif text-slate-200 text-base">{t.story.stats.roleVal}</p>
          </div>
          <div className="px-5 py-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-1">
              {t.story.stats.base}
            </span>
            <p className="font-serif text-slate-200 text-base">{t.story.stats.baseVal}</p>
          </div>
          <div className="px-5 py-4 rounded-xl bg-slate-950/40 border border-slate-800/60">
            <span className="text-[11px] font-mono tracking-widest uppercase text-slate-400 block mb-1">
              {t.story.stats.focus}
            </span>
            <p className="font-serif text-slate-200 text-base">{t.story.stats.focusVal}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
