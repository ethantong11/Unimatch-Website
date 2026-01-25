import React, { useEffect, useRef, useMemo } from 'react';
import { useDeviceType } from '@/hooks/useDeviceType';

const splotchColors = [
  '#852ac261', // Purple
  '#e57a4459', // Orange
  '#b576dfa8', // Light Purple
  '#ff408033', // Pink
];

interface SplotchProps {
  color: string;
  index: number;
  baseX?: number;
  baseY?: number;
  isMobile: boolean;
}

const Splotch = ({ color, index, baseX = 0, baseY = 0, isMobile }: SplotchProps) => {
  const splotchRef = useRef<HTMLDivElement>(null);
  
  // Device-specific animation config
  const animationConfig = useMemo(() => {
    const speedMultiplier = isMobile ? 0.6 : 1.0;
    const amplitudeMultiplier = isMobile ? 0.4 : 1.0;
    const sizeMultiplier = isMobile ? 0.4 : 1.0;
    
    return {
      amplitudeX: (400 + Math.random() * 200) * amplitudeMultiplier,
      amplitudeY: (200 + Math.random() * 150) * amplitudeMultiplier,
      speedX: (0.3 + Math.random() * 0.7) * speedMultiplier,
      speedY: (0.3 + Math.random() * 0.7) * speedMultiplier,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      size: (400 + Math.random() * 600) * sizeMultiplier,
      initialX: baseX + (Math.random() - 0.5) * window.innerWidth * 0.5,
      initialY: baseY + (Math.random() - 0.5) * window.innerHeight * 0.5,
    };
  }, [baseX, baseY, isMobile]);

  useEffect(() => {
    const element = splotchRef.current;
    if (!element) return;

    let animationFrameId: number;
    let startTime = performance.now();
    let lastFrameTime = startTime;

    const animate = (currentTime: number) => {
      // Throttle animation frames on mobile
      if (isMobile && currentTime - lastFrameTime < 32) { // ~30fps on mobile
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;

      const t = (currentTime - startTime) / 1000;
      
      const offsetX = Math.sin(t * animationConfig.speedX + animationConfig.phaseX) * animationConfig.amplitudeX;
      const offsetY = Math.cos(t * animationConfig.speedY + animationConfig.phaseY) * animationConfig.amplitudeY;
      
      const x = animationConfig.initialX + offsetX;
      const y = animationConfig.initialY + offsetY;
      
      // Simplified animations on mobile (no scale/opacity variations)
      if (isMobile) {
        element.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
      } else {
        const scale = 0.8 + Math.sin(t * 0.5 + index) * 0.2;
        const opacity = 0.5 + Math.sin(t * 0.3 + index * 0.5) * 0.2;
        element.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
        element.style.opacity = opacity.toString();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animationConfig, index, isMobile]);

  const blurAmount = isMobile ? 40 : 80;

  return (
    <div
      ref={splotchRef}
      className="absolute rounded-full mix-blend-screen will-change-transform"
      style={{
        backgroundColor: color,
        width: `${animationConfig.size}px`,
        height: `${animationConfig.size}px`,
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
        filter: `blur(${blurAmount}px)`,
        backfaceVisibility: 'hidden',
        contain: 'layout style paint',
      }}
    />
  );
};

const BackgroundGradient = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  // Device-specific splotch count
  const splotchCount = isMobile ? 5 : 12;
  const backdropBlur = isMobile ? 20 : 50;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0f0c14]">
      {/* Splotches Layer */}
      <div className="absolute inset-0">
        {Array.from({ length: splotchCount }).map((_, i) => (
          <Splotch
            key={i}
            index={i}
            color={splotchColors[i % splotchColors.length]}
            baseX={0}
            baseY={0}
            isMobile={isMobile}
          />
        ))}
      </div>
      
      {/* Blur Overlay for smooth blending */}
      <div 
        className="absolute inset-0" 
        style={{ backdropFilter: `blur(${backdropBlur}px)` }}
      />
    </div>
  );
};

export default BackgroundGradient;
