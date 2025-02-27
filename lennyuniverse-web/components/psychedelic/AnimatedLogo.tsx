import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { memo } from 'react';

// Create a memoized image component that won't cause fetchPriority warnings
const Image = memo(({ src, alt, width, height, className, style, fill, priority }: any) => {
  const imageProps: any = {
    src,
    alt,
    width,
    height,
    className,
    style
  };
  
  if (fill) {
    imageProps.fill = fill;
  }
  
  if (priority) {
    imageProps.priority = priority;
  }
  
  return <NextImage {...imageProps} />;
});

Image.displayName = 'MemoizedImage';

import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  glowColor?: string;
  glowIntensity?: number;
  rotationEnabled?: boolean;
  pulseEnabled?: boolean;
  hueRotateEnabled?: boolean;
  interactive?: boolean;
}

const AnimatedLogo = ({
  src,
  alt,
  width = 100,
  height = 100,
  className = '',
  glowColor = '#FF00FF',
  glowIntensity = 1,
  rotationEnabled = true,
  pulseEnabled = true,
  hueRotateEnabled = true,
  interactive = true,
}: AnimatedLogoProps) => {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  const rotationVariants = {
    animate: {
      rotate: rotationEnabled ? [0, 360] : 0,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: pulseEnabled ? [1, 1.05, 1] : 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const glowVariants = {
    initial: { 
      filter: `drop-shadow(0 0 5px ${glowColor}${Math.floor(glowIntensity * 50).toString(16)})` 
    },
    hover: { 
      filter: `drop-shadow(0 0 10px ${glowColor}${Math.floor(glowIntensity * 70).toString(16)})` 
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      animate="animate"
      variants={pulseVariants}
      style={{
        filter: hueRotateEnabled ? "hue-rotate(0deg)" : "none",
        animation: hueRotateEnabled ? "hueRotate 10s infinite linear" : "none"
      }}
    >
      <motion.div
        animate={hovered ? "hover" : "initial"}
        variants={glowVariants}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          variants={rotationVariants}
          className="relative"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;