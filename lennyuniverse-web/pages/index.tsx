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
import PsychedelicCard from '../components/psychedelic/PsychedelicCard';
import NeonButton from '../components/psychedelic/NeonButton';
import PsychedelicBackground from '../components/psychedelic/PsychedelicBackground';
import NebulaBackground from '../components/psychedelic/NebulaBackground';
import SVGFilters from '../components/psychedelic/SVGFilters';
import StarfieldBackground from '../components/psychedelic/StarfieldBackground';
import SpaceText from '../components/psychedelic/SpaceText';
import NebulaExplosion from '../components/psychedelic/NebulaExplosion';
import ClickEffects from '../components/psychedelic/ClickEffects';
import { useInView } from 'react-intersection-observer';

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
      
      {/* Mathematical psychedelic click effects - improved positioning */}
      <ClickEffects 
        enabled={true}
        maxEffects={3}
        effectDuration={2000}
        colors={['#E233FF', '#8B31FF', '#00D1D1', '#3F7DFF', '#5C14E8', '#9345FF']}
      />
      
      {/* New Space-Themed Hero Section With Twinkling Stars */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
        {/* Deep space background - static gradient for performance */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, var(--deep-space) 0%, var(--cosmic-gray) 80%, var(--deep-space) 100%)',
            zIndex: -10
          }}
        />
        
        {/* Optimized starfield with fewer stars for better performance */}
        <StarfieldBackground
          starCount={90}
          opacity={1}
          withNebulas={true}
        />
        
        {/* Reduced nebula explosions for better performance */}
        <NebulaExplosion 
          count={1}
          interval={12000}
          maxActive={1}
          zIndex={-5}
        />
        
        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Journey text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Simple cosmic title */}
              <div className="relative mb-10">
                {/* Ambient glow behind text */}
                <div className="absolute -inset-5 bg-gradient-radial from-psychedelicPurple/20 via-psychedelicMagenta/10 to-transparent rounded-full blur-xl"></div>
                
                {/* Main heading - Your journey of */}
                <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left mb-6 font-display">
                  <SpaceText 
                    text="Your journey of" 
                    size="3xl"
                    variant="cosmic"
                    glowColor="var(--psychedelic-indigo)"
                  />
                </h1>
                
                {/* Featured text - blissful growth */}
                <div className="relative py-8 mb-8 backdrop-blur-sm">
                  {/* Simple background with gradient border */}
                  <div className="absolute inset-0 bg-deepSpace/30 border border-psychedelicPurple/20 rounded-xl"></div>
                  
                  {/* Static glowing text */}
                  <div className="flex justify-center items-center">
                    <SpaceText 
                      text="blissful growth" 
                      size="4xl"
                      glowColor="var(--psychedelic-magenta)"
                      className="font-audiowide tracking-widest uppercase"
                      animated={true}
                    />
                  </div>
                </div>
              </div>
              
              {/* Description with simple glass effect */}
              <motion.div 
                className="relative p-6 rounded-xl backdrop-blur-sm bg-black/30 border border-purple-500/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <p className="text-lg md:text-xl font-medium text-white/90 text-center md:text-left">
                  Discover your path to personal growth and creative expansion.
                  <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
                    Join our mindful community where imagination and awareness blend to reveal your true potential.
                  </span>
                </p>
              </motion.div>
              
              {/* Call to action button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 text-center md:text-left"
              >
                <div className="relative inline-block">
                  {/* Simple glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600/40 to-purple-600/40 rounded-full blur-md"></div>
                  
                  <NeonButton 
                    href="/contact" 
                    color="pink"
                    size="lg"
                    variant="flux"
                    className="relative px-12 py-4 text-xl font-bold"
                  >
                    <span className="relative inline-flex items-center">
                      <span className="mr-2">✦</span>
                      Join Our Community
                    </span>
                  </NeonButton>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right column - LENNY logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-full overflow-hidden max-w-sm mx-auto relative p-2">
                {/* Static logo container with subtle animation */}
                <div className="relative h-80 w-80 mx-auto rounded-full bg-gradient-to-b from-black to-purple-900/30 border border-purple-500/30 backdrop-blur-sm p-4">
                  {/* Ambient glow */}
                  <div className="absolute inset-0 rounded-full blur-xl bg-gradient-radial from-pink-600/20 via-purple-500/10 to-transparent"></div>
                  
                  {/* Logo display with Saturn rings effect - conditionally rendered for mobile */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Saturn rings effect - hidden on mobile for performance */}
                    <div className="absolute z-5 w-[350px] h-[350px] rounded-full hidden md:block">
                      {/* Outer glow ring */}
                      <div
                        className="absolute inset-0 rounded-full saturn-outer-ring"
                        style={{
                          background: 'conic-gradient(from 0deg, #FF00FF20, #9D00FF30, #00FFFF30, #FF00FF20)',
                          filter: 'blur(10px)',
                          opacity: 0.8
                        }}
                      />
                      
                      {/* Inner rings */}
                      <div 
                        className="absolute inset-0 rounded-full saturn-inner-ring"
                        style={{
                          background: 'repeating-radial-gradient(circle, transparent, transparent 2px, #FFFFFF10 3px, #FFFFFF08 4px), linear-gradient(135deg, #FF00FF30, #9D00FF50, #00FFFF30)',
                          boxShadow: '0 0 20px 2px rgba(255, 0, 255, 0.5), inset 0 0 15px rgba(255, 0, 255, 0.3)'
                        }}
                      />
                    </div>
                    
                    {/* Simple glow effect for mobile only */}
                    <div className="absolute inset-0 rounded-full bg-gradient-radial from-purple-500/20 to-transparent block md:hidden"></div>
                    
                    {/* Logo with white background and enhanced shine effect */}
                    <div className="logo-shine rounded-full p-2 bg-gradient-to-b from-white via-white to-purple-50 z-10 relative shadow-lg">
                      <img 
                        src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/LU-Logo_Black.png?fit=1080%2C901&ssl=1"
                        alt="Lenny Universe Logo"
                        width={220}
                        height={220}
                        className="relative z-10"
                      />
                      
                      {/* Inner glow for the logo */}
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: 'inset 0 0 20px rgba(157, 0, 255, 0.3)',
                        filter: 'blur(2px)'
                      }}></div>
                    </div>
                    
                    {/* Enhanced cosmic text below logo */}
                    <div className="absolute -bottom-2 left-0 right-0 text-center">
                      <SpaceText 
                        text="LENNY" 
                        size="2xl"
                        glowColor="var(--psychedelic-magenta)"
                        animated={true}
                        variant="cosmic"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-deepSpace/40 to-deepSpace/90 z-0" />
        
        {/* Static starfield background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <StarfieldBackground
            starCount={100}
            opacity={0.7}
            withNebulas={true}
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