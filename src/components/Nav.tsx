import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavProps {
  navRef?: React.RefObject<HTMLElement>;
}

export const Nav: React.FC<NavProps> = ({ navRef }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('portfolio');
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 120);

      // Determine active section based on scroll offset
      const portfolioEl = document.getElementById('portfolio');
      const storyEl = document.getElementById('story');
      const contactEl = document.getElementById('contact');

      const triggerOffset = window.innerHeight * 0.4;

      if (contactEl && contactEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('contact');
      } else if (storyEl && storyEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('story');
      } else if (portfolioEl && portfolioEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('portfolio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'portfolio', label: t.nav.portfolio, href: '#portfolio' },
    { id: 'story', label: t.nav.story, href: '#story' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace(/^#/, '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      ref={navRef}
      role="banner"
      aria-label="Main Navigation"
      className="fixed top-5 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 md:top-8 md:left-12 md:right-12 z-50 flex items-center justify-between pointer-events-none transition-all duration-500"
    >
      {/* Brand signature on left: fades in gracefully as you move down */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', ' ');
        }}
        className={`pointer-events-auto group flex items-center gap-2.5 transition-opacity duration-500 focus:outline-none ${
          hasScrolled ? 'opacity-100' : 'opacity-0 sm:opacity-70 hover:opacity-100'
        }`}
        aria-label="Back to top"
      >
        <span className="px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800/80 text-xs sm:text-sm font-serif tracking-tight text-slate-200 group-hover:text-amber-200 group-hover:border-amber-500/40 transition-colors shadow-lg">
          Dean van Uden
        </span>
      </a>

      {/* Floating Pill Navigation: Portfolio · Story · Contact · [NL|EN] */}
      <nav
        aria-label="Navigation Tabs"
        className="pointer-events-auto px-3.5 sm:px-5 py-2 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex items-center gap-3 sm:gap-5"
      >
        <ul className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-mono tracking-wider uppercase font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors duration-300 relative py-1 focus:outline-none ${
                    isActive
                      ? 'text-amber-300 font-semibold'
                      : 'text-slate-300 hover:text-amber-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full animate-fadeIn" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Subtle Divider */}
        <span className="w-px h-4 bg-slate-700/80" aria-hidden="true" />

        {/* Language Switcher Pill: Dutch (default) | English */}
        <button
          onClick={toggleLanguage}
          type="button"
          aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Nederlands'}`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/70 hover:border-amber-400/50 text-[11px] font-mono tracking-widest text-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <span className={language === 'nl' ? 'text-amber-300 font-bold' : 'text-slate-500'}>
            NL
          </span>
          <span className="text-slate-600 text-[10px]">/</span>
          <span className={language === 'en' ? 'text-amber-300 font-bold' : 'text-slate-500'}>
            EN
          </span>
        </button>
      </nav>
    </header>
  );
};
