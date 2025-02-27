import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StarfieldBackgroundProps {
  starCount?: number;
  depth?: number;
  speed?: number;
  opacity?: number;
  className?: string;
  colors?: string[];
  interactive?: boolean;
}

const StarfieldBackground = ({
  starCount = 200,
  depth = 3,
  speed = 0.5,
  opacity = 0.8,
  className = '',
  colors = ['#FFFFFF', '#FFEEDD', '#EEDDFF'],
  interactive = true
}: StarfieldBackgroundProps) => {
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    depth: number;
    opacity: number;
    color: string;
    twinkleSpeed: number;
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  
  // Initialize stars
  useEffect(() => {
    setMounted(true);
    
    // Get dimensions from container or use window size as fallback
    const width = containerRef.current?.clientWidth || window.innerWidth;
    const height = containerRef.current?.clientHeight || window.innerHeight;
    setDimensions({ width, height });
    
    // Create stars
    const newStars = Array.from({ length: starCount }).map((_, i) => {
      const starDepth = Math.random() * depth;
      const twinkleSpeed = 0.5 + Math.random() * 2;
      
      return {
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2 * (1 - starDepth / depth), // Larger stars in front
        depth: starDepth,
        opacity: 0.2 + Math.random() * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed,
      };
    });
    
    setStars(newStars);
    
    // Update dimensions on resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || window.innerWidth;
      const newHeight = containerRef.current?.clientHeight || window.innerHeight;
      setDimensions({ width: newWidth, height: newHeight });
      
      // Reposition stars within new dimensions
      setStars(prevStars =>
        prevStars.map(star => ({
          ...star,
          x: (star.x / dimensions.width) * newWidth,
          y: (star.y / dimensions.height) * newHeight,
        }))
      );
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [starCount, depth, colors]);
  
  // Handle mouse movement for interactive parallax effect
  useEffect(() => {
    if (!interactive || !mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, mounted]);
  
  // Don't render anything on SSR
  if (!mounted) return null;
  
  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
      style={{ zIndex: -1 }}
    >
      {stars.map((star) => {
        // Calculate parallax effect based on mouse position and star depth
        const moveFactorX = interactive ? ((mousePosition.x / dimensions.width) - 0.5) * star.depth * 20 * speed : 0;
        const moveFactorY = interactive ? ((mousePosition.y / dimensions.height) - 0.5) * star.depth * 20 * speed : 0;
        
        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
            animate={{
              x: moveFactorX,
              y: moveFactorY,
              opacity: [
                star.opacity,
                star.opacity * 0.5,
                star.opacity
              ],
            }}
            transition={{
              x: { duration: 0.2, ease: "linear" },
              y: { duration: 0.2, ease: "linear" },
              opacity: {
                duration: star.twinkleSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        );
      })}
      
      {/* Add subtle glow/fog effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(25,0,50,0.05) 0%, rgba(10,0,20,0.15) 70%, rgba(5,0,10,0.3) 100%)',
          mixBlendMode: 'screen'
        }}
      />
    </motion.div>
  );
};

export default StarfieldBackground;