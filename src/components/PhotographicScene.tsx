import React from 'react';
import { CONFIG } from '../config';

interface PhotographicSceneProps {
  facadeRef: React.RefObject<HTMLDivElement>;
  windowCloseupRef: React.RefObject<HTMLDivElement>;
  roomInteriorRef: React.RefObject<HTMLDivElement>;
  isMobile?: boolean;
}

export const PhotographicScene: React.FC<PhotographicSceneProps> = ({
  facadeRef,
  windowCloseupRef,
  roomInteriorRef,
  isMobile = false,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none bg-[#070b14]">
      {/* 1. Stage 1 & 2: Photographic Facade Layer */}
      <div
        ref={facadeRef}
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: isMobile ? '60% 50%' : `${CONFIG.camera.originX}% ${CONFIG.camera.originY}%`,
        }}
      >
        <img
          src={CONFIG.assets.facade}
          alt="Night high-rise building with lit windows and traffic"
          className="w-full h-full object-cover select-none pointer-events-none"
          style={{
            objectPosition: isMobile ? '60% center' : 'center center',
          }}
          loading="eager"
          decoding="async"
        />
        {/* Subtle dark edge vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      </div>

      {/* 2. Stage 3: Window Close-up Layer (Brick exterior, glass pane with raindrops, warm desk interior) */}
      <div
        ref={windowCloseupRef}
        className="absolute inset-0 w-full h-full will-change-transform opacity-0"
        style={{
          transformOrigin: isMobile ? '48% 50%' : '47.0% 56.2%',
        }}
      >
        <img
          src={CONFIG.assets.windowCloseup}
          alt="Close-up of Dean's lit window from outside with raindrops on glass"
          className="w-full h-full object-cover select-none pointer-events-none"
          style={{
            objectPosition: isMobile ? '46% center' : 'center center',
          }}
          loading="eager"
          decoding="async"
        />
        {/* Faint specular ambient night light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950/25 via-transparent to-amber-950/15 pointer-events-none" />
      </div>

      {/* 3. Stage 4: Room Interior Layer (Whiteboard, baseball gear, desk lamp, jacket, rear window) */}
      <div
        ref={roomInteriorRef}
        className="absolute inset-0 w-full h-full will-change-transform opacity-0"
        style={{
          transformOrigin: isMobile ? '30% 50%' : '40% 55%',
        }}
      >
        <img
          src={CONFIG.assets.roomInterior}
          alt="Inside Dean's room with pitching whiteboard, baseball glove, and desk lamp"
          className="w-full h-full object-cover select-none pointer-events-none"
          style={{
            objectPosition: isMobile ? '28% center' : 'center center',
          }}
          loading="eager"
          decoding="async"
        />
        {/* Warm incandescent ambient mood vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
      </div>
    </div>
  );
};
