import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Vector3 } from 'three';

interface NeonText3DProps {
  text: string;
  size?: number;
  color?: string;
  floatIntensity?: number;
  speed?: number;
  className?: string;
  font?: string;
}

// Improved TextMesh with cleaner aesthetics and controlled physics
const TextMesh = ({ text, color = '#FF00FF', floatIntensity = 1, speed = 1 }: NeonText3DProps) => {
  const groupRef = useRef<any>(null);
  const materialRef = useRef<any>(null);
  
  // Reduced physics effect for smoother animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle, controlled movement with reduced amplitude
      const sineWave = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.05;
      groupRef.current.position.y = sineWave;
      // Very minimal rotation to avoid text being obscured
      groupRef.current.rotation.y = sineWave * 0.1;
    }
    
    // Pulsing glow effect on the material
    if (materialRef.current) {
      const pulseIntensity = 1.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      materialRef.current.emissiveIntensity = pulseIntensity;
    }
  });
  
  // Create aesthetic particle effects that complement but don't obscure the text
  const renderParticles = () => {
    const particles = [];
    // Reduced particle count for better performance and cleaner look
    const particleCount = Math.max(text.length * 10, 30);
    
    // Create a structured arrangement that follows the text shape
    for (let i = 0; i < particleCount; i++) {
      // Calculate position to create a layer behind the text
      const letterIndex = i % text.length;
      const textWidth = text.length * 0.8;
      const baseX = (letterIndex / text.length) * textWidth - (textWidth / 2);
      
      // Create a subtle wave pattern
      const letterPosition = letterIndex / text.length;
      const baseY = Math.sin(letterPosition * Math.PI) * 0.1;
      
      // Reduced randomness for more structured look
      const x = baseX + (Math.random() - 0.5) * 0.2;
      const y = baseY + (Math.random() - 0.5) * 0.2;
      // Keep particles mostly behind text to avoid covering it
      const z = -0.5 - Math.random() * 0.5;
      
      // Curated color palette for aesthetic consistency
      const colorOptions = [color, '#FF40FF', '#D700FF'];
      const particleColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      // Small, subtle particles
      const particleSize = 0.03 + Math.random() * 0.05;
      
      particles.push(
        <mesh key={`particle-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[particleSize, 8, 8]} />
          <meshStandardMaterial 
            color={particleColor} 
            emissive={particleColor} 
            emissiveIntensity={2} 
            transparent 
            opacity={0.7}
          />
        </mesh>
      );
    }
    
    return particles;
  };
  
  return (
    <Float 
      floatIntensity={floatIntensity * 0.5} // Reduced for more stable appearance
      rotationIntensity={0.2} // Minimal rotation
      speed={1.5}
    >
      <group ref={groupRef}>
        {/* Main text using drei Text component for high quality */}
        <Text
          fontSize={1.2}
          position={[0, 0, 0]}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color={color}
          font="https://fonts.gstatic.com/s/audiowide/v14/l7gdbjpo0cum0ckerWCtkQ.ttf"
        >
          {text}
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            emissive={color}
            emissiveIntensity={2}
            toneMapped={false} // Better glow effect
          />
        </Text>
        
        {/* Background particle effect */}
        {renderParticles()}
        
        {/* Strategic lighting for better text visibility */}
        <pointLight position={[0, 0, 2]} intensity={1.5} color={color} />
        <pointLight position={[0, 1, 1]} intensity={0.8} color="#ffffff" />
        
        {/* Minimal ambient light */}
        <ambientLight intensity={0.2} />
      </group>
    </Float>
  );
};

const NeonText3D = ({ 
  text, 
  size = 1, 
  color = '#FF00FF', 
  floatIntensity = 1, 
  speed = 0.8,  // Reduced default speed
  className = ''
}: NeonText3DProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Enhanced static fallback with custom font and better styling
  const getFallbackStyles = () => {
    // Font size based on component size
    let fontSize = '3.5rem';
    if (size === 0.5) fontSize = '2rem';
    else if (size === 1) fontSize = '3rem';
    else if (size > 1) fontSize = '4.5rem';
    
    // Enhanced text shadow for better glow effect
    const textShadow = `
      0 0 5px ${color},
      0 0 10px ${color},
      0 0 15px ${color},
      0 0 20px ${color},
      0 0 25px ${color}
    `;
    
    return {
      color: '#ffffff',
      textShadow,
      fontSize,
      fontWeight: 'bold',
      letterSpacing: '0.05em',
      textTransform: 'lowercase' as const, // Stylistic choice for "blissful growth"
      fontFamily: "'Audiowide', 'Orbitron', sans-serif" // Fallback to system fonts
    };
  };
  
  if (!mounted) {
    return (
      <div 
        className={`text-center font-bold ${className}`}
        style={getFallbackStyles()}
      >
        {text}
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative ${className}`}
      style={{ minHeight: '150px', width: '100%' }}
    >
      {/* Enhanced static text fallback with better styling */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-10 text-center"
        style={{
          ...getFallbackStyles(),
          opacity: 0.9
        }}
      >
        {text}
      </div>
      
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 z-0 blur-xl rounded-full bg-gradient-radial"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          animation: 'pulse-slow 8s infinite ease-in-out'
        }}
      />
      
      {/* Performance optimized canvas */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]} // Optimized for performance
          frameloop="demand" // Only render when needed
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'default'
          }}
        >
          <TextMesh 
            text={text} 
            color={color} 
            floatIntensity={floatIntensity} 
            speed={speed}
          />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default NeonText3D;