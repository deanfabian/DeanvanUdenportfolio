import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const HomeworkScene: React.FC<Props> = ({ delay = 0, duration = 7 }) => {
  return (
    <g
      className="anim-homework"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Desk */}
      <rect x="22" y="56" width="46" height="20" fill="#080c16" />
      {/* Open notebook */}
      <polygon points="32,54 44,54 47,56 29,56" fill="#04060d" />
      {/* Desk lamp on left */}
      <path d="M25 56 L 27 44 L 32 46" fill="none" stroke="#050810" strokeWidth="1.5" />
      <polygon points="30,44 36,46 33,50" fill="#050810" />
      {/* Small child/teenager silhouette leaning over */}
      <circle cx="49" cy="42" r="4.2" fill="#050810" />
      <path
        d="M45 47 C 45 45 47 44 50 44 C 53 44 55 45 55 47 L 54 62 L 44 62 Z"
        fill="#050810"
      />
      {/* Writing arm */}
      <path
        d="M46 50 Q 42 53 38 55"
        fill="none"
        stroke="#050810"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Chair back */}
      <rect x="53" y="48" width="4" height="24" fill="#060913" />
    </g>
  );
};
