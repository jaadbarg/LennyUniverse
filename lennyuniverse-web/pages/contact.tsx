import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    eventType: 'speaking'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        eventType: 'speaking'
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };
  
  return (
    <>
      <Head>
        <title>Contact - Lenny Universe</title>
        <meta name="description" content="Get in touch with Lenny for speaking engagements, workshops, or any questions about mindfulness and personal growth." />
      </Head>
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-neonPurple/10 to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-purple-text">
                Contact Us
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Reach out to book Lenny for your next event, ask questions about mindfulness practices, or just connect with our community.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-black/30 p-8 rounded-lg border border-neonPurple/20">
                  <h2 className="text-2xl font-bold mb-6 neon-purple-text">Get in Touch</h2>
                  
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-neonPurple/20 flex items-center justify-center mb-6 mx-auto">
                        <span className="text-3xl neon-purple-text"></span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 neon-purple-text">Thank You!</h3>
                      <p className="text-gray-300">
                        Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="name" className="block text-white mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-white mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="eventType" className="block text-white mb-2">Inquiry Type</label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                        >
                          <option value="speaking">Speaking Engagement</option>
                          <option value="workshop">Workshop/Retreat</option>
                          <option value="collaboration">Collaboration</option>
                          <option value="general">General Inquiry</option>
                        </select>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                        />
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-white mb-2">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-6 py-3 bg-neonPurple/20 border-2 border-neonPurple rounded-md text-white font-semibold hover:bg-neonPurple/30 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-black/30 p-8 rounded-lg border border-neonTeal/20 mb-8">
                  <h2 className="text-2xl font-bold mb-6 neon-teal-text">Book Lenny</h2>
                  <p className="text-gray-300 mb-6">
                    Interested in having Lenny speak at your event? Fill out the form with details about your event, including:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-neonTeal mr-2">&</span>
                      <span className="text-gray-300">Event name and type</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonTeal mr-2">&</span>
                      <span className="text-gray-300">Date and location</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonTeal mr-2">&</span>
                      <span className="text-gray-300">Expected audience size and demographics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonTeal mr-2">&</span>
                      <span className="text-gray-300">Specific topics you'd like Lenny to address</span>
                    </li>
                  </ul>
                  <p className="text-gray-300">
                    We'll get back to you within 48 hours with availability and more information.
                  </p>
                </div>
                
                <div className="bg-black/30 p-8 rounded-lg border border-neonPink/20">
                  <h2 className="text-2xl font-bold mb-6 neon-text">Connect With Us</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-neonPink/20 flex items-center justify-center mr-3 shrink-0">
                        <span className="text-neonPink">	</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Email</div>
                        <a href="mailto:hello@lennyuniverse.com" className="text-gray-300 hover:text-neonPink transition-colors duration-300">
                          hello@lennyuniverse.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-neonPink/20 flex items-center justify-center mr-3 shrink-0">
                        <span className="text-neonPink">=ñ</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Social Media</div>
                        <div className="flex space-x-4 mt-2">
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neonPink transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neonPink transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-neonPink/20 flex items-center justify-center mr-3 shrink-0">
                        <span className="text-neonPink">=Í</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">Based In</div>
                        <div className="text-gray-300">San Francisco, California</div>
                        <div className="text-gray-400 text-sm mt-1">Available for virtual events worldwide</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 neon-text"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.div 
                variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
                className="w-24 h-1 bg-neonPink mx-auto mb-8"
              />
            </motion.div>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black/30 p-6 rounded-lg border border-neonPink/20"
              >
                <h3 className="text-xl font-semibold mb-3 neon-text">What types of events does Lenny speak at?</h3>
                <p className="text-gray-300">
                  Lenny speaks at a variety of events including corporate workshops, wellness retreats, conferences, universities, and private gatherings. His talks can be customized for audiences of all sizes and backgrounds.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/30 p-6 rounded-lg border border-neonPink/20"
              >
                <h3 className="text-xl font-semibold mb-3 neon-text">How far in advance should I book?</h3>
                <p className="text-gray-300">
                  We recommend booking at least 2-3 months in advance for the best availability, especially for larger events. However, we always try to accommodate last-minute requests when possible.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/30 p-6 rounded-lg border border-neonPink/20"
              >
                <h3 className="text-xl font-semibold mb-3 neon-text">Does Lenny offer virtual presentations?</h3>
                <p className="text-gray-300">
                  Yes! Lenny offers engaging virtual presentations that maintain the interactive and transformative quality of his in-person events. These are perfect for global audiences or organizations with remote teams.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/30 p-6 rounded-lg border border-neonPink/20"
              >
                <h3 className="text-xl font-semibold mb-3 neon-text">How can I join the Lenny Universe community?</h3>
                <p className="text-gray-300">
                  You can join our community by subscribing to our newsletter, following us on social media, or attending one of our events. We also host regular virtual gatherings for our community members.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}