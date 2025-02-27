import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <motion.h1 
          className="text-5xl font-bold mb-6 neon-purple-text-enhanced"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          404 - Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Oops! It seems you've ventured into the unknown. The page you are looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/">
            <button className="px-6 py-3 bg-neonPurple/20 border-2 border-neonPurple rounded-md text-white font-semibold hover:bg-neonPurple/30 transition-all duration-300">
              Return Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}