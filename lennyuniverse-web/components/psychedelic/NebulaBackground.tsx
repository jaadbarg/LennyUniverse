import { memo } from 'react'; // Using React.memo without Framer Motion

interface NebulaBackgroundProps {
  opacity?: number;
  animate?: boolean; // No longer used, but kept for backward compatibility
  zIndex?: number;
}

// Ultra-optimized version with nebula.png background
const NebulaBackground = memo(({
  opacity = 0.8,
  animate = false, // Ignore animation flag
  zIndex = -10,
}: NebulaBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        backgroundImage: 'url("/nebula.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(10,0,20,1)',
        backgroundBlendMode: 'screen',
        filter: 'brightness(0.7) contrast(1.2)',
        opacity,
        zIndex,
      }}
    />
  );
});

// Add display name for better debugging
NebulaBackground.displayName = 'NebulaBackground';

export default NebulaBackground;