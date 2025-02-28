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
  // Precompute all stars at render time - increased brightness and presence
  const stars = Array.from({ length: Math.min(starCount, 250) }).map((_, i) => {
    // Static positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Enhanced visual properties - larger, brighter stars
    const sizeFactor = Math.random();
    const size = sizeFactor < 0.7 ? (1 + Math.random() * 2) : (2.5 + Math.random() * 3); // More large stars
    
    // Some stars get glow effect
    const blurAmount = sizeFactor > 0.6 ? `${1 + Math.random() * 3}px` : '0';
    
    // Animation properties - more varied twinkle patterns
    const delay = Math.random() * 5;
    const duration = 1.5 + Math.random() * 3; // Faster twinkling
    
    // Enhanced color variety - more vibrant colors
    const colorIndex = Math.random();
    let color;
    if (colorIndex > 0.92) color = '#FF9DFF'; // Bright pink
    else if (colorIndex > 0.84) color = '#9DDDFF'; // Bright blue
    else if (colorIndex > 0.76) color = '#FFFF9D'; // Slight yellow
    else if (colorIndex > 0.68) color = '#FFDDFF'; // Slight pink
    else color = '#FFFFFF'; // White
    
    // Make some stars (especially larger ones) extra bright
    const brightness = sizeFactor > 0.7 ? 1.5 : 1;
    
    return { x, y, size, color, delay, duration, blurAmount, brightness };
  });
  
  // Create enhanced, more vibrant nebulas if requested
  const nebulas = withNebulas ? Array.from({ length: 5 }).map((_, i) => {
    const x = 15 + Math.random() * 70; // Keep away from edges
    const y = 15 + Math.random() * 70;
    const size = 30 + Math.random() * 40; // Larger nebulas
    
    // Choose nebula color with more vibrant options
    const colorSchemes = [
      { main: 'rgba(255,0,255,0.12)', glow: 'rgba(255,0,255,0.06)', outer: 'rgba(255,0,255,0.02)' }, // Magenta
      { main: 'rgba(157,0,255,0.12)', glow: 'rgba(157,0,255,0.06)', outer: 'rgba(157,0,255,0.02)' }, // Purple
      { main: 'rgba(0,255,255,0.12)', glow: 'rgba(0,255,255,0.06)', outer: 'rgba(0,255,255,0.02)' }, // Teal
      { main: 'rgba(255,50,150,0.12)', glow: 'rgba(255,50,150,0.06)', outer: 'rgba(255,50,150,0.02)' }, // Pink-Red
      { main: 'rgba(100,0,255,0.12)', glow: 'rgba(100,0,255,0.06)', outer: 'rgba(100,0,255,0.02)' }, // Indigo
    ];
    const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    
    // Add animation cycle variation for more dynamic appearance
    const animationDelay = i * 3;
    const animationDuration = 10 + Math.random() * 15;
    
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
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full twinkle-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            filter: star.blurAmount ? `blur(${star.blurAmount})` : 'none',
            opacity: 0.9, // Higher base opacity
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            // Add CSS variable for animation intensity
            '--twinkle-min': '0.6',
            '--twinkle-max': '1',
          } as React.CSSProperties}
        />
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