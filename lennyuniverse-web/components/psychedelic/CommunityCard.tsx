import { useState, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CommunityCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  quote: string;
  socialLinks?: { type: string; url: string }[];
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

const CommunityCard = ({
  name,
  role,
  image,
  bio,
  quote,
  socialLinks = [],
  primaryColor = "#FF00FF",
  secondaryColor = "#9D00FF",
  className = ""
}: CommunityCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For 3D hover effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    // Divide by smaller value for more pronounced effect
    const rotateXValue = ((mouseY - rect.height / 2) / (rect.height / 10)) * -1;
    const rotateYValue = (mouseX - rect.width / 2) / (rect.width / 10);
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    controls.start({
      scale: 1.03,
      transition: { duration: 0.3 }
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      scale: 1,
      transition: { duration: 0.3 }
    });
    
    // Reset rotation
    rotateX.set(0);
    rotateY.set(0);
  };
  
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'twitter':
      case 'x':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        );
      case 'website':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"/>
          </svg>
        );
    }
  };

  // Background pulse animation for the border gradient
  const pulseAnimation = {
    animate: {
      boxShadow: [
        `0 0 0 2px rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.3)`,
        `0 0 0 4px rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.2)`,
        `0 0 0 2px rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.3)`,
      ],
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative w-full max-w-sm rounded-xl overflow-hidden perspective-1000 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}20)`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transformStyle: "preserve-3d",
      }}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={pulseAnimation.animate}
      transition={pulseAnimation.transition}
    >
      <motion.div
        className="w-full h-full transition-all duration-500"
        style={{
          rotateY: isFlipped ? 180 : 0,
          rotateX: rotateX,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front side of the card */}
        <motion.div
          className={`absolute w-full h-full p-6 ${isFlipped ? 'invisible' : 'visible'}`}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 mb-4 overflow-hidden rounded-full">
              {/* Image container with gradient frame and pulse effect */}
              <motion.div 
                className="absolute top-0 left-0 right-0 bottom-0 rounded-full z-10"
                style={{
                  background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
                  padding: "3px" // This creates the border effect
                }}
                animate={{
                  background: [
                    `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
                    `linear-gradient(225deg, ${primaryColor}, ${secondaryColor})`,
                    `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={image}
                    alt={name}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </div>
            
            <motion.h3 
              className="text-xl font-bold text-white mb-1 text-center"
              animate={{
                textShadow: [
                  `0 0 8px ${primaryColor}80`,
                  `0 0 12px ${primaryColor}A0`,
                  `0 0 8px ${primaryColor}80`,
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {name}
            </motion.h3>
            
            <p className="text-gray-300 mb-4 text-center italic">{role}</p>
            
            <motion.div 
              className="w-16 h-0.5 mb-4"
              style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
              animate={{
                width: ["4rem", "6rem", "4rem"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <p className="text-gray-200 mb-6 text-center">{quote}</p>
            
            <div className="flex space-x-3 mt-auto">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}40)`,
                      border: `1px solid ${primaryColor}50`
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      boxShadow: `0 0 15px ${primaryColor}80`
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span className="text-white">
                      {getSocialIcon(link.type)}
                    </motion.span>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <motion.button
              className="mt-6 px-4 py-2 rounded-full text-sm text-white"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}80, ${secondaryColor}80)`,
                border: `1px solid ${primaryColor}60`
              }}
              whileHover={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 15px ${primaryColor}60`
              }}
              onClick={flipCard}
              whileTap={{ scale: 0.95 }}
            >
              Full Bio
            </motion.button>
          </div>
        </motion.div>
        
        {/* Back side of the card */}
        <motion.div
          className={`absolute w-full h-full p-6 ${isFlipped ? 'visible' : 'invisible'}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flex flex-col h-full">
            <h3 
              className="text-xl font-bold mb-4 text-white"
              style={{ textShadow: `0 0 8px ${primaryColor}80` }}
            >
              About {name}
            </h3>
            
            <div className="overflow-y-auto flex-grow" style={{ scrollbarWidth: 'thin' }}>
              <p className="text-gray-200">{bio}</p>
            </div>
            
            <motion.button
              className="mt-6 px-4 py-2 rounded-full text-sm text-white self-center"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}80, ${secondaryColor}80)`,
                border: `1px solid ${primaryColor}60`
              }}
              whileHover={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 15px ${primaryColor}60`
              }}
              onClick={flipCard}
              whileTap={{ scale: 0.95 }}
            >
              Back to Profile
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CommunityCard;