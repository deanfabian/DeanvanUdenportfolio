import React from 'react';

export const TargetWindowScene: React.FC = () => {
  return (
    <g id="dean-window-silhouette">
      {/* Warm ambient interior back-wall fill */}
      <rect x="14" y="16" width="60" height="66" fill="#fef3c7" opacity="0.22" />

      {/* Desk surface */}
      <rect x="18" y="60" width="52" height="18" fill="#080c16" />
      
      {/* Laptop opened on desk */}
      <polygon points="26,60 36,60 38,52 28,52" fill="#03050a" />
      <rect x="29" y="53" width="7" height="5" fill="#f8fafc" opacity="0.65" />

      {/* Desk lamp with warm golden beam */}
      <path d="M56 60 L 52 44 L 46 47" fill="none" stroke="#04060c" strokeWidth="1.8" />
      <polygon points="43,45 49,48 46,52" fill="#03050a" />
      {/* Lamp glow pool on desk */}
      <ellipse cx="44" cy="59" rx="14" ry="4" fill="#fbbf24" opacity="0.45" />

      {/* Shelving unit on top left */}
      <rect x="18" y="24" width="34" height="3" fill="#070a14" />
      
      {/* Baseball glove silhouette on shelf */}
      <path
        d="M23 24 C 22 21 24 18 28 18 C 30 18 31 20 32 24 Z"
        fill="#04060b"
      />
      {/* Stitched baseball beside glove */}
      <circle cx="36" cy="21.5" r="2.4" fill="#fef3c7" opacity="0.85" />
      <circle cx="36" cy="21.5" r="2.4" fill="none" stroke="#04060b" strokeWidth="0.6" />

      {/* Pitching sequence whiteboard on back wall */}
      <rect x="52" y="22" width="18" height="15" rx="1" fill="#060913" />
      <line x1="55" y1="26" x2="66" y2="26" stroke="#f8fafc" strokeWidth="0.6" opacity="0.4" />
      <line x1="55" y1="30" x2="63" y2="30" stroke="#f8fafc" strokeWidth="0.6" opacity="0.3" />
      <circle cx="65" cy="31" r="1.2" fill="#ef4444" opacity="0.6" />

      {/* Ergonomic chair with varsity/team jacket draped over */}
      <rect x="36" y="50" width="8" height="24" rx="2" fill="#050810" />
      {/* Jacket drape curve */}
      <path
        d="M34 52 C 34 50 37 49 40 49 C 43 49 46 50 46 52 L 48 64 L 32 64 Z"
        fill="#030509"
      />

      {/* Coffee mug */}
      <rect x="49" y="57" width="3" height="3.5" rx="0.5" fill="#030509" />
    </g>
  );
};
