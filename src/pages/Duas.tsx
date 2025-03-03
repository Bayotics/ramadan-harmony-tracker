
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import DailyDua from '../components/DailyDua';

const Duas = () => {
  return (
    <Layout>
      <div className="page-container">
        <Header title="Daily Duas & Adhkar" showBismillah />
        
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Essential supplications for Ramadan and daily life
          </p>
        </div>
        
        <div className="duas-categories glass-card rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Morning & Evening', 'Fasting', 'Forgiveness', 'Protection', 'Gratitude', 'Guidance'].map((category) => (
              <button 
                key={category}
                className="bg-islamic-blue/10 hover:bg-islamic-blue/20 text-islamic-blue py-2 px-3 rounded-lg text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <DailyDua />
      </div>
    </Layout>
  );
};

export default Duas;
