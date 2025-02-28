import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeonButton from '../components/psychedelic/NeonButton';
import PsychedelicBackground from '../components/psychedelic/PsychedelicBackground';
import SVGFilters from '../components/psychedelic/SVGFilters';
import StarfieldBackground from '../components/psychedelic/StarfieldBackground';
import SpaceText from '../components/psychedelic/SpaceText';
import NebulaExplosion from '../components/psychedelic/NebulaExplosion';
import ClickEffects from '../components/psychedelic/ClickEffects';
import PsychedelicCard from '../components/psychedelic/PsychedelicCard';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
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
    // Set component as loaded
    setIsLoaded(true);
    
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left column - Journey text - changes order on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 order-2 lg:order-1"
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
                  {/* Neon glowing background */}
                  <div className="absolute inset-0 rounded-xl" 
                    style={{
                      background: 'rgba(10,2,15,0.4)',
                      boxShadow: '0 0 15px var(--psychedelic-magenta), inset 0 0 10px var(--psychedelic-purple)',
                      border: '1px solid rgba(226,51,255,0.5)'
                    }}>
                  </div>
                  
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
            
            {/* Right column - LENNY logo - visible on all devices - first on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative order-1 lg:order-2 mb-8 lg:mb-0"
            >
              <div className="rounded-full overflow-visible max-w-lg mx-auto relative p-4 md:p-8">
                {/* Static logo container with subtle animation - responsive sizing */}
                <div className="relative mx-auto rounded-full bg-gradient-to-b from-black to-purple-900/30 border border-purple-500/30 backdrop-blur-sm p-4 md:p-6"
                  style={{ 
                    height: 'clamp(260px, 70vw, 400px)',
                    width: 'clamp(260px, 70vw, 400px)',
                    maxWidth: '96vw'
                  }}
                >
                  {/* Ambient glow */}
                  <div className="absolute inset-0 rounded-full blur-xl bg-gradient-radial from-pink-600/20 via-purple-500/10 to-transparent"></div>
                  
                  {/* Logo display with Saturn rings effect */}
                  <div className="relative h-full w-full flex items-center justify-center">
                    {/* Saturn rings effect - dramatically larger on desktop */}
                    <div className="absolute rounded-full hidden sm:block" 
                      style={{
                        width: 'calc(100% + clamp(120px, 40vw, 300px))',
                        height: 'calc(100% + clamp(120px, 40vw, 300px))',
                        left: 'calc(-1 * clamp(60px, 20vw, 150px))', 
                        top: 'calc(-1 * clamp(60px, 20vw, 150px))', 
                        zIndex: 1
                      }}
                    >
                      {/* Outer glow ring - enhanced for desktop */}
                      <div
                        className="absolute inset-0 rounded-full saturn-outer-ring"
                        style={{
                          background: 'conic-gradient(from 0deg, #FF00FF30, #9D00FF40, #00FFFF40, #FF00FF30)',
                          filter: 'blur(clamp(8px, 2vw, 15px))',
                          opacity: 0.9
                        }}
                      />
                      
                      {/* Inner rings - enhanced for desktop */}
                      <div 
                        className="absolute inset-0 rounded-full saturn-inner-ring"
                        style={{
                          background: 'repeating-radial-gradient(circle, transparent, transparent 2px, #FFFFFF15 3px, #FFFFFF10 4px), linear-gradient(135deg, #FF00FF40, #9D00FF60, #00FFFF40)',
                          boxShadow: '0 0 35px 8px rgba(255, 0, 255, 0.6), inset 0 0 30px rgba(255, 0, 255, 0.4)'
                        }}
                      />
                    </div>
                    
                    {/* Mobile-optimized rings */}
                    <div className="absolute rounded-full sm:hidden" 
                      style={{
                        width: 'calc(100% + 60px)',
                        height: 'calc(100% + 60px)',
                        left: '-30px', 
                        top: '-30px', 
                        zIndex: 1
                      }}
                    >
                      {/* Outer glow ring - mobile optimized */}
                      <div
                        className="absolute inset-0 rounded-full saturn-outer-ring"
                        style={{
                          background: 'conic-gradient(from 0deg, #FF00FF30, #9D00FF40, #00FFFF40, #FF00FF30)',
                          filter: 'blur(6px)',
                          opacity: 0.8
                        }}
                      />
                      
                      {/* Inner rings - mobile optimized */}
                      <div 
                        className="absolute inset-0 rounded-full saturn-inner-ring"
                        style={{
                          background: 'repeating-radial-gradient(circle, transparent, transparent 1px, #FFFFFF15 2px, #FFFFFF10 3px), linear-gradient(135deg, #FF00FF40, #9D00FF60, #00FFFF40)',
                          boxShadow: '0 0 15px 4px rgba(255, 0, 255, 0.5), inset 0 0 10px rgba(255, 0, 255, 0.3)'
                        }}
                      />
                    </div>
                    
                    {/* Logo with white background and enhanced shine effect - responsive size */}
                    <div className="logo-shine rounded-full p-2 bg-gradient-to-b from-white via-white to-purple-50 z-10 relative shadow-lg" 
                      style={{
                        width: 'calc(100% - 20px)',
                        height: 'calc(100% - 20px)'
                      }}
                    >
                      <img 
                        src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/LU-Logo_Black.png?fit=1080%2C901&ssl=1"
                        alt="Lenny Universe Logo"
                        className="relative z-10 w-full h-full object-contain"
                        style={{ padding: '10px' }}
                        loading="eager"
                      />
                      
                      {/* Inner glow for the logo */}
                      <div className="absolute inset-0 rounded-full" style={{
                        boxShadow: 'inset 0 0 30px rgba(157, 0, 255, 0.4), inset 0 0 10px rgba(255, 0, 255, 0.3)',
                        filter: 'blur(2px)'
                      }}></div>
                    </div>
                  </div>
                  
                  {/* Pulsing animation effect - enhanced for desktop */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 30px 8px rgba(255, 0, 255, 0.4), 0 0 50px 20px rgba(157, 0, 255, 0.2)",
                        "0 0 40px 15px rgba(255, 0, 255, 0.5), 0 0 70px 30px rgba(157, 0, 255, 0.3)",
                        "0 0 30px 8px rgba(255, 0, 255, 0.4), 0 0 50px 20px rgba(157, 0, 255, 0.2)"
                      ],
                      filter: [
                        "blur(2px)",
                        "blur(4px)",
                        "blur(2px)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Cosmic divider between sections */}
      <div className="cosmic-divider">
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: "50%", 
            left: "50%", 
            width: "80%", 
            height: "2px",
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(90deg, transparent, var(--psychedelic-purple), var(--psychedelic-teal), var(--psychedelic-purple), transparent)",
            filter: "blur(2px)",
            zIndex: 7
          }}
        />
      </div>
      
      {/* Community Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Add Starfield Background to the Community section - specified position */}
        <div className="absolute inset-0 overflow-hidden">
          <StarfieldBackground
            starCount={60}
            opacity={0.8}
            withNebulas={true}
          />
        </div>
        
        <PsychedelicBackground variant="grid" intensity={0.7} primaryColor="#9D00FF">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
      
      {/* Cosmic divider between sections - different color scheme */}
      <div className="cosmic-divider">
        <motion.div
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.97, 1.03, 0.97]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: "50%", 
            left: "50%", 
            width: "85%", 
            height: "2px",
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(90deg, transparent, var(--psychedelic-teal), var(--psychedelic-magenta), var(--psychedelic-teal), transparent)",
            filter: "blur(3px)",
            zIndex: 7
          }}
        />
      </div>
      
      {/* Meet Lenny Section */}
      <section className="py-24 relative overflow-hidden" ref={meetLennyRef}>
        {/* Add Starfield Background to the Meet Lenny section - specified position */}
        <div className="absolute inset-0 overflow-hidden">
          <StarfieldBackground
            starCount={70}
            opacity={0.8}
            withNebulas={true}
          />
        </div>
        
        <PsychedelicBackground variant="waves" intensity={0.8} primaryColor="#FF00FF" secondaryColor="#9D00FF">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={meetLennyInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="mx-auto"
              >
                <motion.div 
                  className="relative w-full max-w-5xl mx-auto p-8 rounded-lg bg-gradient-to-r from-purple-900/80 via-pink-800/80 to-purple-900/80 shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    boxShadow: [
                      "0 0 30px 5px rgba(255,0,255,0.5)",
                      "0 0 50px 10px rgba(255,0,255,0.6)",  
                      "0 0 30px 5px rgba(255,0,255,0.5)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    opacity: { duration: 1 }
                  }}
                >
                  <div className="relative">
                    <img 
                      src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/My-Story.png"
                      alt="My Story - Lenny Universe"
                      className="w-full rounded-md shadow-xl"
                      style={{ 
                        maxWidth: "100%",
                        filter: "drop-shadow(0 0 20px rgba(255,0,255,0.6))" 
                      }}
                    />
                    {/* Glowing overlay */}
                    <div 
                      className="absolute inset-0 rounded-md pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 30px rgba(255,0,255,0.7)",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={meetLennyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto text-center max-w-4xl mt-8"
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
      
      {/* Cosmic divider between sections - third variation */}
      <div className="cosmic-divider">
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            top: "50%", 
            left: "50%", 
            width: "90%", 
            height: "3px",
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(90deg, transparent, var(--psychedelic-indigo), var(--psychedelic-gold), var(--psychedelic-indigo), transparent)",
            filter: "blur(4px)",
            boxShadow: "0 0 20px rgba(226, 51, 255, 0.3)",
            zIndex: 7
          }}
        />
      </div>
      
      {/* CTA Section */}
      <section className="py-24 relative" ref={ctaRef}>
        {/* Add Starfield Background to the CTA section - specified position */}
        <div className="absolute inset-0 overflow-hidden">
          <StarfieldBackground
            starCount={50}
            opacity={0.7}
            withNebulas={false}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-deepSpace/20 to-deepSpace/50 z-1" />
        
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