import React from 'react';

interface Props {
  delay?: number;
  duration?: number;
}

export const PlantScene: React.FC<Props> = ({ delay = 0, duration = 6.5 }) => {
  return (
    <g
      className="anim-plant"
      style={{
        '--anim-del': `${delay}s`,
        '--anim-dur': `${duration}s`,
      } as React.CSSProperties}
    >
      {/* Windowsill shelf with potted plants */}
      <rect x="18" y="66" width="38" height="6" fill="#080c16" />
      {/* Pots */}
      <polygon points="22,66 26,66 25,60 23,60" fill="#050810" />
      <circle cx="24" cy="57" r="3.5" fill="#050810" />
      
      <polygon points="32,66 37,66 36,58 33,58" fill="#050810" />
      <path d="M34 58 Q 31 50 37 48 Q 40 54 35 58" fill="#050810" />

      {/* Old man leaning with watering can */}
      <circle cx="54" cy="38" r="4.6" fill="#050810" />
      {/* Hunched posture */}
      <path
        d="M48 44 C 48 42 51 41 54 41 C 57 41 60 43 59 46 L 56 64 L 46 64 Z"
        fill="#050810"
      />
      {/* Arm holding watering can */}
      <path
        d="M50 48 Q 43 50 40 52"
        fill="none"
        stroke="#050810"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Watering can spout */}
      <rect x="36" y="52" width="5" height="4" fill="#050810" />
      <line x1="36" y1="53" x2="31" y2="56" stroke="#050810" strokeWidth="1.2" />
    </g>
  );
};
