
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import DailyDua from '../components/DailyDua';
import { Heart, Search, Moon } from 'lucide-react';

const Duas = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    'Morning & Evening', 
    'Fasting', 
    'Forgiveness', 
    'Protection', 
    'Gratitude', 
    'Guidance'
  ];
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };
  
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20 dark:from-gray-900 dark:to-gray-800/50">
        <Header title="Daily Duas & Adhkar" showBismillah />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-islamic-blue/10 mb-4">
            <Heart size={24} className="text-islamic-blue" />
          </div>
          <h2 className="text-xl font-medium text-islamic-darkBlue dark:text-gray-100 mb-2">Strengthen Your Connection</h2>
          <p className="text-muted-foreground dark:text-gray-300 max-w-md mx-auto">
            Essential supplications for Ramadan and daily life to enhance your spiritual journey
          </p>
        </div>
        
        <div className="search-box glass-card rounded-xl p-4 mb-6 border border-islamic-blue/20 bg-white/90 dark:bg-gray-800/90 dark:border-gray-700/30 shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search duas..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-islamic-blue/20 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-islamic-blue/30 dark:focus:ring-islamic-blue/50 bg-transparent dark:text-gray-100"
            />
          </div>
        </div>
        
        <div className="duas-categories glass-card rounded-xl p-5 mb-8 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 dark:from-gray-800/90 dark:to-gray-900/80 dark:border-gray-700/30 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-islamic-blue/10 p-2 rounded-full mr-3 flex-shrink-0">
              <Moon size={16} className="text-islamic-blue" />
            </div>
            <h3 className="font-semibold text-islamic-darkBlue dark:text-gray-100">Categories</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`transition-colors border px-3 py-2 rounded-lg text-sm
                  ${selectedCategory === category 
                    ? 'bg-islamic-blue text-white dark:bg-islamic-blue dark:text-white border-islamic-blue' 
                    : 'bg-islamic-blue/10 hover:bg-islamic-blue/20 text-islamic-blue dark:text-islamic-lightBlue border-islamic-blue/10 dark:border-islamic-blue/30'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <DailyDua />
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Duas;
