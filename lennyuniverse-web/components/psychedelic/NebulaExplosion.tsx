import { memo, useCallback, useEffect, useState } from 'react';

interface NebulaExplosionProps {
  count?: number;
  interval?: number; // How often to trigger a new explosion (ms)
  maxActive?: number; // Max number of simultaneous explosions
  zIndex?: number;
}

// Ultra-lightweight nebula explosion effect for distant space events
const NebulaExplosion = memo(({
  count = 3,
  interval = 8000,
  maxActive = 2,
  zIndex = -1
}: NebulaExplosionProps) => {
  const [explosions, setExplosions] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
  }>>([]);
  
  // Function to generate a new explosion
  const createExplosion = useCallback(() => {
    // If we have reached max active explosions, don't create more
    if (explosions.length >= maxActive) return;
    
    // Position away from the edges
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    
    // Enhanced visual properties - bigger, more dramatic
    const size = 100 + Math.random() * 150; // Larger explosion size for more impact
    const duration = 6 + Math.random() * 4; // Longer duration for more visible effect
    
    // Enhanced color selection - more vibrant, higher opacity
    const colors = [
      'rgba(255,0,255,0.25)', // Bright Pink
      'rgba(157,0,255,0.25)', // Purple
      'rgba(0,255,255,0.25)',  // Teal
      'rgba(255,50,150,0.25)', // Pink-Red
      'rgba(100,0,255,0.25)',  // Indigo
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const id = Date.now();
    
    setExplosions(prev => [...prev, { id, x, y, size, color, duration }]);
    
    // Remove explosion after it's done
    setTimeout(() => {
      setExplosions(prev => prev.filter(e => e.id !== id));
    }, duration * 1000);
  }, [explosions.length, maxActive]);
  
  // Throttled explosions for performance optimization
  useEffect(() => {
    // Only create explosions occasionally with more predictable timing
    // Fixed interval with no randomness for more stable performance 
    const timer = setInterval(() => {
      // Skip explosions entirely on mobile or low-end devices to save resources
      if (explosions.length < maxActive && 
          // Performance detection - more comprehensive check
          typeof window !== 'undefined') {
            
        // Detect mobile devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                            window.innerWidth < 768;
                            
        // Check for CPU/memory limitations
        const isLowEndCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        // @ts-ignore - deviceMemory is not in all TypeScript definitions yet
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        
        // Only create explosion on capable devices
        if (!isMobile && !isLowEndCPU && !isLowMemory) {
          createExplosion();
        }
      }
    }, interval + 2000); // Longer interval for better performance
    
    return () => clearInterval(timer);
  }, [createExplosion, interval, explosions.length, maxActive]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex }}>
      {explosions.map(explosion => (
        <div
          key={explosion.id}
          className="absolute rounded-full nebula-explosion"
          style={{
            left: `${explosion.x}%`,
            top: `${explosion.y}%`,
            width: `${explosion.size}px`,
            height: `${explosion.size}px`,
            background: `radial-gradient(circle, ${explosion.color} 5%, ${explosion.color.replace(',0.25)', ',0.15)')} 40%, ${explosion.color.replace(',0.25)', ',0.05)')} 70%, transparent 85%)`,
            opacity: 0,
            transform: 'scale(0.1)',
            filter: 'blur(8px)',
            boxShadow: `0 0 30px ${explosion.color}`,
            mixBlendMode: 'screen',
            animation: `nebulaExplosion ${explosion.duration}s ease-in-out forwards`
          }}
        />
      ))}
      
      {/* Optimized shooting stars - only 1-2 for performance */}
      {typeof window !== 'undefined' && window.innerWidth > 768 && Array.from({ length: Math.min(count, 2) }).map((_, i) => {
        // Fixed positions for deterministic rendering
        const positions = [
          { x: 10, y: 20, rotation: 45 },
          { x: 75, y: 15, rotation: 30 }
        ];
        const { x, y, rotation } = positions[i];
        
        // Fixed timing to reduce animation complexity
        const duration = 5 + i * 3;
        const delay = 7 + i * 12;
        
        return (
          <div 
            key={`shootingstar-${i}`}
            className="shooting-star"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotation}deg)`
            }}
          />
        );
      })}
    </div>
  );
});

NebulaExplosion.displayName = 'NebulaExplosion';

export default NebulaExplosion;