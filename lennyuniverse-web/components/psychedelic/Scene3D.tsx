import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface OptimizedSphereProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

// Optimized floating sphere component
const OptimizedSphere = ({ position, color, size = 1, speed = 0.001 }: OptimizedSphereProps) => {
  // Add proper typing to the mesh ref
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      // Simple oscillation instead of complex physics
      meshRef.current.position.y = position[1] + Math.sin(t + offset) * 0.2;
    }
  });
  
  return (
    <Sphere ref={meshRef} args={[size, 8, 8]} position={position}>
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </Sphere>
  );
};

interface Scene3DProps {
  count?: number;
  colors?: string[];
}

// Ultra-simplified Scene3D component with just a single static element
const Scene3D = ({ colors = ['#FF00FF', '#9D00FF', '#00FFFF'] }: Scene3DProps) => {
  const color = useMemo(() => colors[Math.floor(Math.random() * colors.length)], [colors]);
  
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[0.5, 0.8]} // Very low resolution for better performance
        frameloop="demand" // Only render when needed
        performance={{ min: 0.1 }} // Allow lower frame rates
      >
        <ambientLight intensity={0.3} />
        
        {/* Just a single static sphere for absolute minimal performance impact */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 8, 8]} /> {/* Lower polygon count */}
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        
        {/* No OrbitControls or animations for maximum performance */}
      </Canvas>
    </div>
  );
};

export default Scene3D;