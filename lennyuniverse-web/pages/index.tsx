import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };
  
  return (
    <div className="relative">
      {/* Dynamic light effect that follows cursor */}
      <div 
        className="fixed pointer-events-none opacity-20 mix-blend-screen"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(157, 0, 255, 0.4), transparent 40%)`,
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 neon-text">
                Your journey of <br />
                <span className="neon-purple-text">blissful growth</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Embark on a journey of blissful growth.
              </p>
              <Link href="/contact" className="inline-block">
                <button className="px-8 py-3 bg-neonPink/20 border-2 border-neonPink rounded-md text-white font-semibold hover:bg-neonPink/30 neon-border transition-all duration-300">
                  Join Our Community
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-full overflow-hidden max-w-sm mx-auto float-animation">
                <Image
                  src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/img7.png?fit=750%2C750&ssl=1"
                  alt="Lenny Universe"
                  width={500}
                  height={500}
                  className="rounded-full"
                />
                <div className="absolute inset-0 rounded-full neon-border" />
              </div>
              <div className="absolute -inset-4 bg-neonPurple rounded-full opacity-10 blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 neon-teal-text"
            >
              We're a collective of mindful explorers
            </motion.h2>
            <motion.div 
              variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
              className="w-24 h-1 bg-neonTeal mx-auto mb-8"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-black/30 p-8 rounded-lg border border-neonPink/20 hover:border-neonPink transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-neonPink/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl neon-text">&</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center neon-text">We're united by a longing for personal fulfillment</h3>
              <p className="text-gray-300 text-center">
                Our community is built on the shared desire to grow, learn, and find true fulfillment through mindfulness practices.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/30 p-8 rounded-lg border border-neonPurple/20 hover:border-neonPurple transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-neonPurple/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl neon-purple-text">&</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center neon-purple-text">We share stories and grow together</h3>
              <p className="text-gray-300 text-center">
                Through sharing our journeys, challenges, and victories, we create a space for authentic growth and connection.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/30 p-8 rounded-lg border border-neonTeal/20 hover:border-neonTeal transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-neonTeal/20 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl neon-teal-text">&</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center neon-teal-text">We celebrate curiosity</h3>
              <p className="text-gray-300 text-center">
                A curious mind is an open mind. We encourage questions, exploration, and the joy of discovering new perspectives.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello there! Welcome to our vibrant community where curiosity isn't just welcomed, it's celebrated. 
              We're embarking on a shared journey of mindfulness and personal growth, and we'd love for you to join us.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Meet Lenny Section */}
      <section className="py-20 relative bg-gradient-to-b from-black to-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <Image
                  src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/img7.png?fit=750%2C750&ssl=1"
                  alt="Lenny"
                  width={500}
                  height={500}
                  className="rounded-lg z-10 relative"
                />
                <div className="absolute -inset-4 bg-neonPurple rounded-lg opacity-10 blur-3xl -z-10" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 neon-purple-text">
                Meet Lenny
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Hi, I'm Lenny! Attorney. Artist. Advocate. Like you, I'm on this exciting journey of mindfulness and personal growth. 
                My journey is your journey, and together, we'll learn, grow, and transform.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                I believe in the power of mindfulness to transform our lives and our communities. Through authentic connection and 
                intentional practice, we can discover depths of joy and fulfillment we never knew existed.
              </p>
              <div className="mt-8">
                <Link href="/onstage">
                  <button className="px-8 py-3 bg-neonPurple/20 border-2 border-neonPurple rounded-md text-white font-semibold hover:bg-neonPurple/30 transition-all duration-300">
                    Book Lenny
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-neonPink/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-black/50 rounded-2xl p-10 border border-neonPink/30"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 neon-text">
                Ready to start your journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join our community of mindful explorers and embark on your own journey of blissful growth. 
                Connect with like-minded individuals, learn from Lenny's experiences, and discover the transformative power of mindfulness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-3 bg-neonPink/20 border-2 border-neonPink rounded-md text-white font-semibold hover:bg-neonPink/30 neon-border transition-all duration-300">
                    Join Our Community
                  </button>
                </Link>
                <Link href="/mindfulness">
                  <button className="px-8 py-3 bg-transparent border-2 border-white/30 rounded-md text-white font-semibold hover:border-white/60 transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}