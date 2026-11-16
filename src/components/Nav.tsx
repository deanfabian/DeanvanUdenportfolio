import React from 'react';

interface NavProps {
  navRef: React.RefObject<HTMLElement>;
}

export const Nav: React.FC<NavProps> = ({ navRef }) => {
  const links = ['Story', 'Work', 'Baseball', 'Contact'];

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className="absolute top-6 right-6 md:top-8 md:right-10 z-50 opacity-0 pointer-events-none select-none"
    >
      <div className="px-5 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/70 shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
        <ul className="flex items-center gap-5 md:gap-7 text-xs md:text-sm tracking-[0.2em] uppercase font-medium text-slate-200">
          {links.map((item, idx) => (
            <React.Fragment key={item}>
              <li>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="transition-colors duration-300 hover:text-amber-300 focus:outline-none focus:text-amber-300"
                  tabIndex={0}
                >
                  {item}
                </a>
              </li>
              {idx < links.length - 1 && (
                <span className="text-slate-500 select-none text-[10px]" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </nav>
  );
};
