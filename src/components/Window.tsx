import React from 'react';
import { WindowData } from '../types';
import { CookingScene } from './silhouettes/CookingScene';
import { DancingScene } from './silhouettes/DancingScene';
import { PacingScene } from './silhouettes/PacingScene';
import { HomeworkScene } from './silhouettes/HomeworkScene';
import { PlantScene } from './silhouettes/PlantScene';
import { CouchScene } from './silhouettes/CouchScene';
import { PartyScene } from './silhouettes/PartyScene';
import { TVFlickerScene } from './silhouettes/TVFlickerScene';
import { TargetWindowScene } from './silhouettes/TargetWindowScene';

interface WindowProps {
  data: WindowData;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Window: React.FC<WindowProps> = ({ data, x, y, width, height }) => {
  const { lightType, intensity, scene, animDelay, animDuration, isTarget } = data;

  // Window background fill based on light type
  let bgFill = '#0b101d';
  let glowOpacity = 0.85;

  if (lightType === 'tungsten') {
    bgFill = isTarget ? '#f59e0b' : '#fbbf24';
    glowOpacity = intensity * 0.95;
  } else if (lightType === 'sodium') {
    bgFill = '#d97706';
    glowOpacity = intensity * 0.9;
  } else if (lightType === 'tv') {
    bgFill = '#60a5fa';
    glowOpacity = intensity * 0.8;
  } else if (lightType === 'dim') {
    bgFill = '#78350f';
    glowOpacity = 0.45;
  } else if (lightType === 'off') {
    bgFill = '#0a0e19';
    glowOpacity = 0.2;
  }

  const renderScene = () => {
    switch (scene) {
      case 'cooking':
        return <CookingScene delay={animDelay} duration={animDuration} />;
      case 'dancing':
        return <DancingScene delay={animDelay} duration={animDuration} />;
      case 'pacing':
        return <PacingScene delay={animDelay} duration={animDuration} />;
      case 'homework':
        return <HomeworkScene delay={animDelay} duration={animDuration} />;
      case 'plants':
        return <PlantScene delay={animDelay} duration={animDuration} />;
      case 'couch':
        return <CouchScene delay={animDelay} duration={animDuration} />;
      case 'party':
        return <PartyScene delay={animDelay} duration={animDuration} />;
      case 'tv':
        return <TVFlickerScene delay={animDelay} duration={animDuration} />;
      case 'target':
        return <TargetWindowScene />;
      case 'blinds':
        return (
          <g opacity="0.35">
            {[24, 32, 40, 48, 56, 64, 72].map((ly) => (
              <line key={ly} x1="16" y1={ly} x2="72" y2={ly} stroke="#050810" strokeWidth="1.2" />
            ))}
          </g>
        );
      case 'dark':
      default:
        return null;
    }
  };

  const clipId = `window-clip-${data.id}`;

  return (
    <g
      id={isTarget ? 'target-window-node' : undefined}
      transform={`translate(${x}, ${y})`}
      className={isTarget ? 'window-target' : undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={width} height={height} rx="2" />
        </clipPath>
      </defs>

      {/* Exterior wall brick inset bevel */}
      <rect
        x="-3"
        y="-3"
        width={width + 6}
        height={height + 6}
        fill="#070a12"
        rx="3"
      />

      {/* Lit Interior Background */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="2"
        fill={bgFill}
        opacity={glowOpacity}
      />

      {/* Light gradient bloom */}
      {lightType !== 'off' && (
        <radialGradient id={`glow-${data.id}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={isTarget ? 0.35 : 0.22} />
          <stop offset="100%" stopColor={bgFill} stopOpacity="0" />
        </radialGradient>
      )}
      {lightType !== 'off' && (
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill={`url(#glow-${data.id})`}
          clipPath={`url(#${clipId})`}
        />
      )}

      {/* Silhouette vignette scaled into this window coordinate box (88 x 96 normalized) */}
      <g
        clipPath={`url(#${clipId})`}
        transform={`scale(${width / 88}, ${height / 96})`}
      >
        {renderScene()}
      </g>

      {/* Window mullions (wooden crossbars) */}
      <line
        x1={width / 2}
        y1="0"
        x2={width / 2}
        y2={height}
        stroke="#060911"
        strokeWidth="2.2"
      />
      <line
        x1="0"
        y1={height * 0.45}
        x2={width}
        y2={height * 0.45}
        stroke="#060911"
        strokeWidth="2"
      />

      {/* Outer Window Frame Border */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill="none"
        stroke="#050810"
        strokeWidth="2.4"
        rx="2"
      />

      {/* Outer windowsill */}
      <rect
        x="-4"
        y={height}
        width={width + 8}
        height="3.5"
        fill="#04060c"
        rx="1"
      />

      {/* Faint glass reflection streak across pane */}
      <line
        x1={width * 0.15}
        y1={height * 0.08}
        x2={width * 0.85}
        y2={height * 0.88}
        stroke="#ffffff"
        strokeWidth="0.8"
        opacity="0.12"
      />
    </g>
  );
};
