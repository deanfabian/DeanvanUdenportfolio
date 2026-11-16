import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const PacingScene: React.FC<Props> = ({ delay = 0, duration = 6 }) => {
  return (
    <g
      className="anim-pace"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Floor line */}
      <line x1="14" y1="76" x2="74" y2="76" stroke="#060913" strokeWidth="2" />

      {/* Pacing person with phone to ear */}
      <circle cx="43" cy="36" r="4.8" fill="#050810" />
      {/* Phone shape */}
      <rect x="46.5" y="34" width="2" height="4.5" rx="0.5" fill="#050810" />
      
      {/* Arm holding phone */}
      <path
        d="M39 44 C 42 42 46 40 47 36"
        fill="none"
        stroke="#050810"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Other arm in pocket */}
      <path
        d="M37 46 L 35 56"
        fill="none"
        stroke="#050810"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Torso & legs */}
      <path
        d="M37 42 C 37 40 40 39 43 39 C 46 39 49 40 49 42 L 47 58 L 39 58 Z"
        fill="#050810"
      />
      <line x1="41" y1="58" x2="39" y2="75" stroke="#050810" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="45" y1="58" x2="47" y2="75" stroke="#050810" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  );
};
