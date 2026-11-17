import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const StorySection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section
      id="story"
      aria-label="About Dean van Uden"
      className="relative min-h-screen w-full bg-[#070b14] px-4 sm:px-8 md:px-12 py-24 sm:py-32 border-t border-white/10"
    >
      <div className="w-full max-w-7xl mx-auto select-text space-y-16">
        {/* Asymmetrical Editorial Header */}
        <div className="border-b border-white/10 pb-10 space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-amber-400 block font-medium">
            {t.story.badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-slate-100 font-light tracking-tight leading-[1.15] max-w-4xl">
            {t.story.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-slate-400 pt-1">
            {t.story.subtitle}
          </p>
        </div>

        {/* Editorial Magazine Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Technical Colophon / Production Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-t border-b border-white/15 divide-y divide-white/10">
              <div className="py-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  01 / {t.story.stats.role}
                </span>
                <p className="font-serif text-slate-100 text-base sm:text-lg">
                  {t.story.stats.roleVal}
                </p>
              </div>

              <div className="py-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  02 / {t.story.stats.base}
                </span>
                <p className="font-serif text-slate-100 text-base sm:text-lg">
                  {t.story.stats.baseVal}
                </p>
              </div>

              <div className="py-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  03 / {t.story.stats.focus}
                </span>
                <p className="font-serif text-slate-100 text-base sm:text-lg">
                  {t.story.stats.focusVal}
                </p>
              </div>

              <div className="py-3.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 block mb-1">
                  04 / {language === 'nl' ? 'Actieve Producties' : 'Active Productions'}
                </span>
                <p className="font-serif text-slate-300 text-sm sm:text-base leading-snug">
                  Mustang (Mockumentary) · CRACKED (Drama) · Brabant Twins (Sportmedia)
                </p>
              </div>
            </div>

            {/* Editorial quote callout */}
            <div className="p-5 border-l-2 border-amber-400 bg-[#0a0f1d] space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 block">
                {language === 'nl' ? 'Productievisie' : 'Production Vision'}
              </span>
              <p className="font-serif italic text-sm sm:text-base text-slate-200 leading-relaxed">
                {t.story.lead}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative Columns */}
          <div className="lg:col-span-8 space-y-8 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-light first-letter:text-amber-300 first-letter:mr-2 first-letter:float-left">
              {t.story.p1}
            </p>

            <div className="w-full h-px bg-white/10" aria-hidden="true" />

            <p>
              {t.story.p2}
            </p>

            <div className="w-full h-px bg-white/10" aria-hidden="true" />

            <p>
              {t.story.p3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
