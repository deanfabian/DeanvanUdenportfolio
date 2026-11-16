import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const PartyScene: React.FC<Props> = ({ delay = 0, duration = 3.2 }) => {
  return (
    <g
      className="anim-party"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Background garland or party lighting string */}
      <path
        d="M16 26 Q 44 32 72 26"
        fill="none"
        stroke="#fef08a"
        strokeWidth="0.8"
        strokeDasharray="3,4"
        opacity="0.4"
      />

      {/* Person 1 (left) */}
      <circle cx="28" cy="38" r="4.2" fill="#050810" />
      <path d="M24 44 C 24 42 27 41 29 41 C 32 41 34 42 34 44 L 33 66 L 23 66 Z" fill="#050810" />
      {/* Raised drink */}
      <line x1="30" y1="46" x2="33" y2="38" stroke="#050810" strokeWidth="1.8" />
      <polygon points="32,38 35,38 34,35" fill="#050810" />

      {/* Person 2 (center facing right) */}
      <circle cx="44" cy="36" r="4.5" fill="#050810" />
      <path d="M39 42 C 39 40 43 39 46 39 C 49 39 51 40 51 42 L 50 68 L 38 68 Z" fill="#050810" />
      
      {/* Person 3 (right laughing back) */}
      <circle cx="58" cy="37" r="4.2" fill="#050810" />
      <path d="M53 43 C 53 41 57 40 60 40 C 63 40 64 41 64 43 L 62 66 L 52 66 Z" fill="#050810" />
      <line x1="56" y1="46" x2="52" y2="40" stroke="#050810" strokeWidth="1.8" />
    </g>
  );
};
