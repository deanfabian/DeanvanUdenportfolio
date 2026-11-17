import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { PhotographicScene } from './PhotographicScene';
import { RainLayer } from './RainLayer';
import { GlassTransition } from './GlassTransition';
import { Nav } from './Nav';
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
  const navRef = useRef<HTMLElement>(null);
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
          .to(navRef.current, { opacity: 1, pointerEvents: 'auto', duration: 12 }, 72)
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
      const zoomScale = isMobile ? 4.8 : CONFIG.camera.zoomScale;
      // Bring Dean's window (62.2% X, 49.9% Y) toward the center of the camera
      const targetDeltaX = window.innerWidth * (0.50 - (CONFIG.camera.originX / 100));
      const targetDeltaY = window.innerHeight * (0.50 - (CONFIG.camera.originY / 100));

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
          scale: 0.94,
        }, {
          opacity: 1,
          scale: 1.0,
          duration: 12,
          ease: 'power1.out',
        }, 40);

      // -------------------------------------------------------------
      // STAGE 3: THROUGH THE GLASS (50% - 72%)
      // -------------------------------------------------------------
      masterTimeline
        // Window close-up pushes closer into the glass pane
        .to(windowCloseupRef.current, {
          scale: 1.32,
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
          scale: 1.06,
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

        // Minimal corner navigation fades in
        .to(navRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          duration: 8,
          ease: 'power1.out',
        }, 70)

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
      className={`relative w-full ${isMobile ? 'h-[280vh]' : 'h-[380vh]'} bg-[#070b14]`}
    >
      {/* Sticky Full-Viewport Camera Rig */}
      <div
        ref={viewportRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#070b14]"
      >
        {/* Subtle Film Grain Texture */}
        <div className="absolute inset-0 film-grain pointer-events-none z-40 opacity-30" />

        {/* 1. Photographic Crossfading Layers (Facade -> Window Close-Up -> Room Interior) */}
        <PhotographicScene
          facadeRef={facadeRef}
          windowCloseupRef={windowCloseupRef}
          roomInteriorRef={roomInteriorRef}
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

        {/* 4. Minimal Corner Navigation */}
        <Nav navRef={navRef} />

        {/* 5. Typography & Story Overlay Layers */}

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

        {/* Stage 2 Mid-zoom Whisper: "This one’s mine." (positioned fairly to the bottom of the screen) */}
        <div
          ref={whisperRef}
          className="absolute inset-0 flex items-end justify-center pb-20 sm:pb-24 md:pb-28 z-35 pointer-events-none opacity-0 px-6 text-center"
        >
          <div className="py-2.5 px-6 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.85)] pointer-events-auto select-text">
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-amber-100 font-light tracking-wide">
              {t.welcome.whisper}
            </p>
          </div>
        </div>

        {/* Stage 4 Final Invitation: "Come in." */}
        <div
          ref={comeInRef}
          className="absolute bottom-12 md:bottom-14 left-1/2 -translate-x-1/2 z-35 pointer-events-none opacity-0 flex flex-col items-center gap-2 text-center"
        >
          <div className="py-2 px-5 rounded-full bg-slate-950/75 backdrop-blur-sm border border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.8)] pointer-events-auto select-text">
            <p className="font-serif italic text-lg md:text-xl text-amber-100 font-normal tracking-wider">
              {t.welcome.comeIn}
            </p>
          </div>
          <ChevronDown className="w-5 h-5 text-amber-200/90 animate-bounce drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" />
        </div>

        {/* 6. Ambient Soundscape Toggle */}
        <SoundToggle />
      </div>
    </div>
  );
};
