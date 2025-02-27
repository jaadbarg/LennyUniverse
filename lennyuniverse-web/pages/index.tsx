import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { memo } from 'react';

// Create a memoized image component that won't cause fetchPriority warnings
const Image = memo(({ src, alt, width, height, className, style, fill, priority }: any) => {
  const imageProps: any = {
    src,
    alt,
    width,
    height,
    className,
    style
  };
  
  if (fill) {
    imageProps.fill = fill;
  }
  
  if (priority) {
    imageProps.priority = priority;
  }
  
  return <NextImage {...imageProps} />;
});

Image.displayName = 'MemoizedImage';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeonText3D from '../components/psychedelic/NeonText3D';
import PsychedelicCard from '../components/psychedelic/PsychedelicCard';
import NeonButton from '../components/psychedelic/NeonButton';
import PsychedelicBackground from '../components/psychedelic/PsychedelicBackground';
import StarfieldBackground from '../components/psychedelic/StarfieldBackground';
import SVGFilters from '../components/psychedelic/SVGFilters';
import { useInView } from 'react-intersection-observer';
// Import 3D scenes with dynamic loading to avoid SSR issues
import dynamic from 'next/dynamic';
const Scene3D = dynamic(() => import('../components/psychedelic/Scene3D'), { ssr: false });
const HypercubeScene = dynamic(() => import('../components/psychedelic/HypercubeScene'), { ssr: false });

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Setup intersection observer hooks for animations
  const [featureRef1, featureInView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [featureRef2, featureInView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [featureRef3, featureInView3] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [meetLennyRef, meetLennyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative">
      <SVGFilters />
      
      {/* Hero Section with 3D text */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
        <div 
          className="absolute inset-0 overflow-hidden audio-reactive"
          style={{ 
            background: 'linear-gradient(135deg, rgba(10,10,10,1) 0%, rgba(20,0,20,1) 100%)',
            opacity: 0.8,
            zIndex: -2
          }}
        />
        
        {/* Dynamic particles that follow mouse */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 255, 0.15), transparent 30%)`,
          }}
        />
        
        {/* Floating 4D hypercubes background */}
        <div className="absolute inset-0 z-0 opacity-80">
          <HypercubeScene 
            count={10} 
            colors={['#FF00FF', '#9D00FF', '#00FFFF']} 
            spread={20}
            speed={0.8}
            intensity={1.2}
          />
        </div>
        
        {/* 3D floating orbs background */}
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
        
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, scale, opacity }}
        >
          <StarfieldBackground
            starCount={300}
            depth={5}
            speed={0.3}
            opacity={0.6}
            colors={['#FFFFFF', '#BBBBFF', '#FFBBFF', '#AADDFF']}
            interactive={true}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="text-4xl md:text-6xl font-bold mb-6 text-white">
                <h1 className="block mb-2 neon-text-enhanced">Your journey of</h1>
                <div className="relative flex flex-col items-center justify-center w-full">
                  <NeonText3D 
                    text="blissful growth" 
                    className="h-24 md:h-32 w-full -mt-4 mb-4"
                    color="#9D00FF"
                    floatIntensity={2}
                    speed={1.5}
                  />
                </div>
              </div>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Discover your path to personal growth and creative expansion. Join our mindful community where imagination and awareness blend to reveal your true potential.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <NeonButton 
                  href="/contact" 
                  color="pink"
                  size="lg"
                  variant="flux"
                >
                  Join Our Community
                </NeonButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="relative z-20"
              >
                <div className="rounded-xl overflow-hidden max-w-sm mx-auto relative">
                  <motion.div
                    className="w-96 h-96 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-800 rounded-xl"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(157, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.8) 50%, rgba(0, 255, 255, 0.8) 100%)",
                        "linear-gradient(135deg, rgba(157, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.8) 50%, rgba(0, 255, 255, 0.8) 100%)",
                        "linear-gradient(225deg, rgba(157, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.8) 50%, rgba(0, 255, 255, 0.8) 100%)",
                        "linear-gradient(315deg, rgba(157, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.8) 50%, rgba(0, 255, 255, 0.8) 100%)",
                        "linear-gradient(45deg, rgba(157, 0, 255, 0.8) 0%, rgba(255, 0, 255, 0.8) 50%, rgba(0, 255, 255, 0.8) 100%)",
                      ],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px 5px rgba(255, 0, 255, 0.5), inset 0 0 10px 5px rgba(255, 0, 255, 0.3)",
                        "0 0 30px 10px rgba(255, 0, 255, 0.6), inset 0 0 15px 5px rgba(255, 0, 255, 0.4)",
                        "0 0 20px 5px rgba(255, 0, 255, 0.5), inset 0 0 10px 5px rgba(255, 0, 255, 0.3)",
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.h3
                      className="text-4xl md:text-6xl font-bold text-white"
                      animate={{
                        textShadow: [
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #FF00FF, 0 0 24px #FF00FF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #9D00FF, 0 0 24px #9D00FF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #00FFFF, 0 0 24px #00FFFF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #9D00FF, 0 0 24px #9D00FF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #FF00FF, 0 0 24px #FF00FF",
                        ]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      LENNY
                    </motion.h3>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -inset-10 bg-neonPurple rounded-full opacity-5 blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-24 relative">
        <PsychedelicBackground variant="grid" intensity={0.7} primaryColor="#9D00FF">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 neon-teal-text-enhanced">
                Our Mindful Community
              </h2>
              <motion.div 
                className="w-24 h-1 bg-neonTeal mx-auto mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div ref={featureRef1}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={featureInView1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                >
                  <PsychedelicCard
                    glowColor="#FF00FF"
                    className="p-8 h-full"
                    tiltEnabled={true}
                    glowIntensity={2}
                  >
                    <div className="w-16 h-16 rounded-full bg-neonPink/20 flex items-center justify-center mb-6 mx-auto">
                      <motion.span 
                        className="text-2xl neon-text-enhanced"
                        animate={{
                          filter: [
                            "drop-shadow(0 0 5px #FF00FF)",
                            "drop-shadow(0 0 15px #FF00FF)",
                            "drop-shadow(0 0 5px #FF00FF)",
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        ✦
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center neon-text-enhanced">Personal Transformation</h3>
                    <p className="text-gray-300 text-center">
                      Discover your inner strength and potential through mindfulness practices. We provide tools and support for meaningful personal growth and self-discovery.
                    </p>
                  </PsychedelicCard>
                </motion.div>
              </div>
              
              <div ref={featureRef2}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={featureInView2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <PsychedelicCard
                    glowColor="#9D00FF"
                    className="p-8 h-full"
                    tiltEnabled={true}
                    glowIntensity={2}
                  >
                    <div className="w-16 h-16 rounded-full bg-neonPurple/20 flex items-center justify-center mb-6 mx-auto">
                      <motion.span 
                        className="text-2xl neon-purple-text-enhanced"
                        animate={{
                          filter: [
                            "drop-shadow(0 0 5px #9D00FF)",
                            "drop-shadow(0 0 15px #9D00FF)",
                            "drop-shadow(0 0 5px #9D00FF)",
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 0.5
                        }}
                      >
                        ✦
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center neon-purple-text-enhanced">Community Connection</h3>
                    <p className="text-gray-300 text-center">
                      Share experiences and grow together in our supportive community. Through authentic connection, we inspire each other and create meaningful relationships.
                    </p>
                  </PsychedelicCard>
                </motion.div>
              </div>
              
              <div ref={featureRef3}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={featureInView3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <PsychedelicCard
                    glowColor="#00FFFF"
                    className="p-8 h-full"
                    tiltEnabled={true}
                    glowIntensity={2}
                  >
                    <div className="w-16 h-16 rounded-full bg-neonTeal/20 flex items-center justify-center mb-6 mx-auto">
                      <motion.span 
                        className="text-2xl neon-teal-text-enhanced"
                        animate={{
                          filter: [
                            "drop-shadow(0 0 5px #00FFFF)",
                            "drop-shadow(0 0 15px #00FFFF)",
                            "drop-shadow(0 0 5px #00FFFF)",
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1
                        }}
                      >
                        ✦
                      </motion.span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center neon-teal-text-enhanced">Creative Exploration</h3>
                    <p className="text-gray-300 text-center">
                      Embrace curiosity and discover new perspectives. We encourage creative thinking and exploration as pathways to personal growth and enlightenment.
                    </p>
                  </PsychedelicCard>
                </motion.div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center max-w-3xl mx-auto"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Welcome to our vibrant community! We're dedicated to fostering personal growth, creative expression, and mindful living. 
                Through shared experiences and authentic connections, we create a space where everyone can thrive and discover their full potential.
              </p>
            </motion.div>
          </div>
        </PsychedelicBackground>
      </section>
      
      {/* Meet Lenny Section */}
      <section className="py-24 relative" ref={meetLennyRef}>
        <PsychedelicBackground variant="waves" intensity={0.8} primaryColor="#FF00FF" secondaryColor="#9D00FF">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={meetLennyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="relative h-[500px] w-[500px] rounded-lg z-10">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-900 rounded-lg"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(157, 0, 255, 0.9) 0%, rgba(255, 0, 255, 0.9) 50%, rgba(0, 255, 255, 0.9) 100%)",
                        "linear-gradient(135deg, rgba(157, 0, 255, 0.9) 0%, rgba(255, 0, 255, 0.9) 50%, rgba(0, 255, 255, 0.9) 100%)",
                        "linear-gradient(225deg, rgba(157, 0, 255, 0.9) 0%, rgba(255, 0, 255, 0.9) 50%, rgba(0, 255, 255, 0.9) 100%)",
                      ]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute -inset-2 rounded-lg"
                    animate={{
                      boxShadow: [
                        "0 0 20px 0px rgba(157, 0, 255, 0.5)",
                        "0 0 40px 5px rgba(157, 0, 255, 0.6)",
                        "0 0 20px 0px rgba(157, 0, 255, 0.5)",
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.h3
                      className="text-6xl font-bold text-white mb-4"
                      animate={{
                        textShadow: [
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #FF00FF, 0 0 24px #FF00FF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #9D00FF, 0 0 24px #9D00FF",
                          "0 0 8px #fff, 0 0 12px #fff, 0 0 16px #00FFFF, 0 0 24px #00FFFF",
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      LENNY
                    </motion.h3>
                    <motion.span
                      className="text-2xl text-white neon-text-enhanced"
                      animate={{
                        textShadow: [
                          "0 0 5px #fff, 0 0 8px #fff, 0 0 10px #FF00FF",
                          "0 0 5px #fff, 0 0 8px #fff, 0 0 10px #9D00FF",
                          "0 0 5px #fff, 0 0 8px #fff, 0 0 10px #00FFFF",
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      UNIVERSE
                    </motion.span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={meetLennyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 neon-purple-text-enhanced">
                  Meet Lenny
                </h2>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Hi there! I'm Lenny — an advocate, artist, and mindfulness guide dedicated to helping others unlock their potential.
                  My journey has taught me that personal growth happens when we embrace both creativity and mindfulness as complementary paths.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  With experience in both practical mindfulness techniques and creative expression, I'm passionate about guiding others toward their own discoveries. 
                  My approach blends modern psychology with artistic exploration to create transformative experiences that resonate on multiple levels.
                </p>
                <div className="mt-8">
                  <NeonButton
                    href="/onstage"
                    color="purple"
                    size="lg"
                    variant="flux"
                  >
                    Book Lenny
                  </NeonButton>
                </div>
              </motion.div>
            </div>
          </div>
        </PsychedelicBackground>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative" ref={ctaRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90 z-0" />
        
        {/* Add hypercubes to CTA background with different settings */}
        <div className="absolute inset-0 z-0 opacity-60">
          <HypercubeScene 
            count={6} 
            colors={['#FF00FF', '#00FFFF', '#9D00FF']} 
            spread={25}
            speed={0.6}
            minSize={1.5}
            maxSize={3}
            intensity={0.8}
            interactive={false}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0 rounded-2xl" />
            <motion.div 
              className="absolute inset-0 z-0"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)",
                  "linear-gradient(135deg, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)",
                  "linear-gradient(225deg, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)",
                  "linear-gradient(315deg, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)",
                  "linear-gradient(45deg, rgba(255,0,255,0.3) 0%, rgba(157,0,255,0.3) 50%, rgba(0,255,255,0.3) 100%)",
                ]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute inset-0 z-0"
              animate={{
                boxShadow: [
                  "inset 0 0 40px 8px rgba(255, 0, 255, 0.4)",
                  "inset 0 0 60px 15px rgba(255, 0, 255, 0.5)",
                  "inset 0 0 40px 8px rgba(255, 0, 255, 0.4)",
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <div className="text-center relative z-10">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6 neon-text-enhanced"
                animate={{
                  textShadow: [
                    "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF",
                    "0 0 5px #fff, 0 0 15px #fff, 0 0 20px #FF00FF, 0 0 30px #FF00FF, 0 0 40px #FF00FF",
                    "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #FF00FF, 0 0 20px #FF00FF, 0 0 25px #FF00FF",
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                Begin Your Journey Today
              </motion.h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to explore your potential and connect with like-minded individuals? Join our community of mindful explorers and embark on a path of 
                growth, creativity, and self-discovery. Your journey to a more fulfilled and authentic life starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <NeonButton
                  href="/contact"
                  color="pink"
                  size="lg"
                  variant="flux"
                  pulse={true}
                >
                  Join Our Community
                </NeonButton>
                <NeonButton
                  href="/mindfulness"
                  color="teal"
                  size="lg"
                  variant="flux"
                >
                  Learn More
                </NeonButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}