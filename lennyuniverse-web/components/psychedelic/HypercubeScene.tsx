import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Performance-optimized single cube component
const OptimizedCube = ({ color, position, rotationSpeed = 0.002 }) => {
  const meshRef = useRef();
  
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

// Main scene component with performance optimizations
const HypercubeScene = ({ 
  count = 3, // Drastically reduced count
  colors = ['#FF00FF', '#9D00FF', '#00FFFF'], 
  spread = 5, 
  speed = 0.1, // Reduced speed
  minSize, 
  maxSize, 
  intensity,
  interactive = false
}: any) => {
  // Pre-calculate cube positions instead of random generation during render
  const cubePositions = useMemo(() => {
    return Array.from({ length: count }).map(() => [
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread
    ]);
  }, [count, spread]);
  
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
      dpr={[1, 1.5]} // Reduce resolution for better performance
      frameloop="demand" // Only render when needed
      performance={{ min: 0.1 }} // Allow frame rates to drop more before taking measures
    >
      <color attach="background" args={['#000000']} transparent opacity={0} />
      <ambientLight intensity={0.2} />
      
      {/* Render pre-calculated cubes */}
      {cubePositions.map((position, index) => (
        <OptimizedCube 
          key={index}
          position={position}
          color={colors[index % colors.length]}
          rotationSpeed={speed * (0.5 + Math.random() * 0.5)}
        />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.1}
        autoRotate
        autoRotateSpeed={0.1} // Slower rotation
        enableDamping={false} // Disable physics for performance
      />
    </Canvas>
  );
};

export default HypercubeScene;