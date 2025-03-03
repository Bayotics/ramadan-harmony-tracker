
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import DailyDua from '../components/DailyDua';
import { Heart, Search, Moon } from 'lucide-react';

const Duas = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20">
        <Header title="Daily Duas & Adhkar" showBismillah />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-islamic-blue/10 mb-4">
            <Heart size={24} className="text-islamic-blue" />
          </div>
          <h2 className="text-xl font-medium text-islamic-darkBlue mb-2">Strengthen Your Connection</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Essential supplications for Ramadan and daily life to enhance your spiritual journey
          </p>
        </div>
        
        <div className="search-box glass-card rounded-xl p-4 mb-6 border border-islamic-blue/20 bg-white/90 shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search duas..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-islamic-blue/20 focus:outline-none focus:ring-2 focus:ring-islamic-blue/30 bg-transparent"
            />
          </div>
        </div>
        
        <div className="duas-categories glass-card rounded-xl p-5 mb-8 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-islamic-blue/10 p-2 rounded-full mr-3 flex-shrink-0">
              <Moon size={16} className="text-islamic-blue" />
            </div>
            <h3 className="font-semibold text-islamic-darkBlue">Categories</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Morning & Evening', 'Fasting', 'Forgiveness', 'Protection', 'Gratitude', 'Guidance'].map((category) => (
              <button 
                key={category}
                className="bg-islamic-blue/10 hover:bg-islamic-blue/20 text-islamic-blue py-2 px-3 rounded-lg text-sm transition-colors border border-islamic-blue/10"
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
