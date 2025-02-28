import { memo } from 'react'; // Using React.memo without Framer Motion

interface NebulaBackgroundProps {
  opacity?: number;
  animate?: boolean; // No longer used, but kept for backward compatibility
  zIndex?: number;
}

// Ultra-optimized version - no animations at all, just a static background
const NebulaBackground = memo(({
  opacity = 0.8,
  animate = false, // Ignore animation flag
  zIndex = -10,
}: NebulaBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(30,0,40,1) 0%, rgba(10,0,20,1) 70%, rgba(0,0,10,1) 100%)',
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