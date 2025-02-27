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
    // Simulate loading completion after min duration
    const loadingTimer = setTimeout(() => {
      const elapsedTime = Date.now() - loadingStartTime.current;
      const remainingTime = Math.max(0, minDuration - elapsedTime);
      
      // Execute particle explosion animation
      setParticlesExploded(true);
      
      // Sequence: logo grows, then everything fades out
      logoControls.start({
        scale: [1, 1.5, 2.5],
        filter: ['drop-shadow(0 0 10px #FF00FF)', 'drop-shadow(0 0 30px #FF00FF)', 'drop-shadow(0 0 50px #FF00FF)'],
        transition: { duration: 1.5, ease: "easeInOut" }
      }).then(() => {
        setTimeout(() => {
          controls.start({
            opacity: 0,
            transition: { duration: 0.5 }
          }).then(() => {
            setIsLoading(false);
            if (onLoadingComplete) onLoadingComplete();
          });
        }, 500);
      });
    }, minDuration);

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
            {/* Radiating circles behind the logo */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 200 + i * 50,
                  height: 200 + i * 50,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'transparent',
                  border: `1px solid ${i === 0 ? '#FF00FF' : i === 1 ? '#9D00FF' : '#00FFFF'}`,
                  opacity: 0.3 - i * 0.1,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3 - i * 0.1, 0.5 - i * 0.1, 0.3 - i * 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Main logo that will expand */}
            <motion.div
              animate={logoControls}
              initial={{ scale: 1 }}
              className="relative z-20 flex justify-center items-center"
              style={{ width: '100%', height: '100%' }}
            >
              <AnimatedLogo
                src={logoSrc}
                alt="Lenny Universe Logo"
                width={150}
                height={150}
                className="bg-white rounded-full p-3"
                glowColor="#FF00FF"
                glowIntensity={1.5}
                rotationEnabled={true}
                pulseEnabled={true}
                hueRotateEnabled={false}
              />
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