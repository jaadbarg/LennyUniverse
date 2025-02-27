import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedLogo from './psychedelic/AnimatedLogo';
import NeonButton from './psychedelic/NeonButton';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 0.3]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Mindfulness', path: '/mindfulness' },
    { name: 'On Stage', path: '/onstage' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      className="fixed w-full z-50 transition-all duration-300"
      style={{ 
        background: navBackground,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottom: `1px solid rgba(255, 0, 255, ${borderOpacity.get()})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <AnimatedLogo
                src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/LU-Logo_Black.png?fit=1080%2C901&ssl=1"
                alt="Lenny Universe Logo"
                width={50}
                height={50}
                className="bg-white rounded-full p-1"
                glowColor="#FF00FF"
                rotationEnabled={false}
                pulseEnabled={true}
                hueRotateEnabled={false}
              />
              <motion.span 
                className="ml-3 text-xl font-bold hidden sm:block"
                animate={{ 
                  textShadow: [
                    "0 0 5px #FF00FF, 0 0 10px #FF00FF",
                    "0 0 10px #FF00FF, 0 0 15px #FF00FF",
                    "0 0 5px #FF00FF, 0 0 10px #FF00FF"
                  ]
                }}
                transition={{ 
                  duration:
                  4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                Lenny Universe
              </motion.span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.path}
              >
                <motion.span 
                  className="text-white hover:text-neonPink transition-colors duration-300 relative"
                  whileHover={{ 
                    color: "#FF00FF",
                    textShadow: "0 0 8px #FF00FF, 0 0 12px #FF00FF" 
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 * index,
                    ease: "easeOut"
                  }}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-neonPink"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.span>
              </Link>
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <NeonButton 
                href="/contact" 
                color="pink"
                variant="flux"
                size="sm"
              >
                Book Lenny
              </NeonButton>
            </motion.div>
          </div>
          
          {/* Mobile nav button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                color: "#FF00FF",
                textShadow: "0 0 8px #FF00FF"
              }}
            >
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile nav panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden glass-purple"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link 
                  href={item.path} 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:neon-text"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.span whileHover={{ 
                    color: "#FF00FF",
                    textShadow: "0 0 8px #FF00FF, 0 0 12px #FF00FF" 
                  }}>
                    {item.name}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
              className="px-3 py-2"
            >
              <NeonButton 
                href="/contact" 
                color="pink"
                variant="flux"
                size="sm"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                Book Lenny
              </NeonButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};