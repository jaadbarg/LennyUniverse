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
  
  // Setup interval for occasional explosions
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.3) { // Only 70% chance to create explosion
        createExplosion();
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [createExplosion, interval]);
  
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
      
      {/* Add a few random shooting stars */}
      {Array.from({ length: count }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 4 + Math.random() * 6;
        const delay = Math.random() * 15;
        const rotation = Math.random() * 360;
        
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