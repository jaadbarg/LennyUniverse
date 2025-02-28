import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExplosionParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle' | 'spiral';
}

interface ClickExplosionProps {
  enabled?: boolean;
  particleCount?: number;
  maxExplosions?: number;
  particleLifetime?: number;
  colors?: string[];
}

const ClickExplosion = memo(({
  enabled = true,
  particleCount = 15,
  maxExplosions = 3,
  particleLifetime = 1200,
  colors = ['#FF00FF', '#9D00FF', '#00FFFF', '#FF40FF', '#FFFFFF']
}: ClickExplosionProps) => {
  const [explosions, setExplosions] = useState<{
    id: number;
    x: number;
    y: number;
    particles: ExplosionParticle[];
  }[]>([]);

  // Mathematical function to create fractal-like patterns
  const calculateFractalOffset = (angle: number, iteration: number, scale: number): { x: number, y: number } => {
    // Mandelbrot-inspired pattern calculation (simplified)
    const factor = Math.sin(iteration * 0.4) * scale;
    const x = Math.cos(angle + iteration * 0.2) * factor;
    const y = Math.sin(angle + iteration * 0.2) * factor;
    
    return { x, y };
  };
  
  // Create SVG path for spiral shape
  const createSpiralPath = (size: number): string => {
    let path = 'M0,0 ';
    const turns = 2;
    const pointCount = 20;
    
    for (let i = 0; i <= pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2 * turns;
      const radius = (i / pointCount) * size;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      path += `L${x},${y} `;
    }
    
    return path;
  };

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      // Limit number of simultaneous explosions
      if (explosions.length >= maxExplosions) return;
      
      // Get click position
      const x = e.clientX;
      const y = e.clientY;
      
      // Generate explosion ID
      const explosionId = Date.now();
      
      // Generate particles for this explosion
      const particles: ExplosionParticle[] = [];
      
      // Create geometric/fractal pattern particles
      for (let i = 0; i < particleCount; i++) {
        // Base angle uniformly distributed in circle
        const baseAngle = (i / particleCount) * Math.PI * 2;
        
        // Create multiple particles per angle to form patterns
        for (let j = 0; j < 3; j++) {
          // Apply fractal patterns to particle placement
          const { x: offsetX, y: offsetY } = calculateFractalOffset(baseAngle, j, 0.5);
          const angle = baseAngle + offsetX * 0.5;
          
          // Logarithmic distance distribution creates more interesting patterns
          const distance = 40 + Math.pow(Math.random() * 150, 1.5) * (1 + offsetY);
          
          // Randomize particle properties with mathematical influences
          const color = colors[Math.floor(Math.random() * colors.length)];
          const size = 5 + Math.random() * 20;
          const delay = Math.random() * 0.15; // Staggered appearance
          const duration = 0.6 + Math.random() * 0.8;
          const rotation = Math.random() * 360;
          
          // Different geometric shapes
          const shapes: ('circle' | 'square' | 'triangle' | 'spiral')[] = ['circle', 'square', 'triangle', 'spiral'];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          
          particles.push({
            id: i * 3 + j,
            x,
            y,
            size,
            color,
            angle,
            distance,
            delay,
            duration,
            rotation,
            shape
          });
        }
      }
      
      // Add this explosion to state
      setExplosions(prev => [...prev, { id: explosionId, x, y, particles }]);
      
      // Remove explosion after all particles have disappeared
      setTimeout(() => {
        setExplosions(prev => prev.filter(explosion => explosion.id !== explosionId));
      }, particleLifetime);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, maxExplosions, explosions.length, particleCount, colors, particleLifetime]);

  // Render the explosion particle component
  const renderParticle = (particle: ExplosionParticle) => {
    const destinationX = Math.cos(particle.angle) * particle.distance;
    const destinationY = Math.sin(particle.angle) * particle.distance;
    
    // Define types properly for animation properties
    // Basic animation property definitions
    const initialProps = { x: 0, y: 0, opacity: 0, scale: 0.1 };
    const animateProps = { 
      x: destinationX, 
      y: destinationY, 
      opacity: [0, 1, 0.8, 0] as number[], 
      scale: [0.2, 1.5, 1, 0] as number[],
      rotate: particle.rotation + Math.random() * 720 - 360
    };
    const transitionProps = {
      duration: particle.duration,
      ease: "easeOut" as const,
      delay: particle.delay,
      opacity: { duration: particle.duration },
      scale: { duration: particle.duration },
    };
    
    // Style props separately defined for type safety
    const styleProps = {
      position: 'absolute' as const,
      left: 0,
      top: 0,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.shape === 'circle' ? particle.color : 'transparent',
      borderRadius: particle.shape === 'circle' ? '50%' : '0%',
      boxShadow: `0 0 ${particle.size/2}px ${particle.color}`,
    };

    // Render different shapes
    switch (particle.shape) {
      case 'square':
        return (
          <motion.div
            key={particle.id}
            initial={initialProps}
            animate={animateProps}
            transition={transitionProps}
            style={{
              ...styleProps,
              backgroundColor: particle.color,
              borderRadius: '2px',
            }}
          />
        );
      
      case 'triangle':
        return (
          <motion.div
            key={particle.id}
            initial={initialProps}
            animate={animateProps}
            transition={transitionProps}
            style={{
              position: 'absolute' as const,
              left: 0,
              top: 0,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${particle.size/2}px solid transparent`,
              borderRight: `${particle.size/2}px solid transparent`,
              borderBottom: `${particle.size}px solid ${particle.color}`,
              boxShadow: `0 0 ${particle.size/3}px ${particle.color}`,
            }}
          />
        );
      
      case 'spiral':
        return (
          <motion.svg
            key={particle.id}
            width={particle.size * 2}
            height={particle.size * 2}
            viewBox={`-${particle.size} -${particle.size} ${particle.size * 2} ${particle.size * 2}`}
            initial={initialProps}
            animate={animateProps}
            transition={transitionProps}
            style={{
              position: 'absolute' as const,
              left: 0,
              top: 0,
              width: particle.size * 2,
              height: particle.size * 2,
              backgroundColor: 'transparent',
              overflow: 'visible',
            }}
          >
            <motion.path
              d={createSpiralPath(particle.size)}
              fill="none"
              stroke={particle.color}
              strokeWidth={particle.size / 5}
              style={{
                filter: `drop-shadow(0 0 ${particle.size/6}px ${particle.color})`,
              }}
            />
          </motion.svg>
        );
      
      default: // Circle
        return (
          <motion.div 
            key={particle.id} 
            initial={initialProps}
            animate={animateProps}
            transition={transitionProps}
            style={styleProps}
          />
        );
    }
  };

  return (
    <>
      {explosions.map(explosion => (
        <div 
          key={explosion.id} 
          style={{ 
            position: 'fixed', 
            left: explosion.x, 
            top: explosion.y, 
            width: 0, 
            height: 0, 
            zIndex: 50,
            pointerEvents: 'none',
          }}
        >
          <AnimatePresence>
            {explosion.particles.map(particle => renderParticle(particle))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
});

ClickExplosion.displayName = 'ClickExplosion';

export default ClickExplosion;