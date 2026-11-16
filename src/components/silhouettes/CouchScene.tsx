import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const CouchScene: React.FC<Props> = ({ delay = 0, duration = 5.2 }) => {
  return (
    <g
      className="anim-couch"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Couch silhouette */}
      <rect x="20" y="58" width="48" height="18" rx="2" fill="#070c17" />
      <rect x="18" y="50" width="8" height="26" rx="2" fill="#050912" />
      <rect x="62" y="50" width="8" height="26" rx="2" fill="#050912" />
      <rect x="22" y="46" width="44" height="12" rx="2" fill="#060a14" />

      {/* Silhouette curled up / crying on couch */}
      <circle cx="36" cy="46" r="4.2" fill="#040710" />
      <path
        d="M32 50 C 32 47 38 46 42 49 C 45 52 44 58 38 60 Z"
        fill="#040710"
      />
      {/* Knees pulled to chest */}
      <ellipse cx="43" cy="54" rx="4" ry="5" fill="#040710" />
      {/* Arm wrapped around knees */}
      <path
        d="M36 50 C 39 53 44 53 45 51"
        fill="none"
        stroke="#040710"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
};
