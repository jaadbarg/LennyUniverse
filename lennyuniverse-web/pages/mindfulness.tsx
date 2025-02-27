import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Mindfulness() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };
  
  const resources = [
    {
      title: "Tao Te Ching",
      author: "By Lao-Tzu. Translated by Red Pine with selected commentaries from the past 2,000 years.",
      image: "https://m.media-amazon.com/images/I/71jqGFrfISL._AC_UF1000,1000_QL80_.jpg",
      link: "https://www.amazon.com/Lao-tzus-Taoteching-Lao-Tzu/dp/1556592906/"
    },
    {
      title: "Zen Mind, Beginner's Mind",
      author: "By Shunryu Suzuki. Informal talks on Zen meditation and practice.",
      image: "https://m.media-amazon.com/images/I/71cTI-EBAFL._AC_UF1000,1000_QL80_.jpg",
      link: "https://www.amazon.com/Zen-Mind-Beginners-Informal-Meditation/dp/1590308492/"
    },
    {
      title: "The Power of Now",
      author: "By Eckhart Tolle. A guide to spiritual enlightenment.",
      image: "https://m.media-amazon.com/images/I/714FbKtXS+L._AC_UF1000,1000_QL80_.jpg",
      link: "https://www.amazon.com/Power-Now-Guide-Spiritual-Enlightenment/dp/1577314808/"
    }
  ];
  
  return (
    <>
      <Head>
        <title>Mindfulness - Lenny Universe</title>
        <meta name="description" content="Discover the transformative power of mindfulness with Lenny Universe. Learn how mindfulness can help you connect the dots in your life." />
      </Head>
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-neonPurple/10 to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-8 neon-purple-text leading-tight">
                Mindfulness: The Path to Inner Clarity
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover how the practice of mindfulness can transform your relationship with yourself and the world around you.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Quote Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neonPurple/5 to-neonTeal/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 rounded-2xl p-10 border border-neonPurple/30 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-6 neon-purple-text">
                  Mindfulness encouraged me to truly look inward to connect the dots
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  It was like a ray of light breaking through the clouds. It invited me to look inward, to explore the depths of my own thoughts and emotions. It encouraged me to connect the dots of my life in ways I had never imagined.
                </p>
                <p className="text-xl text-gray-300 mb-2 italic">
                  So if you're having trouble connecting the dots, a good place to start is to look inward.
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="w-20 h-1 bg-neonTeal rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Practices Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Mindfulness Practices
              </motion.h2>
              <motion.div 
                variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
                className="w-24 h-1 bg-neonTeal mx-auto mb-8"
              />
              <motion.p
                variants={{ ...fadeIn, transition: { delay: 0.3, duration: 0.8 } }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Explore these simple yet powerful practices to bring mindfulness into your daily life.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black/30 p-8 rounded-lg border border-neonTeal/20 hover:border-neonTeal transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-neonTeal/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl neon-teal-text">&</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center neon-teal-text">Mindful Breathing</h3>
                <p className="text-gray-300 text-center">
                  Take a few minutes each day to focus solely on your breath. Notice the sensation of inhaling and exhaling, the rise and fall of your chest, and the feeling of air moving through your nostrils.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/30 p-8 rounded-lg border border-neonPink/20 hover:border-neonPink transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-neonPink/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl neon-text">&</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center neon-text">Body Scan</h3>
                <p className="text-gray-300 text-center">
                  Systematically bringing attention to different parts of your body, noticing sensations without judgment. This practice helps ground you in the present and develop a deeper connection with your physical self.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/30 p-8 rounded-lg border border-neonPurple/20 hover:border-neonPurple transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-neonPurple/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl neon-purple-text">&</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center neon-purple-text">Mindful Observation</h3>
                <p className="text-gray-300 text-center">
                  Choose an object and focus on it intently for one minute. Notice its colors, shapes, textures, and other qualities. This practice strengthens your ability to pay attention to the present moment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-16 bg-gradient-to-b from-black/20 to-black/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 neon-text"
              >
                Helpful Resources
              </motion.h2>
              <motion.div 
                variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
                className="w-24 h-1 bg-neonPink mx-auto mb-8"
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-black/40 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-neonPink/20 transition-all duration-500"
                >
                  <div className="h-64 relative">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 neon-text">{resource.title}</h3>
                    <p className="text-gray-300 mb-4">{resource.author}</p>
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-neonPink hover:text-white transition-colors duration-300"
                    >
                      Learn more ’
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-black/50 rounded-2xl p-10 border border-neonPurple/30 text-center"
            >
              <h2 className="text-3xl font-bold mb-6 neon-purple-text">
                Start Your Mindfulness Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to explore the transformative power of mindfulness? Join our community or book a session with Lenny to dive deeper into these practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-3 bg-neonPurple/20 border-2 border-neonPurple rounded-md text-white font-semibold hover:bg-neonPurple/30 transition-all duration-300">
                    Contact Us
                  </button>
                </Link>
                <Link href="/onstage">
                  <button className="px-8 py-3 bg-transparent border-2 border-neonTeal/70 rounded-md text-white font-semibold hover:bg-neonTeal/20 transition-all duration-300">
                    Book a Session
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}