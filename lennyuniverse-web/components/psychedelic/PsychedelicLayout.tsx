import { ReactNode, useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import SVGFilters from './SVGFilters';
import FloatingElements from './FloatingElements';
import NebulaBackground from './NebulaBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

// Low-performance mode detection
const isLowPerformanceDevice = () => {
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== 'undefined' ? navigator.userAgent : ''
  );
  
  // Just use mobile detection as a simple performance indicator
  return isMobile;
};

interface PsychedelicLayoutProps {
  children: ReactNode;
  particlesEnabled?: boolean;
  mouseTrailEnabled?: boolean;
  pageTransitionEnabled?: boolean;
  floatingElementsEnabled?: boolean;
  nebulaEnabled?: boolean;
}

const PsychedelicLayout = ({
  children,
  particlesEnabled = false, // Disabled by default for performance
  mouseTrailEnabled = false, // Disabled by default for performance
  pageTransitionEnabled = true,
  floatingElementsEnabled = false, // Disabled by default for performance
  nebulaEnabled = true,
}: PsychedelicLayoutProps) => {
  // Detect low-performance devices on the client side
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  useEffect(() => {
    // Set low-performance mode on mount
    setIsLowPerformance(isLowPerformanceDevice());
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<{ x: number; y: number; id: string }[]>([]);
  const [ripples, setRipples] = useState<{ x: number; y: number; size: number; color: string; id: string }[]>([]);
  const [trailCount, setTrailCount] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    if (!mouseTrailEnabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new trail point
      setTrailPositions(prev => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: nanoid() }
      ].slice(-20)); // Keep only the last 20 points
    };
    
    const handleClick = (e: MouseEvent) => {
      // Create a ripple effect at click position
      const colors = ['#FF00FF', '#9D00FF', '#00FFFF'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      setRipples(prev => [
        ...prev, 
        { 
          x: e.clientX, 
          y: e.clientY, 
          size: 0, // start size
          color: randomColor,
          id: nanoid()
        }
      ]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseTrailEnabled]);
  
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.96,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.04,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  
  return (
    <>
      <SVGFilters />
      
      {/* Nebula Background - show even in low performance mode, but without animation */}
      {nebulaEnabled && <NebulaBackground opacity={0.8} zIndex={-20} animate={!isLowPerformance} />}
      
      {/* Floating Elements - only show if not in low performance mode */}
      {floatingElementsEnabled && !isLowPerformance && (
        <FloatingElements 
          count={6} // Reduced count
          intensity={0.5} // Reduced intensity
          minSize={20} 
          maxSize={50} // Smaller max size
        />
      )}
      
      {/* Particles Background - only show if not in low performance mode */}
      {particlesEnabled && !isLowPerformance && <ParticleBackground />}
      
      {/* Mouse Trail - only show if not in low performance mode */}
      {mouseTrailEnabled && !isLowPerformance && (
        <div className="fixed inset-0 pointer-events-none z-[1]">
          {trailPositions.map((point, index) => (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ 
                opacity: 0,
                scale: 0,
                x: point.x,
                y: point.y
              }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
                delay: index * 0.02
              }}
              style={{
                left: point.x,
                top: point.y,
                backgroundColor: index % 3 === 0 ? '#FF00FF' : index % 3 === 1 ? '#9D00FF' : '#00FFFF',
                width: `${(20 - index) * 2}px`,
                height: `${(20 - index) * 2}`,
                marginLeft: `-${(20 - index)}px`,
                marginTop: `-${(20 - index)}px`,
                boxShadow: `0 0 ${(20 - index) * 2}px ${index % 3 === 0 ? '#FF00FF' : index % 3 === 1 ? '#9D00FF' : '#00FFFF'}`,
                zIndex: 20 - index
              }}
            />
          ))}
        </div>
      )}
      
      {/* Ripple effects on click */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full mix-blend-screen"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ 
              width: 600, 
              height: 600, 
              opacity: 0,
              x: -300,
              y: -300,
              boxShadow: `0 0 60px 20px ${ripple.color}`
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              setRipples(current => current.filter(r => r.id !== ripple.id));
            }}
          />
        ))}
      </div>
      
      {/* Dynamic light cursor effect - only show if not in low performance mode */}
      {!isLowPerformance && (
        <div 
          className="fixed pointer-events-none opacity-10 mix-blend-screen z-[2]"
          style={{
            background: 'radial-gradient(600px circle at center, rgba(255, 0, 255, 0.2), rgba(157, 0, 255, 0.15) 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
          }}
        />
      )}
      
      {/* Page Content with Transitions - simplified for low performance devices */}
      {isLowPerformance ? (
        // No animations for low performance devices
        <div className="relative">{children}</div>
      ) : (
        // Animations for higher performance devices
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={pageTransitionEnabled ? "initial" : undefined}
            animate={pageTransitionEnabled ? "animate" : undefined}
            exit={pageTransitionEnabled ? "exit" : undefined}
            variants={pageVariants}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default PsychedelicLayout;