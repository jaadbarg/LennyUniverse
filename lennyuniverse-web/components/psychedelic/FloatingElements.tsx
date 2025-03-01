import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  shapes?: ('circle' | 'square' | 'triangle' | 'star')[];
  minSize?: number;
  maxSize?: number;
  intensity?: number;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 6, // Reduced from 15 to 6
  colors = ['#FF00FF', '#9D00FF', '#00FFFF'],
  shapes = ['circle', 'square'], // Simplified shapes
  minSize = 20,
  maxSize = 50, // Reduced max size
  intensity = 0.6, // Reduced animation intensity
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing elements
    elementsRef.current = [];
    
    // Create the elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      
      // Random properties
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = minSize + Math.random() * (maxSize - minSize);
      
      // Style based on shape
      element.style.position = 'absolute';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.opacity = `${0.1 + Math.random() * 0.2}`;
      element.style.boxShadow = `0 0 ${size / 2}px ${color}`;
      element.style.filter = `blur(${size / 10}px)`;
      element.style.backgroundColor = color;
      element.style.mixBlendMode = 'screen';
      element.style.willChange = 'transform, opacity';
      
      // Position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      // Shape-specific styling
      if (shape === 'circle') {
        element.style.borderRadius = '50%';
      } else if (shape === 'square') {
        element.style.borderRadius = '4px';
      } else if (shape === 'triangle') {
        element.style.width = '0';
        element.style.height = '0';
        element.style.backgroundColor = 'transparent';
        element.style.borderLeft = `${size / 2}px solid transparent`;
        element.style.borderRight = `${size / 2}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
      } else if (shape === 'star') {
        // Star shape (simplified)
        element.style.borderRadius = '50%';
        element.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      }
      
      containerRef.current.appendChild(element);
      elementsRef.current.push(element);
    }
    
    // Animate elements - with optimized GSAP animations
    elementsRef.current.forEach(element => {
      // Random animation parameters - simpler, slower animations
      const duration = 10 + Math.random() * 15; // Longer animations = less work for the browser
      const xMovement = 50 * intensity * (Math.random() - 0.5); // Reduced movement range
      const yMovement = 50 * intensity * (Math.random() - 0.5); // Reduced movement range
      const rotation = 180 * (Math.random() - 0.5) * intensity; // Reduced rotation
      const scale = 0.9 + Math.random() * 0.2; // Less scaling
      
      // GSAP timeline with fewer properties and reduced complexity
      gsap.to(element, {
        x: `${xMovement}%`,
        y: `${yMovement}%`,
        rotation: rotation,
        opacity: 0.1 + Math.random() * 0.2, // Lower opacity
        duration: duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5,
        // Removed scale animation as it's more expensive
      });
    });
    
    return () => {
      // Clean up animations
      gsap.killTweensOf(elementsRef.current);
      
      // Clean up elements
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [count, colors, shapes, minSize, maxSize, intensity]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};

export default FloatingElements;