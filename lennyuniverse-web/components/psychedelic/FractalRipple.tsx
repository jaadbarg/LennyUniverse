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
  color = '#FF00FF',
  size = 100,
  duration = 1.2,
  iterationCount = 4
}: FractalRippleProps) => {
  // Generate multiple ripple rings with different properties
  const ripples = Array.from({ length: iterationCount }).map((_, i) => {
    // Calculate parameters for this ripple
    const delay = i * 0.1;
    const sizeFactor = 1 - (i / (iterationCount * 2));
    const opacity = 0.8 - (i / iterationCount) * 0.5;
    
    // Calculate fibonacci-based parameters for natural appearance
    const fibonacci = (n: number): number => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
    const fibValue = fibonacci(i % 6); // Keep value manageable
    
    // Create gradient stops for fractal-like appearance
    const gradientAngle = (360 / iterationCount) * i;
    
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