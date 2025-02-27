import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  color?: 'pink' | 'purple' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'flux' | 'plasma' | 'liquid' | 'wire';
  fullWidth?: boolean;
  disabled?: boolean;
  external?: boolean;
  pulse?: boolean;
}

const NeonButton = ({
  children,
  href,
  onClick,
  className = '',
  color = 'pink',
  size = 'md',
  variant = 'flux',
  fullWidth = false,
  disabled = false,
  external = false,
  pulse = false
}: NeonButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const buttonRef = useRef<any>(null);
  
  // Mouse position tracking for dynamic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Sound effect for button interaction
  const playSoundEffect = () => {
    if (disabled) return;
    
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      // Set up oscillator
      oscillator.type = variant === 'wire' ? 'square' : 'sine';
      oscillator.frequency.setValueAtTime(
        color === 'pink' ? 440 : color === 'purple' ? 380 : 520, 
        audioCtx.currentTime
      );
      
      // Configure gain (volume)
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Play sound
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (error) {
      console.error("Audio context not supported or other audio error");
    }
  };
  
  // Dynamic interactivity with mouse position
  useEffect(() => {
    if (!buttonRef.current || disabled) return;
    
    setIsInteractive(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate relative mouse position within button
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Convert to normalized coordinates (-1 to 1)
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;
      
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };
    
    // Track mouse position globally for continuous effects
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, disabled]);
  
  // Color configurations with more options
  const colorMap = {
    pink: {
      text: 'text-white',
      primary: '#FF00FF',
      secondary: '#FF77FF',
      tertiary: '#9D00FF',
      glowIntensity: 1.2,
      particle: 'bg-gradient-to-tr from-pink-300 to-fuchsia-600',
    },
    purple: {
      text: 'text-white',
      primary: '#9D00FF',
      secondary: '#BB77FF',
      tertiary: '#6600CC',
      glowIntensity: 1.0,
      particle: 'bg-gradient-to-tr from-purple-300 to-violet-600',
    },
    teal: {
      text: 'text-white',
      primary: '#00FFFF',
      secondary: '#77FFFF',
      tertiary: '#00CCCC',
      glowIntensity: 1.1,
      particle: 'bg-gradient-to-tr from-cyan-300 to-teal-600',
    },
  };
  
  // Size configurations
  const sizeMap = {
    sm: {
      padding: 'py-2 px-4',
      fontSize: 'text-sm',
      height: 32,
      particleCount: 15,
      particleSize: 0.8,
    },
    md: {
      padding: 'py-3 px-6',
      fontSize: 'text-base',
      height: 44,
      particleCount: 25,
      particleSize: 1,
    },
    lg: {
      padding: 'py-4 px-8',
      fontSize: 'text-lg',
      height: 56,
      particleCount: 35,
      particleSize: 1.2,
    },
  };
  
  // Rotate glow based on mouse position
  const glowRotation = useTransform(
    [smoothMouseX, smoothMouseY],
    ([latestX, latestY]) => {
      const x = latestX as number;
      return isHovered ? `${x * 15}deg` : '0deg';
    }
  );
  
  // Scale glow based on interaction state
  const glowScale = useTransform(
    [smoothMouseX, smoothMouseY],
    ([latestX, latestY]) => {
      const x = latestX as number;
      const y = latestY as number;
      const distance = Math.sqrt(x * x + y * y);
      return isHovered 
        ? 1 + distance * 0.2 
        : isPressed 
          ? 0.95 
          : 1;
    }
  );
  
  // Create dynamic wave pattern based on mouse position
  const wavePattern = useTransform(
    [smoothMouseX, smoothMouseY],
    ([latestX, latestY]) => {
      const x = latestX as number;
      const y = latestY as number;
      const waveX = x * 50;
      const waveY = y * 30;
      
      return `radial-gradient(circle at ${50 + waveX}% ${50 + waveY}%, 
        ${colorMap[color].secondary}${isHovered ? '90' : '50'} 0%, 
        ${colorMap[color].primary}${isHovered ? '80' : '40'} 50%, 
        ${colorMap[color].tertiary}${isHovered ? '70' : '30'} 100%)`;
    }
  );
  
  // ---- BUTTON COMPONENT VARIANTS ----
  
  // Flux variant - energy field with dynamic particles
  const FluxButton = () => {
    const fluxIntensity = useTransform(
      [smoothMouseX, smoothMouseY],
      ([latestX, latestY]) => {
        const x = latestX as number;
        const y = latestY as number;
        return isHovered 
          ? 1.5 + Math.abs(x * y) * 0.5
          : 1;
      }
    );
    
    return (
      <motion.div 
        className="absolute inset-0 rounded-md overflow-hidden"
        style={{ 
          background: wavePattern,
          filter: `contrast(1.2) brightness(${fluxIntensity})`,
        }}
      >
        <FluxParticles />
        <motion.div 
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)`
          }}
        />
      </motion.div>
    );
  };
  
  // Plasma variant - liquid energy that responds to interaction
  const PlasmaButton = () => {
    const plasmaFlow = useTransform(
      [smoothMouseX, smoothMouseY],
      ([latestX, latestY]) => {
        const x = latestX as number;
        const y = latestY as number;
        const angleRad = Math.atan2(y, x);
        const angleDeg = angleRad * (180 / Math.PI);
        
        return `
          linear-gradient(
            ${angleDeg}deg, 
            ${colorMap[color].primary}${isHovered ? 'FF' : 'BB'} 0%, 
            ${colorMap[color].secondary}${isHovered ? 'CC' : '99'} 50%, 
            ${colorMap[color].tertiary}${isHovered ? 'EE' : 'AA'} 100%
          )
        `;
      }
    );
    
    return (
      <motion.div 
        className="absolute inset-0 rounded-md overflow-hidden"
        style={{ 
          background: plasmaFlow,
          filter: `blur(${isHovered ? 8 : 4}px) contrast(1.5)`,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.5) 100%)`
          }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: [1, 1.2, 1],
                rotateZ: [0, 5, -5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${colorMap[color].secondary}50 0%, transparent 70%)`,
                filter: 'blur(10px)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  };
  
  // Liquid variant - fluid shimmering surface
  const LiquidButton = () => {
    return (
      <motion.div 
        className="absolute inset-0 rounded-md overflow-hidden"
        style={{ 
          background: `linear-gradient(to bottom, 
            rgba(0,0,0,0.6) 0%, 
            rgba(0,0,0,0.3) 50%, 
            rgba(0,0,0,0.6) 100%)`
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 50% 0%, 
              ${colorMap[color].secondary}70 0%, 
              ${colorMap[color].primary}40 50%, 
              transparent 70%)`
          }}
          animate={{
            y: isHovered ? ['-15%', '5%', '-10%'] : ['0%', '10%', '0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            backdropFilter: 'blur(4px)',
          }}
        >
          <LiquidSurface />
        </motion.div>
      </motion.div>
    );
  };
  
  // Wire variant - glowing wireframe with electric pulses
  const WireButton = () => {
    return (
      <motion.div 
        className="absolute inset-0 rounded-md overflow-hidden"
        style={{ 
          background: 'rgba(0,0,0,0.9)',
          boxShadow: `inset 0 0 1px 1px ${colorMap[color].primary}`,
        }}
      >
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${colorMap[color].primary}40 1px, transparent 1px),
              linear-gradient(to bottom, ${colorMap[color].primary}40 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '8px 8px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Edge highlights */}
        <motion.div
          className="absolute inset-0 z-1"
          style={{
            boxShadow: `
              inset 0 0 0 1px ${colorMap[color].primary}80,
              inset 0 0 0 2px ${colorMap[color].primary}30
            `,
          }}
          animate={{
            boxShadow: isHovered 
              ? `
                inset 0 0 0 1px ${colorMap[color].primary}FF,
                inset 0 0 0 2px ${colorMap[color].primary}80,
                inset 0 0 5px 0 ${colorMap[color].primary}50
              `
              : `
                inset 0 0 0 1px ${colorMap[color].primary}80,
                inset 0 0 0 2px ${colorMap[color].primary}30
              `,
          }}
          transition={{
            duration: 0.3,
          }}
        />
        
        {/* Pulse effects */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 z-2"
              style={{
                background: `radial-gradient(circle at 50% 50%, 
                  ${colorMap[color].primary}50 0%, 
                  transparent 70%)`,
              }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.1, 1.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7,
                  }}
                  style={{
                    border: `1px solid ${colorMap[color].primary}`,
                    filter: `blur(2px)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Corner accents */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
          <motion.div
            key={corner}
            className={`absolute w-3 h-3 ${
              corner === 'top-left' 
                ? 'top-0 left-0 border-t border-l' 
                : corner === 'top-right'
                  ? 'top-0 right-0 border-t border-r'
                  : corner === 'bottom-left'
                    ? 'bottom-0 left-0 border-b border-l'
                    : 'bottom-0 right-0 border-b border-r'
            }`}
            style={{ 
              borderColor: colorMap[color].primary,
              borderWidth: '2px',
            }}
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    );
  };
  
  // ---- PARTICLE EFFECTS ----
  
  // Flux energy particles
  const FluxParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: sizeMap[size].particleCount }).map((_, i) => {
          const particleSize = Math.random() * sizeMap[size].particleSize * 10 + 1;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const velocity = 2 + Math.random() * 3;
          
          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${colorMap[color].particle}`}
              style={{
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                left: `${initialX}%`,
                top: `${initialY}%`,
                filter: `blur(${particleSize / 3}px)`,
                opacity: 0.7,
              }}
              initial={{ 
                scale: 0,
              }}
              animate={{
                y: [`${initialY}%`, `${initialY - velocity * 10}%`],
                x: [`${initialX}%`, `${initialX + (Math.random() * 10 - 5)}%`],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>
    );
  };
  
  // Simulated liquid surface
  const LiquidSurface = () => {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => {
          const yPos = 20 + i * 15;
          const opacity = 0.6 - i * 0.1;
          
          return (
            <motion.div
              key={i}
              className="absolute w-full"
              style={{
                height: '2px',
                top: `${yPos}%`,
                background: colorMap[color].secondary,
                opacity: opacity,
                filter: 'blur(1px)',
              }}
              animate={{
                y: isHovered 
                  ? [0, Math.random() * 10 - 5, -3, 5, 0]
                  : [0, 3, -2, 0],
                x: isHovered
                  ? [0, 5, -3, 0]
                  : 0,
                opacity: isHovered 
                  ? [opacity, opacity + 0.2, opacity]
                  : opacity,
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          );
        })}
        
        {/* Highlight effect */}
        <motion.div
          className="absolute inset-x-0 top-0 h-full"
          style={{
            background: `linear-gradient(to bottom, 
              ${colorMap[color].secondary}90 0%, 
              transparent 100%)`,
            opacity: 0.2,
            height: '30%',
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0.2,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </>
    );
  };
  
  // ---- STYLE VARIANTS ----
  
  // Determine which button variant to render
  const renderButtonVariant = () => {
    switch (variant) {
      case 'plasma':
        return <PlasmaButton />;
      case 'liquid':
        return <LiquidButton />;
      case 'wire':
        return <WireButton />;
      case 'flux':
      default:
        return <FluxButton />;
    }
  };
  
  // Button text with enhanced effects
  const ButtonContent = () => {
    // Text glow intensity based on hover
    const textGlowIntensity = isHovered 
      ? colorMap[color].glowIntensity * 1.5 
      : colorMap[color].glowIntensity;
    
    // Text movement following mouse with constraint
    const textX = useTransform(smoothMouseX, [-1, 1], [-3, 3]) as any;
    const textY = useTransform(smoothMouseY, [-1, 1], [-2, 2]) as any;
    
    return (
      <motion.span
        className={`relative z-30 flex items-center justify-center gap-2 font-bold ${colorMap[color].text} ${sizeMap[size].fontSize}`}
        style={{
          textShadow: `0 0 ${5 * textGlowIntensity}px ${colorMap[color].primary}`,
          x: isHovered ? textX : 0,
          y: isHovered ? textY : 0,
        }}
      >
        {children}
        
        {/* Character hover effect */}
        {isHovered && isInteractive && typeof children === 'string' && (
          <motion.span 
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array.from(children as string).map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 0 }}
                animate={{ 
                  y: [0, -Math.random() * 3 - 2, 0],
                  x: [0, Math.random() * 2 - 1, 0],
                  textShadow: [
                    `0 0 ${5 * textGlowIntensity}px ${colorMap[color].primary}`,
                    `0 0 ${8 * textGlowIntensity}px ${colorMap[color].primary}`,
                    `0 0 ${5 * textGlowIntensity}px ${colorMap[color].primary}`,
                  ],
                }}
                transition={{
                  duration: 0.3 + Math.random() * 0.3,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: index * 0.03,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        )}
      </motion.span>
    );
  };
  
  // Global styles for all button variants
  const baseClassName = `
    relative rounded-md transition-all overflow-hidden inline-block
    ${sizeMap[size].padding}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;
  
  // Helper to trigger sound and visual feedback
  const handleInteraction = (type: 'enter' | 'leave' | 'press' | 'release') => {
    if (disabled) return;
    
    switch (type) {
      case 'enter':
        setIsHovered(true);
        playSoundEffect();
        break;
      case 'leave':
        setIsHovered(false);
        setIsPressed(false);
        break;
      case 'press':
        setIsPressed(true);
        break;
      case 'release':
        setIsPressed(false);
        break;
    }
  };
  
  // ---- FINAL BUTTON ASSEMBLY ----
  
  // Link variant
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <Link href={disabled ? '#' : href} {...linkProps}>
        <motion.span
          ref={buttonRef}
          className={baseClassName}
          onMouseEnter={() => handleInteraction('enter')}
          onMouseLeave={() => handleInteraction('leave')}
          onMouseDown={() => handleInteraction('press')}
          onMouseUp={() => handleInteraction('release')}
          whileHover={!disabled ? { scale: 1.03 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          style={{
            transform: isPressed ? 'scale(0.97)' : isHovered ? 'scale(1.03)' : 'scale(1)',
          }}
        >
          {renderButtonVariant()}
          <ButtonContent />
        </motion.span>
      </Link>
    );
  }
  
  // Button variant
  return (
    <motion.button
      ref={buttonRef}
      className={baseClassName}
      onClick={(e) => {
        if (disabled) return;
        onClick?.();
      }}
      onMouseEnter={() => handleInteraction('enter')}
      onMouseLeave={() => handleInteraction('leave')}
      onMouseDown={() => handleInteraction('press')}
      onMouseUp={() => handleInteraction('release')}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {renderButtonVariant()}
      <ButtonContent />
    </motion.button>
  );
};

export default NeonButton;