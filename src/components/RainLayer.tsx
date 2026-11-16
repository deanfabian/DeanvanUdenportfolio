import React, { useEffect, useRef } from 'react';

interface RainLayerProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
}

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface BokehCircle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  pulseSpeed: number;
  pulsePhase: number;
  baseOpacity: number;
}

export const RainLayer: React.FC<RainLayerProps> = ({ canvasRef, containerRef }) => {
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize raindrops
    const dropCount = Math.floor((width * height) / 12000); // lightweight: ~80-140 drops
    const drops: Drop[] = [];
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 14 + Math.random() * 22,
        speed: 12 + Math.random() * 16,
        opacity: 0.15 + Math.random() * 0.35,
        width: 0.8 + Math.random() * 0.8,
      });
    }

    // Initialize soft traffic bokeh discs in lower screen quadrant
    const bokehColors = [
      'rgba(245, 158, 11, ', // warm amber
      'rgba(239, 68, 68, ',  // tail red
      'rgba(254, 243, 199, ', // pale tungsten
      'rgba(147, 197, 253, ', // cool xenon
    ];

    const bokehCount = 18;
    const bokehs: BokehCircle[] = [];
    for (let i = 0; i < bokehCount; i++) {
      const colorBase = bokehColors[Math.floor(Math.random() * bokehColors.length)];
      bokehs.push({
        x: Math.random() * width,
        y: height * 0.65 + Math.random() * (height * 0.35),
        radius: 18 + Math.random() * 32,
        color: colorBase,
        speedX: (Math.random() - 0.5) * 0.35,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.08 + Math.random() * 0.14,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw soft traffic bokeh circles with blur
      for (const b of bokehs) {
        b.x += b.speedX;
        if (b.x < -60) b.x = width + 60;
        if (b.x > width + 60) b.x = -60;

        b.pulsePhase += b.pulseSpeed;
        const currentOpacity = b.baseOpacity * (0.8 + 0.25 * Math.sin(b.pulsePhase));

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `${b.color}${currentOpacity})`);
        grad.addColorStop(0.6, `${b.color}${currentOpacity * 0.4})`);
        grad.addColorStop(1, `${b.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw rain streaks
      ctx.strokeStyle = 'rgba(219, 234, 254, 0.35)';
      ctx.lineCap = 'round';

      for (const d of drops) {
        ctx.lineWidth = d.width;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        // Subtle wind slant (drift ~2px left for 20px length)
        ctx.lineTo(d.x - 2, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.8;

        if (d.y > height) {
          d.y = -d.length;
          d.x = Math.random() * (width + 50);
        }
        if (d.x < -10) {
          d.x = width + 10;
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
