import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const HypercubeScene = ({ 
  count, 
  colors, 
  spread, 
  speed, 
  minSize, 
  maxSize, 
  intensity,
  interactive
}: any) => {
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
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#FFFFFF" />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF00FF" />
      </mesh>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.2}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </Canvas>
  );
};

export default HypercubeScene;