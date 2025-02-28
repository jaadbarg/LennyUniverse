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
import NebulaBackground from '../components/psychedelic/NebulaBackground';
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
        
        {/* Static gradient instead of dynamic mouse-following particles */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 0, 255, 0.15), transparent 50%)',
          }}
        />
        
        {/* Floating 4D hypercubes background - optimized */}
        <div className="absolute inset-0 z-0 opacity-60">
          <HypercubeScene 
            count={3} 
            colors={['#FF00FF', '#9D00FF', '#00FFFF']} 
            spread={10}
            speed={0.1}
            intensity={0.8}
          />
        </div>
        
        {/* 3D floating orbs background - optimized */}
        <div className="absolute inset-0 z-0">
          <Scene3D count={3} />
        </div>
        
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y, scale, opacity }}
        >
          <NebulaBackground
            opacity={0.7}
            zIndex={-10}
            animate={true}
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
              {/* BEEFED UP Title Section with Enhanced Effects */}
              <div className="relative z-30">
                <div className="text-5xl md:text-7xl font-bold mb-10 text-white relative">
                  {/* Psychedelic glow effect behind text */}
                  <div className="absolute inset-0 blur-3xl rounded-full bg-gradient-radial from-purple-600/30 via-pink-500/20 to-transparent z-0 animate-pulse-slow"></div>
                  
                  {/* Main Title with Enhanced Neon Effect */}
                  <h1 className="block mb-4 neon-text-enhanced text-center md:text-left relative z-10">
                    Your journey of
                  </h1>
                  
                  {/* Enhanced Container for Blissful Growth with Backdrop */}
                  <div className="relative flex flex-col items-center justify-center w-full mt-4 mb-6">
                    {/* Background Aura for the 3D Text */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-800/30 to-fuchsia-900/40 rounded-xl blur-lg transform scale-110 z-0"></div>
                    
                    {/* Larger and More Impressive 3D Text */}
                    <NeonText3D 
                      text="blissful growth" 
                      className="h-32 md:h-48 w-full mb-6 z-20"
                      color="#FF00FF" 
                      floatIntensity={3}
                      speed={1.2}
                    />
                    
                    {/* Light Rays Effect */}
                    <div className="absolute w-full h-full z-10 overflow-hidden opacity-70">
                      <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2 ray-rotate">
                        <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent,#FF00FF40_10deg,transparent_15deg,transparent_30deg,#9D00FF40_40deg,transparent_45deg)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              
                {/* Enhanced Paragraph with Gradient Border */}
                <motion.div 
                  className="relative z-20 p-6 rounded-xl backdrop-blur-sm border border-purple-500/30 bg-black/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-pink-900/5 rounded-xl z-0"></div>
                  <p className="text-xl md:text-3xl font-medium text-white/90 text-center md:text-left relative z-10">
                    Discover your path to personal growth and creative expansion. 
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                      Join our mindful community where imagination and awareness blend to reveal your true potential.
                    </span>
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 relative z-20"
              >
                {/* Glowing aura around button */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-600/30 via-purple-600/20 to-blue-600/30 rounded-full blur-xl animate-pulse-slow"></div>
                
                {/* Enhanced button with additional effects */}
                <div className="relative">
                  <NeonButton 
                    href="/contact" 
                    color="pink"
                    size="lg"
                    variant="flux"
                    className="relative z-10 px-12 py-5 text-xl font-bold tracking-wider shadow-lg"
                  >
                    <span className="relative inline-flex items-center">
                      <span className="mr-2">✨</span>
                      Join Our Community
                      <span className="ml-2 animate-pulse">✨</span>
                    </span>
                  </NeonButton>
                  
                  {/* Subtle animated border */}
                  <div className="absolute -inset-[3px] rounded-xl border border-purple-500/50 z-0 animate-pulse-slow"></div>
                </div>
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
        
        {/* Add hypercubes to CTA background with optimized settings */}
        <div className="absolute inset-0 z-0 opacity-40">
          <HypercubeScene 
            count={2} 
            colors={['#FF00FF', '#00FFFF', '#9D00FF']} 
            spread={15}
            speed={0.1}
            minSize={1.5}
            maxSize={2}
            intensity={0.5}
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