import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface PsychedelicBackgroundProps {
  children: ReactNode;
  variant?: 'gradient' | 'waves' | 'grid';
  intensity?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

const PsychedelicBackground = ({
  children,
  variant = 'gradient',
  intensity = 0.5,
  primaryColor = '#FF00FF',
  secondaryColor = '#9D00FF',
  tertiaryColor = '#00FFFF',
  animated = true,
  interactive = true,
  className = '',
}: PsychedelicBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const opacityBase = Math.max(0.05, Math.min(0.3, intensity * 0.3));
  const baseOpacity = useTransform(scrollYProgress, [0, 1], [opacityBase, opacityBase * 0.5]);
  
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive]);
  
  const Gradient = () => (
    <motion.div
      className="absolute inset-0 bg-blend-screen pointer-events-none"
      style={{
        background: animated
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${primaryColor}${Math.floor(intensity * 20).toString(16)}, ${secondaryColor}${Math.floor(intensity * 10).toString(16)} 50%, ${tertiaryColor}00)`
          : `radial-gradient(circle at center, ${primaryColor}${Math.floor(intensity * 20).toString(16)}, ${secondaryColor}${Math.floor(intensity * 10).toString(16)} 50%, ${tertiaryColor}00)`,
        opacity: baseOpacity
      }}
    />
  );
  
  const Waves = () => (
    <motion.div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: baseOpacity }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="none"
      >
        <motion.path 
          d="M0,800 C300,700 600,750 1200,800 L1200,0 L0,0 Z" 
          fill={primaryColor}
          animate={animated ? {
            d: [
              "M0,800 C300,700 600,750 1200,800 L1200,0 L0,0 Z",
              "M0,800 C300,780 900,670 1200,800 L1200,0 L0,0 Z",
              "M0,800 C300,730 700,780 1200,800 L1200,0 L0,0 Z",
              "M0,800 C300,700 600,750 1200,800 L1200,0 L0,0 Z"
            ]
          } : {}}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          opacity={0.1 * intensity}
        />
        <motion.path 
          d="M0,800 C500,680 800,750 1200,780 L1200,0 L0,0 Z" 
          fill={secondaryColor}
          animate={animated ? {
            d: [
              "M0,800 C500,680 800,750 1200,780 L1200,0 L0,0 Z",
              "M0,800 C700,700 500,720 1200,760 L1200,0 L0,0 Z",
              "M0,800 C300,650 900,780 1200,790 L1200,0 L0,0 Z",
              "M0,800 C500,680 800,750 1200,780 L1200,0 L0,0 Z"
            ]
          } : {}}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          opacity={0.08 * intensity}
        />
        <motion.path 
          d="M0,800 C200,750 600,720 1200,800 L1200,0 L0,0 Z" 
          fill={tertiaryColor}
          animate={animated ? {
            d: [
              "M0,800 C200,750 600,720 1200,800 L1200,0 L0,0 Z",
              "M0,800 C400,720 600,770 1200,790 L1200,0 L0,0 Z",
              "M0,800 C600,780 800,730 1200,760 L1200,0 L0,0 Z",
              "M0,800 C200,750 600,720 1200,800 L1200,0 L0,0 Z"
            ]
          } : {}}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
          opacity={0.05 * intensity}
        />
      </svg>
    </motion.div>
  );
  
  const Grid = () => (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: baseOpacity }}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${primaryColor}${Math.floor(intensity * 10).toString(16)} 1px, transparent 1px),
            linear-gradient(to bottom, ${primaryColor}${Math.floor(intensity * 10).toString(16)} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
        }}
      />
      {animated && (
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${secondaryColor}${Math.floor(intensity * 8).toString(16)} 1px, transparent 1px),
              linear-gradient(to bottom, ${secondaryColor}${Math.floor(intensity * 8).toString(16)} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      )}
    </motion.div>
  );
  
  const renderBackground = () => {
    switch (variant) {
      case 'waves':
        return <Waves />;
      case 'grid':
        return <Grid />;
      case 'gradient':
      default:
        return <Gradient />;
    }
  };
  
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {renderBackground()}
      {children}
    </div>
  );
};

export default PsychedelicBackground;