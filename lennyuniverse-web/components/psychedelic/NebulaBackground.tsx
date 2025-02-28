import { motion } from 'framer-motion';
import { memo } from 'react'; // Import memo for component optimization

interface NebulaBackgroundProps {
  opacity?: number;
  animate?: boolean;
  zIndex?: number;
}

// Optimize the component with memo to prevent unnecessary re-renders
const NebulaBackground = memo(({
  opacity = 0.8,
  animate = true,
  zIndex = -10,
}: NebulaBackgroundProps) => {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, rgba(30,0,40,1) 0%, rgba(10,0,20,1) 70%, rgba(0,0,10,1) 100%)',
        filter: 'brightness(0.7) contrast(1.2)',
        opacity,
        zIndex,
        willChange: animate ? 'background-position' : 'auto', // Hardware acceleration hint
      }}
      animate={animate ? {
        backgroundPosition: ['0% 0%', '100% 100%'],
      } : {}}
      transition={{
        duration: 40, // Slower animation = less CPU usage
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse"
      }}
      initial={false} // Skip initial animation
    />
  );
});

// Add display name for better debugging
NebulaBackground.displayName = 'NebulaBackground';

export default NebulaBackground;