import React, { useEffect, useState, useRef, useMemo } from 'react';

const splotchColors = [
  'rgba(133, 42, 194, 0.38)',  // Purple
  'rgba(229, 122, 68, 0.70)',   // Orange
  'rgba(181, 118, 223, 0.66)',  // Light Purple
  'rgba(146, 79, 191, 0.45)',   // Dark Purple
];

const Splotch = ({ color, index, baseX = 0, baseY = 0, theta }) => {
  const splotchRef = useRef(null);
  
  // Generate stable random values for orbital motion (only once on mount)
  const animationConfig = useMemo(() => {
    const speedMultiplier = 1.2; // Much faster movement
    return {
      amplitudeX: 400 + Math.random() * 200, // Even larger orbit
      amplitudeY: 200 + Math.random() * 150, // Even larger orbit
      speedX: (0.3 + Math.random() * 0.7) * speedMultiplier,
      speedY: (0.3 + Math.random() * 0.7) * speedMultiplier,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      size: 400 + Math.random() * 600, // Larger splotches
      initialX: baseX + (Math.random() - 0.5) * window.innerWidth,
      initialY: baseY + (Math.random() - 0.5) * window.innerHeight,
    };
  }, [baseX, baseY]);

  useEffect(() => {
    const element = splotchRef.current;
    if (!element) return;

    let animationFrameId;
    let startTime = performance.now();

    const animate = (currentTime) => {
      const t = (currentTime - startTime) / 1000; // Convert to seconds
      
      // Elliptical orbit using sine/cosine waves
      const offsetX = Math.sin(t * animationConfig.speedX + animationConfig.phaseX) * animationConfig.amplitudeX;
      const offsetY = Math.cos(t * animationConfig.speedY + animationConfig.phaseY) * animationConfig.amplitudeY;
      
      // Total position (initial + animated offset)
      const x = animationConfig.initialX + offsetX;
      const y = animationConfig.initialY + offsetY;
      
      // Scale variation for breathing effect
      const scale = 0.8 + Math.sin(t * 0.5 + index) * 0.2;
      
      // Opacity variation
      const opacity = 0.5 + Math.sin(t * 0.3 + index * 0.5) * 0.2;

      // Apply transform: first center the element, then move it to calculated position
      element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      element.style.opacity = opacity;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animationConfig, index]);

  return (
    <div
      ref={splotchRef}
      className="absolute rounded-full mix-blend-screen filter blur-[120px] will-change-transform"
      style={{
        backgroundColor: color,
        width: `${animationConfig.size}px`,
        height: `${animationConfig.size}px`,
        left: '50%',
        top: '50%',
        pointerEvents: 'none',
      }}
    />
  );
};

const BackgroundGradient = () => {
  const thetaRef = useRef(0);

  useEffect(() => {
    // Continuously increment theta for infinite animation
    let startTime = performance.now();
    let animationFrameId;

    const updateTheta = (currentTime) => {
      thetaRef.current = (currentTime - startTime) / 1000;
      animationFrameId = requestAnimationFrame(updateTheta);
    };

    animationFrameId = requestAnimationFrame(updateTheta);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0f0c14]">
      {/* Splotches Layer */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <Splotch
            key={i}
            index={i}
            color={splotchColors[i % splotchColors.length]}
            baseX={0}
            baseY={0}
            theta={thetaRef}
          />
        ))}
      </div>
      
      {/* Blur Overlay for smooth blending */}
      <div className="absolute inset-0 backdrop-blur-[80px]" />
    </div>
  );
};

export default BackgroundGradient;
