import Link from 'next/link';
import { motion } from 'framer-motion';
import PsychedelicBackground from './psychedelic/PsychedelicBackground';
import NeonButton from './psychedelic/NeonButton';

export const Footer = () => {
  // Function to handle audio control button click
  const toggleAudio = () => {
    // Find background music element
    const audioElements = document.querySelectorAll('audio');
    if (audioElements && audioElements.length > 0) {
      const bgMusic = audioElements[0];
      if (bgMusic.paused) {
        bgMusic.play();
      } else {
        bgMusic.pause();
      }
    }
  };
  return (
    <footer className="relative z-10">
      <PsychedelicBackground variant="waves" intensity={0.4} animated={true} primaryColor="#FF00FF" secondaryColor="#9D00FF" tertiaryColor="#00FFFF">
        <div className="pt-16 pb-8 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col"
              >
                <h3 className="text-xl font-bold mb-4 neon-text-enhanced">Lenny Universe</h3>
                <p className="text-gray-300 mb-6">
                  Embark on a journey of blissful growth with our collective of mindful explorers.
                </p>
                <div className="flex space-x-4 mt-2">
                  <motion.a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, filter: "drop-shadow(0 0 8px #FF00FF)" }}
                    className="text-white hover:text-neonPink transition-colors duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, filter: "drop-shadow(0 0 8px #FF00FF)" }}
                    className="text-white hover:text-neonPink transition-colors duration-300"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 neon-purple-text-enhanced">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Mindfulness', path: '/mindfulness' },
                    { name: 'On Stage', path: '/onstage' },
                    { name: 'Blog', path: '/blog' },
                    { name: 'Contact', path: '/contact' },
                  ].map((item, index) => (
                    <motion.li key={item.name} whileHover={{ x: 5 }}>
                      <Link href={item.path} className="text-gray-300 hover:text-white hover:neon-purple-text transition-colors duration-300 flex items-center">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index + 0.3 }}
                        >
                          <span className="mr-2 text-neonPurple">✦</span> {item.name}
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 neon-teal-text-enhanced">Subscribe</h3>
                <p className="text-gray-300 mb-4">Join our newsletter for updates on mindfulness practices and events.</p>
                <form className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="px-4 py-2 glass-teal text-white focus:ring-2 focus:ring-neonTeal focus:outline-none rounded-md"
                  />
                  <NeonButton
                    color="teal"
                    size="sm"
                    variant="flux"
                  >
                    Subscribe
                  </NeonButton>
                </form>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-neonPurple/10 text-center text-gray-400"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <button 
                  onClick={toggleAudio}
                  className="flex items-center justify-center p-2 rounded-full bg-neonPurple/20 hover:bg-neonPurple/30 transition-all duration-300"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-neonPurple"
                  >
                    🔊
                  </motion.div>
                  <span className="ml-2 text-white text-sm">Toggle Music</span>
                </button>
              </div>
              <p>© {new Date().getFullYear()} Lenny Universe. All rights reserved.</p>
              <motion.p 
                className="mt-2 text-xs text-gray-500"
                animate={{
                  color: ["#FF00FF", "#9D00FF", "#00FFFF", "#FF00FF"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                ✦ Embark on a journey of blissful growth ✦
              </motion.p>
            </motion.div>
          </div>
        </div>
      </PsychedelicBackground>
    </footer>
  );
};