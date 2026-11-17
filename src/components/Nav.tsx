import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NavProps {
  navRef?: React.RefObject<HTMLElement>;
}

export const Nav: React.FC<NavProps> = ({ navRef }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('portfolio');

  useEffect(() => {
    const handleScroll = () => {
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
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto bg-[#070b14]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300 select-text"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Brand Signature */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.pushState(null, '', ' ');
          }}
          className="group flex items-center focus:outline-none flex-shrink-0"
          aria-label="Dean van Uden - Back to top"
        >
          <span className="font-serif text-base sm:text-lg tracking-tight font-light text-slate-100 group-hover:text-amber-200 transition-colors whitespace-nowrap">
            Dean van Uden
          </span>
        </a>

        {/* Navigation Tabs */}
        <nav aria-label="Navigation Tabs" className="flex items-center gap-4 sm:gap-8 flex-shrink-0">
          <ul className="flex items-center gap-4 sm:gap-7 text-xs font-mono tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`group py-1 transition-colors duration-200 focus:outline-none whitespace-nowrap ${
                      isActive
                        ? 'text-amber-300 font-medium'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hairline Divider */}
          <span className="w-px h-3.5 sm:h-4 bg-white/15" aria-hidden="true" />

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            type="button"
            aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Nederlands'}`}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 border border-white/15 hover:border-amber-400/60 text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-300 transition-colors focus:outline-none focus:border-amber-400 whitespace-nowrap flex-shrink-0"
          >
            <span className={language === 'nl' ? 'text-amber-300 font-semibold' : 'text-slate-500'}>
              NL
            </span>
            <span className="text-slate-600 mx-0.5 sm:mx-1">/</span>
            <span className={language === 'en' ? 'text-amber-300 font-semibold' : 'text-slate-500'}>
              EN
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
