import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface FractalRippleProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  duration?: number;
  iterationCount?: number;
}

// A mathematical ripple effect component that creates
// a mandelbrot-inspired ripple animation at the click point
const FractalRipple = memo(({
  x,
  y,
  color = '#E233FF', // Updated to psychedelicMagenta
  size = 100,
  duration = 1.2,
  iterationCount = 4
}: FractalRippleProps) => {
  // Check if we're on a mobile device
  const isMobile = typeof window !== 'undefined' && 
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
    window.innerWidth < 768);
  
  // Reduce complexity on mobile
  const effectiveIterationCount = isMobile ? Math.min(3, iterationCount) : iterationCount;
  
  // Generate multiple ripple rings with different properties
  const ripples = Array.from({ length: effectiveIterationCount }).map((_, i) => {
    // Calculate parameters for this ripple - simpler on mobile
    const delay = i * 0.1;
    const sizeFactor = 1 - (i / (effectiveIterationCount * 2));
    const opacity = 0.7 - (i / effectiveIterationCount) * 0.4;
    
    // Calculate fibonacci-based parameters for natural appearance
    // On mobile, use simpler math to avoid complex calculations
    let fibValue = 1;
    if (!isMobile) {
      const fibonacci = (n: number): number => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
      fibValue = fibonacci(i % 4); // Reduced complexity, keep value manageable
    }
    
    // Create gradient stops for fractal-like appearance
    const gradientAngle = (360 / effectiveIterationCount) * i;
    
    return (
      <motion.div
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: size * sizeFactor,
          height: size * sizeFactor,
          borderRadius: '50%',
          // Creates interesting geometric patterns in the ripple
          border: `${Math.max(1, fibValue)}px solid ${color}`,
          // Apply nonlinear transformations to create more complex patterns
          background: `radial-gradient(circle at ${50 + Math.sin(i) * 20}% ${50 + Math.cos(i) * 20}%, 
                       transparent 60%, ${color}20 ${65 + i * 5}%, transparent ${85 + i * 2}%)`,
          boxShadow: `0 0 ${8 + i * 2}px ${color}`,
          zIndex: 50 - i,
          opacity: 0,
          // Create complex transform pattern for more visual interest
          transform: `translate(-50%, -50%) rotate(${gradientAngle}deg)`,
        }}
        initial={{
          opacity: 0,
          scale: 0.1,
        }}
        animate={{
          opacity: [0, opacity, 0],
          scale: [0.3, 1 + (fibValue / 10), 1.5 + (i / iterationCount)],
        }}
        transition={{
          duration: duration + (i * 0.1),
          delay: delay,
          ease: [0.1, 0.4, 0.2, 1], // Custom bezier curve for more organic motion
        }}
      />
    );
  });

  return (
    <div 
      style={{ 
        position: 'fixed',
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999, // Ensure it's visible above other content
      }}
    >
      {/* Add a quick flash effect for immediate visual feedback */}
      <div
        className="flash-effect"
        style={{
          position: 'absolute',
          left: -50,
          top: -50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          boxShadow: `0 0 30px ${color}`,
          opacity: 0,
          animation: 'flashEffect 0.7s ease-out forwards'
        }}
      />
      {ripples}
    </div>
  );
});

FractalRipple.displayName = 'FractalRipple';

export default FractalRipple;