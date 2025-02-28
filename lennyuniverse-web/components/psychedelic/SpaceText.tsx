import React, { memo } from 'react';

interface SpaceTextProps {
  text: string;
  color?: string;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  variant?: 'normal' | 'neon' | 'cosmic';
  animated?: boolean;
}

// Ultra-lightweight text component for cosmic/space themed text
// Uses pure CSS for effects, no physics or 3D
const SpaceText = memo(({
  text,
  color = '#FFFFFF',
  glowColor = '#FF00FF',
  size = 'xl',
  className = '',
  variant = 'neon',
  animated = true
}: SpaceTextProps) => {
  
  // Map size prop to fontSize class
  const sizeMap = {
    'sm': 'text-sm',
    'md': 'text-md',
    'lg': 'text-lg',
    'xl': 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl lg:text-6xl'
  };
  
  const fontSize = sizeMap[size] || 'text-xl';
  
  // Determine animation class
  const animationClass = animated ? 'animate-pulse-slow' : '';
  
  // Determine text effect based on variant
  let textEffect = '';
  let textShadow = '';
  let additionalClasses = '';
  
  switch (variant) {
    case 'neon':
      textShadow = `0 0 5px ${glowColor}, 0 0 10px ${glowColor}, 0 0 15px ${glowColor}, 0 0 20px ${glowColor}, 0 0 25px ${glowColor}`;
      additionalClasses = 'font-bold tracking-wider';
      break;
      
    case 'cosmic':
      // Create multi-layered text with cosmic gradient and glow
      textShadow = `0 0 3px #FFFFFF, 0 0 10px ${glowColor}`;
      additionalClasses = 'font-extrabold tracking-widest';
      break;
      
    default:
      textShadow = `0 0 5px ${glowColor}`;
      break;
  }
  
  const textStyle: React.CSSProperties = {
    color,
    textShadow,
    ...(variant === 'cosmic' && {
      background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF 50%, #CCCCFF)',
      WebkitBackgroundClip: 'text' as any,
      WebkitTextFillColor: 'transparent' as any,
    })
  };

  return (
    <div className={`${fontSize} ${additionalClasses} ${animationClass} ${className}`} style={textStyle}>
      {text}
    </div>
  );
});

SpaceText.displayName = 'SpaceText';

export default SpaceText;