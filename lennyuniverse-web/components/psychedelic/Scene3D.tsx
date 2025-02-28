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

// Main Scene3D component with spheres already included
const Scene3D = ({ count = 3, colors = ['#FF00FF', '#9D00FF', '#00FFFF'] }: Scene3DProps) => {
  // Pre-calculate sphere positions for performance
  const sphereData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      size: 0.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [count, colors]);
  
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]} // Reduce resolution for better performance
        frameloop="demand" // Only render when needed
        performance={{ min: 0.1 }} // Allow lower frame rates before taking measures
      >
        <ambientLight intensity={0.3} />
        {/* No directional light to save performance */}
        
        {/* Render pre-calculated spheres */}
        {sphereData.map((sphere, index) => (
          <OptimizedSphere
            key={index}
            position={sphere.position}
            color={sphere.color}
            size={sphere.size}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.1}
          enableDamping={false} // Disable physics for performance
          autoRotate
          autoRotateSpeed={0.1} // Slow rotation speed
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;