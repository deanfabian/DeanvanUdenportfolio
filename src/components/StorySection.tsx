import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
      className="relative min-h-screen w-full bg-[#070b14] px-6 sm:px-8 py-24 sm:py-36 border-t border-white/10"
    >
      <div className="w-full max-w-[60ch] mx-auto select-text space-y-20 sm:space-y-28 font-serif font-light leading-relaxed">
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
    </section>
  );
};
