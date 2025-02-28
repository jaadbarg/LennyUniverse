import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Vector3 } from 'three';

interface NeonText3DProps {
  text: string;
  size?: number;
  color?: string;
  floatIntensity?: number;
  speed?: number;
  className?: string;
}

// Function to create letter shapes using spheres
const createLetterShapes = (letter: string, position: Vector3, color: string) => {
  const letterShapes = [];
  const size = 0.1;
  const spacing = 0.12;
  
  // Simplified algorithm to map letters to 3D point positions
  switch(letter.toLowerCase()) {
    case 'a':
      letterShapes.push(
        <mesh key={`${position.x}-${position.y}-1`} position={[position.x, position.y + spacing*2, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-2`} position={[position.x - spacing, position.y + spacing, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-3`} position={[position.x + spacing, position.y + spacing, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-4`} position={[position.x - spacing, position.y, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-5`} position={[position.x + spacing, position.y, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      );
      break;
    case 'b':
      letterShapes.push(
        <mesh key={`${position.x}-${position.y}-1`} position={[position.x - spacing, position.y + spacing*2, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-2`} position={[position.x - spacing, position.y + spacing, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-3`} position={[position.x - spacing, position.y, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-4`} position={[position.x, position.y + spacing*2, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-5`} position={[position.x + spacing, position.y + spacing, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-6`} position={[position.x, position.y, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>,
        <mesh key={`${position.x}-${position.y}-7`} position={[position.x + spacing, position.y - spacing, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      );
      break;
    default:
      // Default point for any other character
      letterShapes.push(
        <mesh key={`${position.x}-${position.y}-1`} position={[position.x, position.y, position.z]}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      );
  }
  
  return letterShapes;
};

const TextMesh = ({ text, color = '#FF00FF', floatIntensity = 1, speed = 1 }: NeonText3DProps) => {
  const groupRef = useRef<any>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const sineWave = Math.sin(state.clock.elapsedTime * speed * 0.5);
      groupRef.current.position.y = sineWave * 0.1;
      groupRef.current.rotation.y = sineWave * 0.1;
    }
  });
  
  // Create a 3D point cloud for each letter
  const renderText = () => {
    const letters = [];
    const letterSpacing = 0.4;
    
    // BEEFED UP: Use significantly more particles for "blissful growth"
    const particleCount = Math.max(text.length * 40, 100);
    
    // Create text outline shape
    // Calculate text width based on character count
    const textWidth = text.length * 0.5;
    const textShape = [];
    
    // Create a cloud of particles that roughly follows the text shape
    // Generate particles in a more text-like pattern
    for (let i = 0; i < particleCount; i++) {
      const letterIndex = i % text.length;
      // Map letter position to x-coordinate (spread across space)
      const baseX = (letterIndex / text.length) * textWidth - (textWidth / 2);
      
      // Make a more text-like vertical distribution by using sine wave for baseline
      // This creates a wavy text effect
      const letterPosition = letterIndex / text.length;
      const baseY = Math.sin(letterPosition * Math.PI * 2) * 0.2;
      
      // Add controlled randomness to create a psychedelic cloud-like effect around the text shape
      const x = baseX + (Math.random() - 0.5) * 0.4;
      const y = baseY + (Math.random() - 0.5) * 0.6;
      const z = (Math.random() - 0.5) * 1.5; // Deeper 3D effect
      
      // More vibrant color palette with more magenta/pink for "blissful growth"
      const colorOptions = ['#FF00FF', '#FF00FF', '#9D00FF', '#00FFFF', '#FF40FF'];
      const particleColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      
      // Varied particle sizes with some larger ones for visual impact
      const particleSize = 0.1 + Math.random() * 0.18;
      
      // Higher emissive intensity for more glow
      const emissiveIntensity = 3 + Math.random() * 2;
      
      letters.push(
        <mesh key={`particle-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[particleSize, 12, 12]} />
          <meshStandardMaterial 
            color={particleColor} 
            emissive={particleColor} 
            emissiveIntensity={emissiveIntensity} 
            transparent 
            opacity={0.8 + Math.random() * 0.2}
          />
        </mesh>
      );
    }
    
    return letters;
  };
  
  return (
    <Float 
      floatIntensity={floatIntensity} 
      rotationIntensity={0.6} 
      speed={2.5}
    >
      <group ref={groupRef}>
        {renderText()}
        {/* Enhanced lighting - multiple lights for more dramatic effect */}
        <pointLight position={[0, 0, 2.5]} intensity={3} color={color} />
        <pointLight position={[2, 0, 1.5]} intensity={1.5} color="#FF40FF" />
        <pointLight position={[-2, 0, 1.5]} intensity={1.5} color="#9D00FF" />
        <pointLight position={[0, 1, 1]} intensity={2} color="#FFFFFF" />
        
        {/* Add subtle ambient light */}
        <ambientLight intensity={0.3} />
      </group>
    </Float>
  );
};

const NeonText3D = ({ 
  text, 
  size = 1, 
  color = '#FF00FF', 
  floatIntensity = 1.5, 
  speed = 1, 
  className = '' 
}: NeonText3DProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // Provide an appropriate fallback that's visible immediately
    return (
      <div className={`neon-text text-center font-bold ${className}`} 
           style={{
             color: color,
             textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
             fontSize: size === 1 ? '2rem' : size === 0.5 ? '1.5rem' : '3rem'
           }}>
        {text}
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative h-[150px] ${className}`}
      style={{ minHeight: '150px', width: '100%' }}
    >
      {/* Static fallback that stays visible but is positioned behind the Canvas */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-0 neon-text text-center font-bold"
        style={{
          color: color,
          textShadow: `0 0 5px ${color}, 0 0 10px ${color}, 0 0 15px ${color}, 0 0 20px ${color}`,
          fontSize: size === 1 ? '2rem' : size === 0.5 ? '1.5rem' : '3rem',
          opacity: 0.7
        }}
      >
        {text}
      </div>
      
      {/* Enhanced 3D Canvas with improved settings */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ 
            position: [0, 0, 6], 
            fov: 60,
          }}
          dpr={[1, 2]} // Higher quality for important text
          performance={{ min: 0.5 }}
          gl={{ 
            antialias: true,
            alpha: true,
          }}
        >
          {/* We've removed these since we have better lighting inside the TextMesh component */}
          <TextMesh 
            text={text} 
            color={color} 
            floatIntensity={floatIntensity} 
            speed={speed} 
          />
          
          {/* Add subtle fog for depth */}
          <fog attach="fog" args={['#000', 5, 15]} />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default NeonText3D;