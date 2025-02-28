import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface OptimizedCubeProps {
  color: string;
  position: [number, number, number];
  rotationSpeed?: number;
}

// Performance-optimized single cube component
const OptimizedCube = ({ color, position, rotationSpeed = 0.002 }: OptimizedCubeProps) => {
  // Add proper typing to the mesh ref
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 1.3;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

interface HypercubeSceneProps {
  count?: number;
  colors?: string[];
  spread?: number;
  speed?: number;
  intensity?: number;
  minSize?: number;
  maxSize?: number;
  interactive?: boolean;
}

// Ultra-simplified static scene for maximum performance
const HypercubeScene = ({ 
  count = 1, // We're only using 1 cube, but keep param for backward compatibility
  colors = ['#FF00FF', '#9D00FF', '#00FFFF'], 
  spread = 5,
  speed = 0.1, // Not used but kept for compatibility
  intensity = 0.5,
  minSize = 1, // Not used but kept for compatibility
  maxSize = 2, // Not used but kept for compatibility
  interactive = false // Not used but kept for compatibility
}: HypercubeSceneProps) => {
  // Just get one random color
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], [colors]);
  
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      dpr={[0.5, 0.8]} // Very low resolution for better performance
      frameloop="demand" // Only render when needed
      performance={{ min: 0.1 }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />
      
      {/* Just a single static cube for absolute minimal performance impact */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color={color} transparent opacity={intensity} />
      </mesh>
    </Canvas>
  );
};

export default HypercubeScene;