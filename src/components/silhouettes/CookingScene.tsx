import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const CookingScene: React.FC<Props> = ({ delay = 0, duration = 4 }) => {
  return (
    <g
      className="anim-cook"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Kitchen counter */}
      <rect x="18" y="58" width="58" height="22" fill="#080c16" />
      {/* Stove pot */}
      <rect x="24" y="54" width="10" height="5" rx="1" fill="#050810" />
      <line x1="22" y1="56" x2="24" y2="56" stroke="#050810" strokeWidth="1" />
      {/* Steam rising */}
      <path
        d="M27 52 Q 29 48 26 44"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        opacity="0.35"
      />
      {/* Silhouette cooking: torso & head */}
      <circle cx="48" cy="38" r="5" fill="#050810" />
      <path
        d="M42 45 C 42 43 45 42 48 42 C 51 42 54 43 54 45 L 53 62 L 43 62 Z"
        fill="#050810"
      />
      {/* Arm extending toward pot */}
      <path
        d="M44 47 Q 34 52 28 55"
        fill="none"
        stroke="#050810"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Overhead cupboard */}
      <rect x="20" y="16" width="45" height="12" fill="#0a0f1d" opacity="0.8" />
    </g>
  );
};
