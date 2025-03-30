import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { motion } from 'framer-motion';

const HomePage = ({ dictionary }) => {
  const [randomWords, setRandomWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = useSearch(dictionary, searchQuery);

  useEffect(() => {
    // Get random words
    setRandomWords(
      dictionary
        .sort(() => 0.5 - Math.random())
        .slice(0, 6)
    );

    // Get unique categories
    const uniqueCategories = [...new Set(
      dictionary.flatMap(word => word.categories)
    )].slice(0, 6);
    setCategories(uniqueCategories);
  }, [dictionary]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />

        <div className="container mx-auto px-6 py-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 py-4">
              Urdu Dictionary
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Discover the beauty and richness of Urdu language
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a word..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-5 rounded-full text-gray-900 text-lg 
                  shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400
                  bg-white/90 backdrop-blur-sm"
              />
              {searchQuery && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute w-full mt-2 bg-white rounded-xl shadow-xl max-h-96 overflow-y-auto z-50"
                >
                  {searchResults.slice(0, 5).map((word) => (
                    <Link
                      key={word.id}
                      to={`/word/${word.id}`}
                      className="block px-6 py-4 hover:bg-blue-50 border-b last:border-0 transition-colors"
                    >
                      <div className="text-right">
                        <div className="text-xl font-semibold text-gray-800">{word.word}</div>
                        <div className="text-sm text-gray-600">{word.roman}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Statistics Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Total Words', value: dictionary.length, icon: '📚' },
            { label: 'Categories', value: categories.length, icon: '🏷️' },
            { label: 'Synonyms', value: new Set(dictionary.flatMap(word => word.synonyms)).size, icon: '🔄' },
            { label: 'Tags', value: new Set(dictionary.flatMap(word => word.tags)).size, icon: '🏷️' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition-transform"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Words Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Words
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {randomWords.map((word) => (
              <motion.div
                key={word.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <Link to={`/word/${word.id}`} className="block p-6">
                  <div className="text-right mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {word.word}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {word.roman}
                    </p>
                  </div>
                  <div className="text-gray-700 mb-4 line-clamp-2">
                    {word.definitions[0]}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {word.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <Link
                  to={`/category/${category}`}
                  className="block p-6 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {category}
                  </h3>
                  <p className="text-gray-600">
                    {dictionary.filter(word => word.categories.includes(category)).length} words
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;