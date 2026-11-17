import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhotographicScene } from './PhotographicScene';
import { RainLayer } from './RainLayer';
import { GlassTransition } from './GlassTransition';
import { SoundToggle } from './SoundToggle';
import { CONFIG } from '../config';
import { audioEngine } from '../utils/audioEngine';
import { useLanguage } from '../context/LanguageContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

gsap.registerPlugin(ScrollTrigger);

export const WelcomePage: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Photographic Layer Refs
  const facadeRef = useRef<HTMLDivElement>(null);
  const windowCloseupRef = useRef<HTMLDivElement>(null);
  const roomInteriorRef = useRef<HTMLDivElement>(null);

  // Atmospheric Foreground Refs
  const rainContainerRef = useRef<HTMLDivElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const glassOverlayRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  // UI & Typography Refs
  const introTextRef = useRef<HTMLDivElement>(null);
  const whisperRef = useRef<HTMLDivElement>(null);
  const comeInRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useWindowDimensions();
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current) return;

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            audioEngine.setScrollProgress(self.progress);
          },
        },
      });

      masterTimeline
        .addLabel('stage1-city', 0)
        .addLabel('stage2-approach', 18)
        .addLabel('stage3-glass', 50)
        .addLabel('stage4-room', 70)
        .addLabel('stage4-complete', 100);

      // -------------------------------------------------------------
      // ACCESSIBILITY: PREFERS REDUCED MOTION
      // -------------------------------------------------------------
      if (prefersReducedMotion) {
        masterTimeline
          .to(introTextRef.current, { opacity: 0, duration: 12 }, 5)
          .to(whisperRef.current, { opacity: 1, duration: 10 }, 20)
          .to(whisperRef.current, { opacity: 0, duration: 8 }, 34)
          .to(facadeRef.current, { opacity: 0, duration: 15 }, 38)
          .to(windowCloseupRef.current, { opacity: 1, duration: 15 }, 38)
          .to(windowCloseupRef.current, { opacity: 0, duration: 15 }, 58)
          .to(roomInteriorRef.current, { opacity: 1, duration: 15 }, 58)
          .to(comeInRef.current, { opacity: 1, duration: 12 }, 78);
        return;
      }

      // -------------------------------------------------------------
      // STAGE 1: THE CITY (0% - 18%)
      // -------------------------------------------------------------
      masterTimeline
        .to(introTextRef.current, {
          opacity: 0,
          y: -24,
          duration: 10,
          ease: 'power2.in',
        }, 8);

      // -------------------------------------------------------------
      // STAGE 2: THE APPROACH & FACADE ZOOM (18% - 50%)
      // -------------------------------------------------------------
      const zoomScale = isMobile ? 3.4 : CONFIG.camera.zoomScale;
      // Bring Dean's window toward the center of the camera
      const originXPercent = isMobile ? 60 : CONFIG.camera.originX;
      const originYPercent = isMobile ? 50 : CONFIG.camera.originY;
      const targetDeltaX = window.innerWidth * (0.50 - (originXPercent / 100));
      const targetDeltaY = window.innerHeight * (0.50 - (originYPercent / 100));

      masterTimeline
        // Facade zooms into Dean's window
        .to(facadeRef.current, {
          scale: zoomScale,
          x: targetDeltaX,
          y: targetDeltaY,
          ease: 'power2.inOut',
          duration: 32,
        }, 18)

        // Foreground rain & bokeh blur rush past camera
        .to(rainContainerRef.current, {
          scale: 2.8,
          opacity: 0.1,
          ease: 'power2.in',
          duration: 25,
        }, 18)
        .to(rainContainerRef.current, {
          opacity: 0,
          duration: 5,
        }, 43)

        // Mid-zoom whisper subtitle: "This one's mine."
        .fromTo(whisperRef.current, {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 7,
          ease: 'power1.out',
        }, 26)
        .to(whisperRef.current, {
          opacity: 0,
          y: -15,
          duration: 7,
          ease: 'power1.in',
        }, 37)

        // Seamless Crossfade 1: Facade -> Window Close-Up
        .to(facadeRef.current, {
          opacity: 0,
          duration: 12,
          ease: 'power1.inOut',
        }, 40)
        .fromTo(windowCloseupRef.current, {
          opacity: 0,
          scale: isMobile ? 0.97 : 0.94,
        }, {
          opacity: 1,
          scale: 1.0,
          duration: 12,
          ease: 'power1.out',
        }, 40);

      // -------------------------------------------------------------
      // STAGE 3: THROUGH THE GLASS (50% - 72%)
      // -------------------------------------------------------------
      const windowScaleEnd = isMobile ? 1.10 : 1.32;
      masterTimeline
        // Window close-up pushes closer into the glass pane
        .to(windowCloseupRef.current, {
          scale: windowScaleEnd,
          duration: 22,
          ease: 'power1.in',
        }, 46)

        // Subtle specular light wipe across glass
        .fromTo(glassOverlayRef.current, {
          opacity: 0,
        }, {
          opacity: 0.65,
          duration: 6,
        }, 50)
        .to(reflectionRef.current, {
          opacity: 0,
          duration: 10,
          ease: 'power1.inOut',
        }, 56)
        .to(glassOverlayRef.current, {
          opacity: 0,
          duration: 4,
        }, 66)

        // Seamless Crossfade 2: Window Close-Up -> Room Interior
        .to(windowCloseupRef.current, {
          opacity: 0,
          duration: 14,
          ease: 'power1.inOut',
        }, 58)
        .fromTo(roomInteriorRef.current, {
          opacity: 0,
          scale: isMobile ? 1.03 : 1.06,
        }, {
          opacity: 1,
          scale: 1.0,
          duration: 14,
          ease: 'power1.out',
        }, 58);

      // -------------------------------------------------------------
      // STAGE 4: INSIDE THE FLAT (70% - 100%)
      // -------------------------------------------------------------
      masterTimeline
        // Room interior settles into calm stillness
        .to(roomInteriorRef.current, {
          scale: 1.0,
          duration: 10,
          ease: 'power1.out',
        }, 72)

        // Final invitation prompt: "Come in." + animated chevron
        .fromTo(comeInRef.current, {
          opacity: 0,
          y: 18,
        }, {
          opacity: 1,
          y: 0,
          duration: 8,
          ease: 'power1.out',
        }, 74);

    }, trackRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <div
      ref={trackRef}
      className={`relative w-full ${isMobile ? 'h-[340vh]' : 'h-[380vh]'} bg-[#070b14]`}
    >
      {/* Sticky Full-Viewport Camera Rig */}
      <div
        ref={viewportRef}
        className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#070b14]"
      >
        {/* Subtle Film Grain Texture */}
        <div className="absolute inset-0 film-grain pointer-events-none z-40 opacity-30" />

        {/* 1. Photographic Crossfading Layers (Facade -> Window Close-Up -> Room Interior) */}
        <PhotographicScene
          facadeRef={facadeRef}
          windowCloseupRef={windowCloseupRef}
          roomInteriorRef={roomInteriorRef}
          isMobile={isMobile}
        />

        {/* 2. Foreground Depth: Canvas Rain & Passing Traffic Bokeh */}
        <RainLayer
          canvasRef={rainCanvasRef}
          containerRef={rainContainerRef}
        />

        {/* 3. Stage 3: Glass Window Transition & Condensation Dissolve */}
        <GlassTransition
          glassOverlayRef={glassOverlayRef}
          reflectionRef={reflectionRef}
        />

        {/* 4. Typography & Story Overlay Layers */}

        {/* Stage 1: "Dean van Uden" + Quiet Scroll Cue */}
        <div
          ref={introTextRef}
          className="absolute inset-0 flex flex-col items-center justify-between pt-24 pb-14 z-30 pointer-events-none text-center px-4"
        >
          {/* Top empty balance */}
          <div className="h-4" />

          {/* Central understated name - tightened spacing, refined Fraunces serif */}
          <div className="pointer-events-auto">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f8fafc] font-light tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] select-text">
              {t.welcome.name}
            </h1>
          </div>

          {/* Bottom gentle scroll cue */}
          <div className="flex flex-col items-center gap-2.5 pointer-events-auto select-text">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-slate-300/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              {t.welcome.scrollCue}
            </span>
            <div className="w-px h-7 bg-gradient-to-b from-slate-200/60 to-transparent anim-pulse-down" />
          </div>
        </div>

        {/* Stage 2 Mid-zoom Whisper: "This one’s mine." (Cinematic Subtitle lower-third) */}
        <div
          ref={whisperRef}
          className="absolute inset-0 flex items-end justify-center pb-24 sm:pb-24 md:pb-28 z-35 pointer-events-none opacity-0 px-6 text-center"
        >
          <div className="border-l-2 border-amber-400 pl-4 pr-5 py-2 bg-black/80 backdrop-blur-sm pointer-events-auto select-text shadow-2xl">
            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-amber-100 font-light tracking-wide">
              {t.welcome.whisper}
            </p>
          </div>
        </div>

        {/* Stage 4 Final Invitation: "Kom binnen." */}
        <div
          ref={comeInRef}
          className="absolute bottom-20 sm:bottom-12 left-1/2 -translate-x-1/2 z-35 pointer-events-none opacity-0 flex flex-col items-center gap-2 text-center w-max"
        >
          <a
            href="#portfolio"
            className="px-5 py-2.5 border border-white/20 bg-[#070b14]/90 backdrop-blur-sm pointer-events-auto select-text flex items-center gap-3 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <p className="font-serif italic text-base md:text-lg text-amber-100 font-normal">
              {t.welcome.comeIn}
            </p>
            <span className="text-amber-400 font-mono text-xs" aria-hidden="true">↓</span>
          </a>
        </div>

        {/* 6. Ambient Soundscape Toggle */}
        <SoundToggle />
      </div>
    </div>
  );
};
