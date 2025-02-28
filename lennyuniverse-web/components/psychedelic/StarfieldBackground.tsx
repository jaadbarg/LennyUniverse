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
  // Precompute all stars at render time
  const stars = Array.from({ length: Math.min(starCount, 150) }).map((_, i) => {
    // Static positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Visual properties
    const size = 1 + Math.random() * 2;
    const blurAmount = Math.random() > 0.8 ? `${1 + Math.random() * 2}px` : '0';
    
    // Animation properties - each star gets a unique but fixed animation delay
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;
    
    // Color - most stars are white, some have subtle tint
    const colorIndex = Math.random();
    let color;
    if (colorIndex > 0.9) color = '#FFDDFF'; // Slight pink
    else if (colorIndex > 0.8) color = '#DDDDFF'; // Slight blue
    else color = '#FFFFFF'; // White
    
    return { x, y, size, color, delay, duration, blurAmount };
  });
  
  // Create a few static nebulas if requested
  const nebulas = withNebulas ? Array.from({ length: 3 }).map((_, i) => {
    const x = 15 + Math.random() * 70; // Keep away from edges
    const y = 15 + Math.random() * 70;
    const size = 30 + Math.random() * 30; // Large nebulas
    
    // Choose nebula color
    const colorSchemes = [
      { main: 'rgba(255,0,255,0.03)', glow: 'rgba(255,0,255,0.02)' }, // Pink
      { main: 'rgba(157,0,255,0.03)', glow: 'rgba(157,0,255,0.02)' }, // Purple
      { main: 'rgba(0,255,255,0.03)', glow: 'rgba(0,255,255,0.02)' }, // Teal
    ];
    const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    
    return { x, y, size, ...colorScheme };
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
            boxShadow: `0 0 ${star.size + 1}px ${star.color}`,
            filter: star.blurAmount ? `blur(${star.blurAmount})` : 'none',
            opacity: 0.7,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
      
      {/* Optional static nebulas */}
      {withNebulas && nebulas.map((nebula, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full nebula-pulse"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${nebula.size}vw`,
            height: `${nebula.size}vw`,
            background: `radial-gradient(circle, ${nebula.main} 0%, ${nebula.glow} 50%, transparent 70%)`,
            animationDelay: `${i * 3}s`
          }}
        />
      ))}
    </div>
  );
});

StarfieldBackground.displayName = 'StarfieldBackground';

export default StarfieldBackground;