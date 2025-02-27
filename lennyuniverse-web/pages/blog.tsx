import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

// Sample blog data
const sampleBlogs = [
  {
    id: 1,
    title: "The Inner Journey: Finding Peace in Chaos",
    excerpt: "Discover how mindfulness practices can help you maintain inner calm even in life's most turbulent moments.",
    date: "February 25, 2025",
    author: "Lenny",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1964&auto=format&fit=crop",
    slug: "#"
  },
  {
    id: 2,
    title: "Connecting the Dots: How Mindfulness Reveals Life's Patterns",
    excerpt: "Explore how regular mindfulness practice can help you recognize meaningful patterns in your life journey.",
    date: "February 18, 2025",
    author: "Lenny",
    category: "Personal Growth",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=2093&auto=format&fit=crop",
    slug: "#"
  },
  {
    id: 3,
    title: "The Art of Presence: Being Fully Where You Are",
    excerpt: "Learn practical techniques to cultivate presence in your daily life and experience the power of now.",
    date: "February 10, 2025",
    author: "Lenny",
    category: "Mindfulness",
    image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1974&auto=format&fit=crop",
    slug: "#"
  },
  {
    id: 4,
    title: "Mindful Communication: Deepening Your Connections",
    excerpt: "Discover how mindfulness principles can transform your interactions and create more meaningful relationships.",
    date: "February 5, 2025",
    author: "Lenny",
    category: "Relationships",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop",
    slug: "#"
  },
  {
    id: 5,
    title: "The Science Behind Mindfulness: What Research Tells Us",
    excerpt: "Explore the growing body of scientific evidence supporting the benefits of mindfulness practices.",
    date: "January 28, 2025",
    author: "Lenny",
    category: "Science",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop",
    slug: "#"
  },
  {
    id: 6,
    title: "Mindfulness for Creativity: Opening the Channels of Inspiration",
    excerpt: "Learn how mindfulness practices can enhance your creative thinking and artistic expression.",
    date: "January 15, 2025",
    author: "Lenny",
    category: "Creativity",
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2070&auto=format&fit=crop",
    slug: "#"
  }
];

// All categories from blog posts
const allCategories = ["All", ...new Set(sampleBlogs.map(blog => blog.category))];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter blogs based on category and search query
  const filteredBlogs = sampleBlogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <>
      <Head>
        <title>Blog - Lenny Universe</title>
        <meta name="description" content="Explore mindfulness articles, personal growth stories, and spiritual insights on the Lenny Universe blog." />
      </Head>
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-neonTeal/10 to-transparent -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-teal-text">
                The Mindful Explorer Blog
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Stories, insights, and practical wisdom to support your journey of mindfulness and personal growth.
              </p>
              
              {/* Search and Filter */}
              <div className="mt-8 mb-12">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full px-4 py-2 bg-black/30 border border-neonTeal/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonTeal text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="md:w-40">
                    <select
                      className="w-full px-4 py-2 bg-black/30 border border-neonTeal/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonTeal text-white"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {allCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Blog Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-black/30 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-neonTeal/20 transition-all duration-500 border border-neonTeal/10 hover:border-neonTeal/30"
                  >
                    <div className="h-48 relative">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-neonTeal">{blog.category}</span>
                        <span className="text-sm text-gray-400">{blog.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 neon-text hover:neon-teal-text transition-all duration-300">
                        <Link href={blog.slug}>{blog.title}</Link>
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">By {blog.author}</span>
                        <Link 
                          href={blog.slug}
                          className="text-neonTeal hover:text-white transition-colors duration-300"
                        >
                          Read more ’
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-4 neon-purple-text">No articles found</h3>
                <p className="text-gray-300 mb-6">Try adjusting your search criteria or exploring a different category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 bg-neonPurple/20 border border-neonPurple rounded-md text-white hover:bg-neonPurple/30 transition-all duration-300"
                >
                  View all articles
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-black/50 rounded-2xl p-10 border border-neonPurple/30"
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 neon-purple-text">
                  Subscribe to our newsletter
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get the latest articles, mindfulness tips, and event updates delivered straight to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="flex-1 px-4 py-3 bg-black/30 border border-neonPurple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-neonPurple text-white"
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-neonPurple/20 border border-neonPurple text-white rounded-md hover:bg-neonPurple/30 transition-colors duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-400 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}