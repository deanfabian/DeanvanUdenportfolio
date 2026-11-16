import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const TVFlickerScene: React.FC<Props> = ({ delay = 0, duration = 2.4 }) => {
  return (
    <g>
      {/* TV screen glowing cone */}
      <polygon
        points="22,60 16,36 44,32 52,60"
        fill="url(#tvLightCone)"
        className="anim-tv"
        style={{
          '--anim-del': `${delay}s`,
          '--anim-dur': `${duration}s`,
        } as React.CSSProperties}
      />

      {/* TV monitor stand on table */}
      <rect x="18" y="62" width="22" height="14" fill="#080c16" />
      <rect x="22" y="52" width="14" height="10" rx="1" fill="#04060d" />

      {/* Watcher silhouette seated in armchair */}
      <rect x="48" y="52" width="22" height="22" rx="4" fill="#060913" />
      <circle cx="56" cy="44" r="4.6" fill="#04060d" />
      <path
        d="M51 50 C 51 47 55 46 58 46 C 62 46 64 47 64 50 L 63 64 L 49 64 Z"
        fill="#04060d"
      />
    </g>
  );
};
