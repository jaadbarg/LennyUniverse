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
    
    // Enhanced color palette with refined psychedelic theme
    const colorIndex = Math.floor(Math.random() * 5);
    const colorPalette = [
      '#F2EAFF', // Purplish white (starWhite)
      '#F2EAFF', // Repeat for more common
      '#E9D6FF', // Light purple tint
      '#D1F2FF', // Light teal tint
      '#FFF8D6', // Light gold tint
    ];
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
    
    // Refined psychedelic color schemes for nebulas
    const colorSchemes = [
      { main: 'rgba(226,51,255,0.12)', glow: 'rgba(226,51,255,0.06)', outer: 'rgba(226,51,255,0.02)' }, // psychedelicMagenta
      { main: 'rgba(139,49,255,0.12)', glow: 'rgba(139,49,255,0.06)', outer: 'rgba(139,49,255,0.02)' }, // psychedelicPurple
      { main: 'rgba(0,209,209,0.12)', glow: 'rgba(0,209,209,0.06)', outer: 'rgba(0,209,209,0.02)' }, // psychedelicTeal
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
      
      {/* Simple static stars for guaranteed rendering */}
      <div className="absolute inset-0">
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
              boxShadow: star.size > 2 ? `0 0 ${star.size}px ${star.color}` : 'none',
              filter: star.blurAmount ? `blur(${star.blurAmount})` : 'none',
              opacity: 0.9,
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            }}
          />
        ))}
      </div>
      
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