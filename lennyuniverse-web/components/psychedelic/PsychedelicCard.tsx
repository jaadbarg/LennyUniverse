import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface PsychedelicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tiltEnabled?: boolean;
  glowEnabled?: boolean;
  glowIntensity?: number;
}

const PsychedelicCard = ({
  children,
  className = '',
  glowColor = '#FF00FF',
  tiltEnabled = true,
  glowEnabled = true,
  glowIntensity = 1.5,
}: PsychedelicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const CardWrapper = tiltEnabled ? Tilt : 'div';
  const tiltProps = tiltEnabled ? {
    perspective: 1000,
    scale: 1.02,
    glareEnable: true,
    glareMaxOpacity: 0.15,
    glareColor: glowColor,
    glarePosition: 'all' as any,
    glareBorderRadius: '12px',
    transitionSpeed: 1500,
  } : {};
  
  return (
    <CardWrapper {...tiltProps}>
      <motion.div
        className={`relative rounded-xl backdrop-blur-sm overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: tiltEnabled ? 1 : 1.03 }}
        transition={{ duration: 0.3 }}
      >
        {glowEnabled && (
          <motion.div
            className="absolute inset-0 z-0 opacity-50 rounded-xl"
            animate={{
              boxShadow: isHovered
                ? `0 0 20px ${glowIntensity * 2}px ${glowColor}, inset 0 0 20px ${glowIntensity}px ${glowColor}`
                : `0 0 10px ${glowIntensity}px ${glowColor}, inset 0 0 5px ${glowIntensity / 2}px ${glowColor}`
            }}
            transition={{ duration: 0.4 }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </CardWrapper>
  );
};

export default PsychedelicCard;