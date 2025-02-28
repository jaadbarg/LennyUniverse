import { memo } from 'react';

interface StarfieldBackgroundProps {
  starCount?: number;
  opacity?: number;
  className?: string;
  withNebulas?: boolean;
}

// Ultra-lightweight starfield implementation using CSS only
// No state, no animations handled by JS, pure CSS for performance
const StarfieldBackground = memo(({
  starCount = 100,
  opacity = 0.8,
  className = '',
  withNebulas = false
}: StarfieldBackgroundProps) => {
  // Reduced number of stars for better performance but maintain visual appearance
  const stars = Array.from({ length: Math.min(starCount, 120) }).map((_, i) => {
    // Static positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Simplified visual properties with fewer variations
    const sizeFactor = Math.random();
    // Limit star sizes for performance - fewer pixels to render
    const size = sizeFactor < 0.8 ? (1 + Math.random() * 1.5) : (2 + Math.random() * 2); 
    
    // Very selective blur for performance - blur is expensive
    const blurAmount = sizeFactor > 0.85 ? `${1 + Math.random() * 2}px` : '0';
    
    // Animation properties - reduced animation complexity
    // Fixed durations for grouped stars to reduce unique animation calculations
    const groupIndex = Math.floor(i / 20); // Group stars to share timings
    const delay = (groupIndex * 0.8 + Math.random() * 1.5) % 5;
    const duration = 2 + (i % 3) * 1.2; // Only 3 different durations
    
    // Simpler colors - fewer unique values for better performance
    const colorIndex = Math.floor(Math.random() * 5);
    const colorPalette = ['#FFFFFF', '#FFFFFF', '#FFDDFF', '#9DDDFF', '#FFFF9D'];
    const color = colorPalette[colorIndex];
    
    return { x, y, size, color, delay, duration, blurAmount };
  });
  
  // Reduced number of nebulas and simplified for better performance
  const nebulas = withNebulas ? Array.from({ length: 3 }).map((_, i) => {
    // Fixed positions for more controlled performance
    const positions = [
      { x: 25, y: 30 },
      { x: 70, y: 20 },
      { x: 50, y: 70 }
    ];
    const { x, y } = positions[i];
    
    // Fixed sizes for better performance prediction
    const sizes = [35, 45, 40];
    const size = sizes[i];
    
    // Simplified color options - fewer unique values for performance
    const colorSchemes = [
      { main: 'rgba(255,0,255,0.12)', glow: 'rgba(255,0,255,0.06)', outer: 'rgba(255,0,255,0.02)' }, // Magenta
      { main: 'rgba(157,0,255,0.12)', glow: 'rgba(157,0,255,0.06)', outer: 'rgba(157,0,255,0.02)' }, // Purple
      { main: 'rgba(0,255,255,0.12)', glow: 'rgba(0,255,255,0.06)', outer: 'rgba(0,255,255,0.02)' }, // Teal
    ];
    const colorScheme = colorSchemes[i];
    
    // Fixed animation timings for consistent performance
    const animationDelay = i * 4;
    const animationDuration = 12 + i * 4; // Less randomness
    
    return { 
      x, y, size, 
      ...colorScheme, 
      animationDelay,
      animationDuration
    };
  }) : [];
  
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ 
        opacity, 
        zIndex: -1, 
        background: 'radial-gradient(ellipse at center, rgba(10,0,30,1) 0%, rgba(0,0,10,1) 100%)' 
      }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at 30% 20%, rgba(50,0,60,0.15) 0%, transparent 40%),radial-gradient(circle at 70% 60%, rgba(157,0,255,0.1) 0%, transparent 30%)' 
      }} />
      
      {/* Render static stars with CSS animations */}
      {/* Render stars with aggressive batching - stars with similar animations grouped together */}
      {[0, 1, 2].map(batch => (
        <div key={`batch-${batch}`} className={`absolute inset-0 batch-${batch}`}>
          {stars
            .filter((_, i) => {
              // On mobile, render even fewer stars for performance
              const isMobile = typeof window !== 'undefined' && 
                (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                window.innerWidth < 768);
                
              // On mobile, only render 1/5 of stars (batch 0 only gets rendered)
              return isMobile ? (batch === 0 && i % 5 === 0) : (i % 3 === batch);
            }) // Split into batches to reduce paint operations
            .map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full twinkle-star"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.color,
                  boxShadow: star.size > 2 ? `0 0 ${star.size}px ${star.color}` : 'none', // Only larger stars get glow
                  filter: star.blurAmount ? `blur(${star.blurAmount})` : 'none',
                  opacity: 0.9,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  '--twinkle-min': batch === 0 ? '0.6' : '0.5', // Different batch, different animation
                  '--twinkle-max': batch === 0 ? '1' : '0.9',
                } as React.CSSProperties}
              />
          ))}
        </div>
      ))}
      
      {/* Enhanced nebula effects */}
      {withNebulas && nebulas.map((nebula, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full nebula-pulse"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}vw`,
            height: `${nebula.size}vw`,
            background: `radial-gradient(circle, 
              ${nebula.main} 10%, 
              ${nebula.glow} 40%, 
              ${nebula.outer} 65%, 
              transparent 80%)`,
            animationDelay: `${nebula.animationDelay}s`,
            animationDuration: `${nebula.animationDuration}s`,
            opacity: 0.9,
            mixBlendMode: 'screen',
            filter: 'blur(5px)',
          }}
        />
      ))}
    </div>
  );
});

StarfieldBackground.displayName = 'StarfieldBackground';

export default StarfieldBackground;