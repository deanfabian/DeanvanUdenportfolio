import React from 'react';
import { WindowGrid } from './WindowGrid';

interface CitySceneProps {
  buildingRef: React.RefObject<SVGSVGElement>;
  skylineRef: React.RefObject<SVGSVGElement>;
}

export const CityScene: React.FC<CitySceneProps> = ({ buildingRef, skylineRef }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 1. Distant Skyline Layer (Parallax 0.15x) */}
      <svg
        ref={skylineRef}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#04060c" />
            <stop offset="60%" stopColor="#070b15" />
            <stop offset="100%" stopColor="#0a0f1d" />
          </linearGradient>

          <linearGradient id="distantBuildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050812" />
            <stop offset="100%" stopColor="#080c16" />
          </linearGradient>
        </defs>

        {/* Sky backdrop */}
        <rect width="1600" height="1000" fill="url(#skyGrad)" />

        {/* Distant skyline towers */}
        <g id="distant-skyline" opacity="0.6">
          {/* Tower 1 (far left) */}
          <rect x="20" y="320" width="110" height="680" fill="url(#distantBuildingGrad)" />
          <line x1="75" y1="280" x2="75" y2="320" stroke="#050812" strokeWidth="2" />
          {/* Windows on distant tower 1 */}
          {[360, 420, 480, 540, 600, 660].map((y) => (
            <rect key={y} x="40" y={y} width="12" height="18" fill="#fbbf24" opacity="0.15" />
          ))}

          {/* Tower 2 (mid left) */}
          <rect x="150" y="240" width="80" height="760" fill="url(#distantBuildingGrad)" />
          <line x1="190" y1="210" x2="190" y2="240" stroke="#050812" strokeWidth="2" />
          <circle cx="190" cy="210" r="1.5" fill="#ef4444" opacity="0.7" />

          {/* Tower 3 (right center) */}
          <rect x="1350" y="220" width="130" height="780" fill="url(#distantBuildingGrad)" />
          <polygon points="1350,220 1415,170 1480,220" fill="#050812" />
          <line x1="1415" y1="130" x2="1415" y2="170" stroke="#050812" strokeWidth="2" />
          <circle cx="1415" cy="130" r="1.5" fill="#ef4444" opacity="0.8" />
          {[270, 340, 410, 480, 560].map((y) => (
            <rect key={y} x="1380" y={y} width="16" height="22" fill="#fbbf24" opacity="0.18" />
          ))}

          {/* Tower 4 (far right) */}
          <rect x="1500" y="360" width="90" height="640" fill="url(#distantBuildingGrad)" />
        </g>
      </svg>

      {/* 2. Main High-Rise Building Layer (Zooms 1x -> 35x onto Dean's window) */}
      <svg
        ref={buildingRef}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: '65.625% 47.0%',
        }}
      >
        <defs>
          <linearGradient id="buildingBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1424" />
            <stop offset="40%" stopColor="#0b101c" />
            <stop offset="100%" stopColor="#070a12" />
          </linearGradient>

          <linearGradient id="brickTexture" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0b101c" />
            <stop offset="50%" stopColor="#0e1526" />
            <stop offset="100%" stopColor="#0b101c" />
          </linearGradient>

          <radialGradient id="tvLightCone" cx="30%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* High-Rise Main Facade */}
        <g id="main-highrise-facade">
          {/* Main rectangular mass: x: 190, y: 100, width: 1220, height: 860 */}
          <rect
            x="190"
            y="100"
            width="1220"
            height="860"
            fill="url(#buildingBodyGrad)"
          />

          {/* Roof parapet and decorative top cornice */}
          <rect x="175" y="90" width="1250" height="15" fill="#080c16" />
          <rect x="180" y="86" width="1240" height="4" fill="#0f172a" />

          {/* Rooftop HVAC & Elevator Penthouse */}
          <rect x="340" y="45" width="120" height="45" fill="#090d18" />
          <rect x="360" y="32" width="80" height="13" fill="#060911" />

          {/* Rooftop Water Tower */}
          <g id="water-tower">
            {/* Legs */}
            <line x1="860" y1="90" x2="880" y2="52" stroke="#050810" strokeWidth="2.5" />
            <line x1="940" y1="90" x2="920" y2="52" stroke="#050810" strokeWidth="2.5" />
            <line x1="870" y1="72" x2="930" y2="72" stroke="#050810" strokeWidth="1.5" />
            {/* Tank barrel */}
            <rect x="872" y="32" width="56" height="26" rx="2" fill="#080d19" />
            {/* Cone cap */}
            <polygon points="870,32 900,16 930,32" fill="#050811" />
          </g>

          {/* Rooftop Radio Antenna with flashing red warning beacon */}
          <g id="radio-antenna">
            <line x1="680" y1="90" x2="680" y2="10" stroke="#060912" strokeWidth="2" />
            <line x1="672" y1="65" x2="688" y2="65" stroke="#060912" strokeWidth="1.2" />
            <line x1="675" y1="45" x2="685" y2="45" stroke="#060912" strokeWidth="1.2" />
            <circle cx="680" cy="10" r="2.5" fill="#ef4444">
              <animate
                attributeName="opacity"
                values="1;0.2;1"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Horizontal architectural ledges separating floor tiers */}
          {[230, 326, 422, 518, 614, 710, 806].map((ly) => (
            <line
              key={ly}
              x1="190"
              y1={ly}
              x2="1410"
              y2={ly}
              stroke="#070a13"
              strokeWidth="2.5"
            />
          ))}

          {/* Ground Floor Entrance & Lobby Lighting */}
          <rect x="190" y="904" width="1220" height="56" fill="#050810" />
          {/* Main glass lobby */}
          <rect x="710" y="906" width="180" height="52" rx="2" fill="#fbbf24" opacity="0.35" />
          <line x1="800" y1="906" x2="800" y2="958" stroke="#050810" strokeWidth="2" />
          {/* Entrance canopy awning */}
          <rect x="690" y="902" width="220" height="6" fill="#090d18" />

          {/* Window Grid & Silhouettes */}
          <WindowGrid />
        </g>
      </svg>
    </div>
  );
};
