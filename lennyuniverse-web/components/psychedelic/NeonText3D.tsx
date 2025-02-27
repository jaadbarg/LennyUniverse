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
    
    // Use input text to determine how many particles to create
    // This ensures the "blissful growth" text is fully represented
    const particleCount = Math.max(text.length * 20, 50);
    
    for (let i = 0; i < particleCount; i++) {
      // Create particles in a pattern that better resembles text
      // Distribute particles more horizontally to form a text-like shape
      const letterIndex = i % text.length;
      const horizontalPosition = (letterIndex / text.length) * 6 - 3; // Spread across horizontal space
      
      const x = horizontalPosition + (Math.random() - 0.5) * 0.8; // Add some randomness but keep general position
      const y = (Math.random() - 0.5) * 1.2; // Less vertical spread
      const z = (Math.random() - 0.5) * 1;
      
      // Random color from our neon palette, but more consistently related to the text
      const colorChoice = (letterIndex + Math.floor(Math.random() * 2)) % 3; // Make colors more consistent for nearby particles
      const particleColor = colorChoice === 0 ? '#FF00FF' : colorChoice === 1 ? '#9D00FF' : '#00FFFF';
      
      // Larger particles to ensure text is more visible
      const particleSize = 0.08 + Math.random() * 0.12;
      
      letters.push(
        <mesh key={`particle-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[particleSize, 16, 16]} />
          <meshStandardMaterial color={particleColor} emissive={particleColor} emissiveIntensity={2.5 + Math.random()} />
        </mesh>
      );
    }
    
    return letters;
  };
  
  return (
    <Float 
      floatIntensity={floatIntensity} 
      rotationIntensity={0.5} 
      speed={2}
    >
      <group ref={groupRef}>
        {renderText()}
        {/* Add a point light to make everything glow */}
        <pointLight position={[0, 0, 2]} intensity={2} color={color} />
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
      
      {/* 3D Canvas that will render on top of the fallback */}
      <div className="absolute inset-0 z-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
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