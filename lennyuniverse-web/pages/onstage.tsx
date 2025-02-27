import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function OnStage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };
  
  const events = [
    {
      title: "Mindfulness Summit",
      date: "March 15, 2025",
      location: "New York, NY",
      description: "A comprehensive exploration of mindfulness practices for the modern world."
    },
    {
      title: "Inner Growth Conference",
      date: "April 22, 2025",
      location: "San Francisco, CA",
      description: "Connecting the dots between personal development and mindful living."
    },
    {
      title: "Meditation Retreat",
      date: "May 10-12, 2025",
      location: "Boulder, CO",
      description: "An immersive weekend of guided meditation and mindfulness practices."
    }
  ];
  
  return (
    <>
      <Head>
        <title>On Stage - Lenny Universe</title>
        <meta name="description" content="Experience Lenny's captivating public speaking on mindfulness and personal growth. Book Lenny for your next event." />
      </Head>
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-neonPink/10 to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text leading-tight">
                  Lenny On Stage
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Lenny's passion for mindfulness, authentic storytelling, and ability to make complex concepts accessible resonates with audiences of all ages. Invite Lenny to your event and add a spark of mindful curiosity to it.
                </p>
                <Link href="/contact">
                  <button className="px-8 py-3 bg-neonPink/20 border-2 border-neonPink rounded-md text-white font-semibold hover:bg-neonPink/30 neon-border transition-all duration-300">
                    Book Lenny
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/img7.png?fit=750%2C750&ssl=1"
                  alt="Lenny on stage"
                  width={500}
                  height={500}
                  className="rounded-lg z-10 relative"
                />
                <div className="absolute -inset-4 bg-neonPink rounded-lg opacity-10 blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Session Overview */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neonPink/5 to-neonPurple/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 rounded-2xl p-10 border border-neonPink/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6 neon-text">
                    Session Overview: Exploring the Inner Landscape
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    In this captivating session, Lenny will take you on a transformative journey of self-discovery. 'A Story of Looking Inward to Connect the Dots' delves into the profound connections between mindfulness, personal growth, and the wisdom we find within ourselves.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <span className="text-neonPink mr-2">&</span>
                      <span className="text-gray-300">Discover how mindfulness practices can illuminate your path</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonPink mr-2">&</span>
                      <span className="text-gray-300">Learn practical techniques for looking inward</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonPink mr-2">&</span>
                      <span className="text-gray-300">Understand how connecting your inner dots leads to fulfillment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-neonPink mr-2">&</span>
                      <span className="text-gray-300">Experience a guided meditation for clarity and insight</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <button className="px-8 py-3 bg-neonPink/20 border-2 border-neonPink rounded-md text-white font-semibold hover:bg-neonPink/30 neon-border transition-all duration-300">
                      Book Lenny
                    </button>
                  </Link>
                </div>
                <div className="relative">
                  <Image
                    src="https://i0.wp.com/lennyuniverse.com/wp-content/uploads/2023/11/My-Story.png?resize=768%2C355&ssl=1"
                    alt="My Story Graphic"
                    width={768}
                    height={355}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Upcoming Events */}
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
                className="text-3xl md:text-4xl font-bold mb-4 neon-purple-text"
              >
                Upcoming Events
              </motion.h2>
              <motion.div 
                variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
                className="w-24 h-1 bg-neonPurple mx-auto mb-8"
              />
              <motion.p
                variants={{ ...fadeIn, transition: { delay: 0.3, duration: 0.8 } }}
                className="text-xl text-gray-300 max-w-3xl mx-auto"
              >
                Join Lenny at these upcoming events and experience the power of mindfulness firsthand.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-black/30 p-8 rounded-lg border border-neonPurple/20 hover:border-neonPurple transition-all duration-500"
                >
                  <div className="mb-4 text-neonPurple">{event.date}</div>
                  <h3 className="text-xl font-semibold mb-2 neon-purple-text">{event.title}</h3>
                  <div className="text-gray-400 mb-4">{event.location}</div>
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  <Link href="/contact">
                    <button className="w-full px-4 py-2 bg-neonPurple/20 border border-neonPurple/40 rounded-md text-white font-medium hover:bg-neonPurple/30 transition-all duration-300">
                      Learn More
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
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
                className="text-3xl md:text-4xl font-bold mb-4 neon-teal-text"
              >
                What People Are Saying
              </motion.h2>
              <motion.div 
                variants={{ ...fadeIn, transition: { delay: 0.2, duration: 0.8 } }}
                className="w-24 h-1 bg-neonTeal mx-auto mb-8"
              />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black/40 rounded-lg p-8 border border-neonTeal/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-neonTeal/20 flex items-center justify-center mr-3">
                    <span className="text-lg neon-teal-text">J</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Jessica R.</div>
                    <div className="text-sm text-gray-400">Event Organizer, Mindfulness Summit</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "Lenny's session was the highlight of our conference. His ability to make complex mindfulness concepts accessible to everyone was remarkable. Attendees are still talking about his insights months later!"
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 rounded-lg p-8 border border-neonTeal/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-neonTeal/20 flex items-center justify-center mr-3">
                    <span className="text-lg neon-teal-text">M</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Michael T.</div>
                    <div className="text-sm text-gray-400">Corporate Wellness Director</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">
                  "We brought Lenny in for our corporate wellness retreat, and the impact was immediate. Our team reported feeling more centered, focused, and connected. His storytelling approach made mindfulness practices feel approachable and relevant."
                </p>
              </motion.div>
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
              className="bg-black/50 rounded-2xl p-10 border border-neonPink/30 text-center"
            >
              <h2 className="text-3xl font-bold mb-6 neon-text">
                Ready to bring Lenny to your event?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Whether you're planning a corporate workshop, a wellness retreat, or a conference, Lenny's engaging presentations on mindfulness and personal growth will leave your audience inspired and equipped with practical tools.
              </p>
              <Link href="/contact">
                <button className="px-8 py-3 bg-neonPink/20 border-2 border-neonPink rounded-md text-white font-semibold hover:bg-neonPink/30 neon-border transition-all duration-300">
                  Book Lenny Now
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}