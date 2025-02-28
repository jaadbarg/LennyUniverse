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
    const typewriterDuration = 2500; // Time for typewriter to complete in ms
    const explosionDuration = 1500; // Time for explosion effect in ms
    const totalAnimationTime = Math.max(minDuration, typewriterDuration + explosionDuration);
    
    // Always show typewriter text for its full duration
    const loadingTimer = setTimeout(() => {
      // Trigger explosion after typewriter animation
      setParticlesExploded(true);
      
      // Sequence the logo animations
      logoControls.start({
        scale: 1.3,
        transition: { duration: 0.4, ease: "easeOut" }
      }).then(() => {
        // Add glow effect
        logoControls.start({
          filter: 'drop-shadow(0 0 20px #FF00FF)',
          transition: { duration: 0.3, ease: "easeOut" }
        });
      });
      
      // Fade out only after entire animation sequence
      setTimeout(() => {
        controls.start({
          opacity: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        }).then(() => {
          setIsLoading(false);
          if (onLoadingComplete) onLoadingComplete();
        });
      }, explosionDuration);
      
    }, totalAnimationTime - explosionDuration); // Start explosion with enough time for fade out

    return () => clearTimeout(loadingTimer);
  }, [onLoadingComplete, minDuration, controls, logoControls]);

  // Generate optimized explosion particles with better distribution
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    // Generate particles in a more visually appealing way
    const colorIndex = Math.floor(Math.random() * particleColors.length);
    const color = particleColors[colorIndex];
    
    // Vary size based on distance for more natural explosion
    const distanceFactor = Math.random();
    const size = distanceFactor < 0.7 
      ? Math.random() * 10 + 5  // Smaller particles travel further
      : Math.random() * 20 + 10; // Larger particles stay closer
    
    // Distance is inversely proportional to size for more realistic physics
    const distance = (1.5 - size/30) * (Math.random() * 1000 + 300);
    
    // Create more structured explosion with slight variance
    const angleSection = (Math.PI * 2) / particleCount;
    const angleVariance = angleSection * 0.8; // Some variance but keep distribution even
    const angle = (i * angleSection) + (Math.random() * angleVariance - angleVariance/2);
    
    // Stagger the particle release for more natural explosion
    const delay = Math.random() * 0.3;
    
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

            {/* Enhanced explosion particles */}
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
                  boxShadow: `0 0 ${particle.size * 0.8}px ${particle.color}`,
                  filter: `blur(${Math.random() > 0.7 ? '1px' : '0'})`,
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(particle.angle) * particle.distance,
                  y: Math.sin(particle.angle) * particle.distance,
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1.2, 0.8, 0],
                  filter: [
                    `blur(0px)`,
                    `blur(${Math.random() * 2}px)`,
                    `blur(${Math.random() * 4}px)`,
                  ]
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

// Enhanced typewriter effect that always completes typing
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0);
  const typingCompletedRef = useRef(false);
  
  useEffect(() => {
    // Calculate character typing speed to ensure text completes in ~2.3 seconds
    const charSpeed = Math.max(30, 2300 / text.length);
    
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, index.current + 1));
        index.current += 1;
      }, charSpeed);
      
      return () => clearTimeout(timeoutId);
    } else if (!typingCompletedRef.current) {
      typingCompletedRef.current = true;
    }
  }, [displayedText, text]);
  
  return (
    <span>
      {displayedText}
      {index.current < text.length && (
        <motion.span 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          _
        </motion.span>
      )}
      {index.current >= text.length && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          _
        </motion.span>
      )}
    </span>
  );
};

export default LoadingScreen;