import React from 'react';

interface GlassTransitionProps {
  glassOverlayRef: React.RefObject<HTMLDivElement>;
  reflectionRef: React.RefObject<HTMLDivElement>;
}

export const GlassTransition: React.FC<GlassTransitionProps> = ({
  glassOverlayRef,
  reflectionRef,
}) => {
  return (
    <div
      ref={glassOverlayRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-30 opacity-0 overflow-hidden"
    >
      {/* Soft specular light reflection and glass distortion dissolve */}
      <div
        ref={reflectionRef}
        className="absolute inset-0 w-full h-full backdrop-blur-[2px] bg-gradient-to-t from-sky-950/20 via-transparent to-amber-900/15"
      >
        {/* Subtle cinematic lens flare streak as camera breaches window pane */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[150%] h-32 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -rotate-6 blur-2xl" />
        </div>
      </div>
    </div>
  );
};
