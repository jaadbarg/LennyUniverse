import { useState, useEffect, memo, useCallback } from 'react';
import FractalRipple from './FractalRipple';

// We need to dynamically import the ClickExplosion component to fix build issues
// React's lazy loading isn't available for server components
interface SimpleExplosionProps {
  particleCount?: number;
  particleLifetime?: number;
  colors?: string[];
  enabled?: boolean;
  maxExplosions?: number;
}

const ClickExplosion = memo(({
  particleCount = 15,
  particleLifetime = 1200,
  colors = ['#FF00FF', '#9D00FF', '#00FFFF']
}: SimpleExplosionProps) => {
  // This is a simplified version that just displays circles at the explosion point
  const circles = Array.from({ length: 8 }).map((_, i) => {
    const size = 5 + Math.random() * 15;
    const angle = (i / 8) * Math.PI * 2;
    const distance = 30 + Math.random() * 80;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const delay = Math.random() * 0.2;
    const duration = 0.6 + Math.random() * 0.7;
    
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 ${size/2}px ${color}`,
          opacity: 0,
          transform: `translate(${x}px, ${y}px) scale(0)`,
          animation: `explosionParticle ${duration}s forwards ${delay}s`,
        }}
      />
    );
  });
  
  return <div style={{ position: 'relative' }}>{circles}</div>;
});

ClickExplosion.displayName = 'ClickExplosion';

interface ClickEffectsProps {
  enabled?: boolean;
  maxEffects?: number;
  effectDuration?: number;
  colors?: string[];
}

// Combined click effects manager that handles both particle explosions and fractal ripples
const ClickEffects = memo(({
  enabled = true,
  maxEffects = 3,
  effectDuration = 1500,
  colors = ['#FF00FF', '#9D00FF', '#00FFFF', '#FF40FF', '#FFFFFF']
}: ClickEffectsProps) => {
  const [effects, setEffects] = useState<Array<{
    id: number;
    x: number;
    y: number;
    type: 'explosion' | 'ripple';
    color: string;
  }>>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      // Limit number of simultaneous effects
      if (effects.length >= maxEffects) return;
      
      // Get click position
      const x = e.clientX;
      const y = e.clientY;
      
      // Generate effect ID
      const effectId = Date.now();
      
      // Randomly select effect type (explosion or ripple)
      const type = Math.random() > 0.5 ? 'explosion' : 'ripple';
      
      // Randomly select color
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Add this effect to state
      setEffects(prev => [...prev, { id: effectId, x, y, type, color }]);
      
      // Remove effect after lifetime
      setTimeout(() => {
        setEffects(prev => prev.filter(effect => effect.id !== effectId));
      }, effectDuration);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [enabled, maxEffects, effects.length, colors, effectDuration]);

  return (
    <>
      {effects.map(effect => {
        // Create a new explosion element when needed
        if (effect.type === 'explosion') {
          return (
            <div key={effect.id} style={{ position: 'fixed', zIndex: 100, pointerEvents: 'none' }}>
              <ClickExplosion 
                enabled={false} // We manage the effects internally
                particleCount={15}
                maxExplosions={1}
                particleLifetime={effectDuration}
                colors={[effect.color, ...colors.filter(c => c !== effect.color)]} 
              />
            </div>
          );
        } else {
          // Return a fractal ripple
          return (
            <FractalRipple
              key={effect.id}
              x={effect.x}
              y={effect.y}
              color={effect.color}
              size={120}
              duration={1.2}
              iterationCount={5}
            />
          );
        }
      })}
    </>
  );
});

ClickEffects.displayName = 'ClickEffects';

export default ClickEffects;