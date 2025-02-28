import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import NebulaBackground from './NebulaBackground';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  logoSrc?: string;
  minDuration?: number; // Minimum time to show loading screen in ms
}

const LoadingScreen = ({
  onLoadingComplete,
  logoSrc = "https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/LU-Logo_Black.png?fit=1080%2C901&ssl=1",
  minDuration = 3000,
}: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [particlesExploded, setParticlesExploded] = useState(false);
  const controls = useAnimation();
  const logoControls = useAnimation();
  const particleCount = 200;
  const loadingStartTime = useRef(Date.now());
  
  // Colors for the particles
  const particleColors = [
    '#FF00FF', // Pink
    '#9D00FF', // Purple
    '#00FFFF', // Cyan
    '#FFFFFF', // White
    '#FF77FF', // Light pink
    '#BB77FF', // Light purple
  ];

  useEffect(() => {
    // Simplified loading sequence with shorter duration
    const loadingTimer = setTimeout(() => {
      // Skip particle explosion for performance
      setParticlesExploded(false);
      
      // Simplified animation sequence
      logoControls.start({
        scale: 1.5,
        filter: 'drop-shadow(0 0 20px #FF00FF)',
        transition: { duration: 0.7, ease: "easeInOut" }
      }).then(() => {
        // Fade out immediately
        controls.start({
          opacity: 0,
          transition: { duration: 0.3 }
        }).then(() => {
          setIsLoading(false);
          if (onLoadingComplete) onLoadingComplete();
        });
      });
    }, Math.min(1500, minDuration)); // Maximum 1.5 seconds loading time

    return () => clearTimeout(loadingTimer);
  }, [onLoadingComplete, minDuration, controls, logoControls]);

  // Generate random particles
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    const size = Math.random() * 20 + 5;
    const distance = Math.random() * 2000 + 500; // How far the particle will travel
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const delay = Math.random() * 0.5; // Random delay for explosion
    
    return { id: i, color, size, distance, angle, delay };
  });

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black"
          animate={controls}
          initial={{ opacity: 1 }}
        >
          {/* Nebula background */}
          <NebulaBackground opacity={1} zIndex={0} animate={true} />
          
          {/* Stars twinkling */}
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const twinkleSpeed = 0.5 + Math.random() * 2;
            
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`,
                  zIndex: 1
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: twinkleSpeed,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            );
          })}

          {/* Logo container with glow effect */}
          <motion.div
            className="relative z-10 flex justify-center items-center"
            style={{ width: '200px', height: '200px' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            {/* Glowing halo effect - simpler and more performant */}
            <div 
              className="absolute"
              style={{
                width: '300px',
                height: '300px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.2) 40%, rgba(0,255,255,0.1) 60%, transparent 80%)',
                borderRadius: '50%',
                filter: 'blur(10px)',
              }}
            />

            {/* Main logo that will expand */}
            <motion.div
              animate={logoControls}
              initial={{ scale: 1 }}
              className="relative z-20 flex justify-center items-center"
              style={{ width: '100%', height: '100%' }}
            >
              <div className="relative">
                {/* Light rays effect behind logo - using CSS animation class */}
                <div 
                  className="absolute ray-rotate"
                  style={{
                    width: '190px',
                    height: '190px',
                    left: '50%',
                    top: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,0,255,0.3) 10deg, transparent 20deg, transparent 30deg, rgba(157,0,255,0.3) 40deg, transparent 50deg, transparent 60deg, rgba(0,255,255,0.3) 70deg, transparent 80deg, transparent 170deg, rgba(255,0,255,0.3) 180deg, transparent 190deg, transparent 260deg, rgba(157,0,255,0.3) 270deg, transparent 280deg, transparent 350deg)',
                    borderRadius: '50%',
                    filter: 'blur(5px)',
                    opacity: 0.7,
                    zIndex: -1,
                  }}
                />
                
                {/* Logo with white background circle and shine effect */}
                <div className="logo-shine rounded-full">
                  <AnimatedLogo
                    src={logoSrc}
                    alt="Lenny Universe Logo"
                    width={150}
                    height={150}
                    className="bg-white rounded-full p-3 relative z-10"
                    glowColor="#FF00FF"
                    glowIntensity={1.5}
                    rotationEnabled={false}
                    pulseEnabled={false}
                    hueRotateEnabled={false}
                  />
                </div>
                
                {/* Inner glow */}
                <div 
                  className="absolute"
                  style={{
                    width: '170px',
                    height: '170px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 'inset 0 0 30px rgba(255,0,255,0.4)',
                    borderRadius: '50%',
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </motion.div>

            {/* Explosion particles */}
            {particlesExploded && particles.map((particle) => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute rounded-full z-10"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 ${particle.size * 0.5}px ${particle.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(particle.angle) * particle.distance,
                  y: Math.sin(particle.angle) * particle.distance,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: particle.delay,
                }}
              />
            ))}
          </motion.div>

          {/* Loading text with typewriter effect */}
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="text-white text-xl font-audiowide tracking-widest"
              animate={{
                textShadow: [
                  "0 0 5px #FF00FF, 0 0 10px #FF00FF",
                  "0 0 10px #FF00FF, 0 0 15px #FF00FF",
                  "0 0 5px #FF00FF, 0 0 10px #FF00FF"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <TypewriterText text="ENTERING THE UNIVERSE..." />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper component for typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  
  useEffect(() => {
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, index.current + 1));
        index.current += 1;
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [displayedText, text]);
  
  return <span>{displayedText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>_</motion.span></span>;
};

export default LoadingScreen;