import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const DancingScene: React.FC<Props> = ({ delay = 0, duration = 5 }) => {
  return (
    <g
      className="anim-dance"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Floor glow / rug */}
      <ellipse cx="44" cy="74" rx="22" ry="4" fill="#080d19" />
      
      {/* Dancer 1 (taller) */}
      <circle cx="39" cy="35" r="4.8" fill="#050810" />
      <path
        d="M33 42 C 33 40 36 39 39 39 C 42 39 45 40 45 42 L 44 64 L 34 64 Z"
        fill="#050810"
      />
      {/* Dancer 2 (holding close) */}
      <circle cx="49" cy="38" r="4.4" fill="#050810" />
      <path
        d="M44 44 C 44 42 47 41 49 41 C 51 41 54 42 54 44 L 56 68 L 42 68 Z"
        fill="#050810"
      />
      
      {/* Connected embrace arms */}
      <path
        d="M36 45 C 40 42 48 44 50 46"
        fill="none"
        stroke="#050810"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M49 48 C 45 50 40 49 37 47"
        fill="none"
        stroke="#050810"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  );
};
