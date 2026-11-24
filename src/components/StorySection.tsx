import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { assetUrl } from '../config';

interface StoryBlockProps {
  children: React.ReactNode;
}

const StoryBlock: React.FC<StoryBlockProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-5');
          el.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-5 transition-all duration-700 ease-out"
    >
      {children}
    </div>
  );
};

export const StorySection: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section
      id="story"
      aria-label="Story"
      className="relative min-h-screen w-full bg-[#070b14] px-4 sm:px-8 py-24 sm:py-36 border-t border-white/10"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Main Narrative Column */}
        <div className="w-full max-w-[60ch] mx-auto lg:mx-0 flex-1 select-text space-y-20 sm:space-y-28 font-serif font-light leading-relaxed">
          {/* Opening */}
          <StoryBlock>
            <div className="space-y-4 text-xl sm:text-2xl text-slate-100 font-normal">
              {t.story.opening.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </StoryBlock>

          {/* Chapter I: Het kader */}
          <StoryBlock>
            <article className="space-y-6">
              <h3 className="font-serif italic text-base sm:text-lg text-amber-200/90 font-normal">
                {t.story.ch1.title}
              </h3>
              <div className="space-y-1">
                {t.story.ch1.p1.map((line, i) => (
                  <p key={i} className="text-lg sm:text-xl text-slate-200">
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch1.p2}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch1.p3}</p>
              <div className="pt-2 flex flex-wrap gap-6 text-sm font-sans">
                <a
                  href="#mustang"
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  {t.story.ch1.links.mustang}
                </a>
                <a
                  href="#cracked"
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  {t.story.ch1.links.cracked}
                </a>
              </div>
            </article>
          </StoryBlock>

          {/* Chapter II: De feed */}
          <StoryBlock>
            <article className="space-y-6">
              <h3 className="font-serif italic text-base sm:text-lg text-amber-200/90 font-normal">
                {t.story.ch2.title}
              </h3>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch2.p1}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch2.p2}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch2.p3}</p>
              <div className="pt-2 flex flex-wrap gap-6 text-sm font-sans">
                <a
                  href="#twins"
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  {t.story.ch2.links.twins}
                </a>
                <a
                  href="#throwers-lab"
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  {t.story.ch2.links.throwersLab}
                </a>
              </div>
            </article>
          </StoryBlock>

          {/* Chapter III: Buiten beeld */}
          <StoryBlock>
            <article className="space-y-6">
              <h3 className="font-serif italic text-base sm:text-lg text-amber-200/90 font-normal">
                {t.story.ch3.title}
              </h3>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch3.p1}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch3.p2}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch3.p3}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch3.p4}</p>
            </article>
          </StoryBlock>

          {/* Chapter IV: Het volgende raam */}
          <StoryBlock>
            <article className="space-y-6">
              <h3 className="font-serif italic text-base sm:text-lg text-amber-200/90 font-normal">
                {t.story.ch4.title}
              </h3>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch4.p1}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch4.p2}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch4.p3}</p>
              <p className="text-lg sm:text-xl text-slate-200">{t.story.ch4.p4}</p>
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={handleScrollToContact}
                  className="text-amber-300 hover:text-amber-200 underline underline-offset-4 text-sm font-sans transition-colors"
                >
                  {t.story.ch4.linkMail}
                </a>
              </div>
            </article>
          </StoryBlock>
        </div>

        {/* Profile Sidebar */}
        <aside className="w-full lg:w-80 xl:w-88 flex-shrink-0 lg:sticky lg:top-28 self-start">
          <div className="relative border border-white/15 bg-[#0a0f1d]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl space-y-6">
            {/* Photo Container */}
            <div className="relative w-full aspect-[4/5] overflow-hidden border border-white/15 bg-black/70">
              <img
                src={assetUrl('/assets/dean-portrait.jpg')}
                alt={t.story.profile.photoAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Header: Name + Tagline */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <h4 className="font-serif text-2xl text-slate-100 font-normal tracking-wide">
                Dean van Uden
              </h4>
              <p className="font-mono text-[11px] uppercase tracking-widest text-amber-400">
                {t.story.profile.tagline}
              </p>
            </div>

            {/* Studie */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400 block">
                {t.story.profile.studyLabel}
              </span>
              <p className="text-sm font-sans text-slate-200 font-medium leading-snug">
                {t.story.profile.studyDegree}
              </p>
              <p className="text-xs font-sans text-slate-400">
                {t.story.profile.studySchool}
              </p>
            </div>

            {/* Prominente Skills */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-400 block">
                {t.story.profile.skillsLabel}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {t.story.profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/10 text-slate-300 rounded-sm hover:border-amber-400/40 hover:text-amber-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-400/80 block">
                {t.story.profile.quoteLabel}
              </span>
              <blockquote className="border-l-2 border-amber-400 pl-3.5 py-1 font-serif italic text-xs sm:text-sm text-amber-100/90 leading-relaxed font-light">
                {t.story.profile.quote}
              </blockquote>
            </div>

            {/* Contact Button */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="group flex items-center justify-between w-full px-4 py-2.5 border border-white/15 bg-white/5 hover:border-amber-400 hover:bg-amber-400/10 transition-colors text-xs font-mono tracking-wider text-slate-200 hover:text-amber-200"
              >
                <span>{t.story.profile.contactLink}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
