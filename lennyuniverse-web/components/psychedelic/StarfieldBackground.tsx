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
  // Increased number of stars for better visibility
  const stars = Array.from({ length: Math.min(starCount * 2, 200) }).map((_, i) => {
    // Static positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Improved visual properties with brighter appearance
    const sizeFactor = Math.random();
    // Slightly larger stars for better visibility
    const size = sizeFactor < 0.6 ? (1.5 + Math.random() * 2) : (3 + Math.random() * 3); 
    
    // Selective blur for glow effect
    const blurAmount = sizeFactor > 0.7 ? `${1 + Math.random() * 2}px` : '0';
    
    // Animation properties - varied more for realistic twinkling
    const groupIndex = Math.floor(i / 20);
    const delay = (groupIndex * 0.8 + Math.random() * 1.5) % 5;
    const duration = 2 + (i % 5) * 1.2; // More varied durations
    
    // Enhanced color palette with brighter values
    const colorIndex = Math.floor(Math.random() * 5);
    const colorPalette = [
      '#FFFFFF', // Pure white (brightest)
      '#F2EAFF', // Purplish white (starWhite)
      '#E9D6FF', // Light purple tint
      '#D1F2FF', // Light teal tint
      '#FFF8D6', // Light gold tint
    ];
    const color = colorPalette[colorIndex];
    
    return { x, y, size, color, delay, duration, blurAmount };
  });
  
  // Increased number of nebulas for a more immersive space effect
  const nebulas = withNebulas ? Array.from({ length: 5 }).map((_, i) => {
    // More distributed positions across the screen
    const positions = [
      { x: 15, y: 25 },
      { x: 65, y: 15 },
      { x: 40, y: 60 },
      { x: 80, y: 75 },
      { x: 30, y: 85 }
    ];
    const { x, y } = positions[i];
    
    // Varied sizes for better visual distribution
    const sizes = [30, 40, 35, 45, 38];
    const size = sizes[i];
    
    // Refined psychedelic color schemes for nebulas
    const colorSchemes = [
      { main: 'rgba(226,51,255,0.12)', glow: 'rgba(226,51,255,0.06)', outer: 'rgba(226,51,255,0.02)' }, // psychedelicMagenta
      { main: 'rgba(139,49,255,0.12)', glow: 'rgba(139,49,255,0.06)', outer: 'rgba(139,49,255,0.02)' }, // psychedelicPurple
      { main: 'rgba(0,209,209,0.12)', glow: 'rgba(0,209,209,0.06)', outer: 'rgba(0,209,209,0.02)' }, // psychedelicTeal
      { main: 'rgba(226,51,255,0.12)', glow: 'rgba(226,51,255,0.06)', outer: 'rgba(226,51,255,0.02)' }, // Fallback duplicates
      { main: 'rgba(139,49,255,0.12)', glow: 'rgba(139,49,255,0.06)', outer: 'rgba(139,49,255,0.02)' }, // Fallback duplicates
    ];
    const colorScheme = colorSchemes[i % colorSchemes.length];
    
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
        zIndex: 0, // Reset to default z-index
        background: 'radial-gradient(ellipse at center, rgba(10,0,30,1) 0%, rgba(0,0,10,1) 100%)' 
      }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at 30% 20%, rgba(50,0,60,0.15) 0%, transparent 40%),radial-gradient(circle at 70% 60%, rgba(157,0,255,0.1) 0%, transparent 30%)' 
      }} />
      
      {/* Simple static stars for guaranteed rendering - increased brightness and size */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size + 2}px`, /* Further increased size */
              height: `${star.size + 2}px`, /* Further increased size */
              backgroundColor: "#FFFFFF",
              boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
              filter: star.blurAmount ? `blur(${star.blurAmount})` : 'none',
              opacity: 1, /* Maximum opacity */
              animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Enhanced nebula effects - increased brightness and z-index */}
      <div style={{ zIndex: 1, position: 'relative' }}>
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
                ${nebula.main.replace(',0.12)', ',0.25)')} 10%, 
                ${nebula.glow.replace(',0.06)', ',0.15)')} 40%, 
                ${nebula.outer.replace(',0.02)', ',0.08)')} 65%, 
                transparent 80%)`,
              animationDelay: `${nebula.animationDelay}s`,
              animationDuration: `${nebula.animationDuration}s`,
              opacity: 0.95,
              mixBlendMode: 'screen',
              filter: 'blur(5px)',
              boxShadow: `0 0 30px ${nebula.main.replace(',0.12)', ',0.15)')}`,
            }}
          />
        ))}
      </div>
    </div>
  );
});

StarfieldBackground.displayName = 'StarfieldBackground';

export default StarfieldBackground;