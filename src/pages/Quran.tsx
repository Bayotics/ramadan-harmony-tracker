
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QuranReader from '../components/QuranReader';
import { Book } from 'lucide-react';

const Quran = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20">
        <Header title="Quran Reader" showBismillah />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-islamic-blue/10 mb-4">
            <Book size={24} className="text-islamic-blue" />
          </div>
          <h2 className="text-xl font-medium text-islamic-darkBlue mb-2">Read with Reflection</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            "Indeed, it is We who sent down the Quran and indeed, We will be its guardian."
            <span className="block text-xs mt-1">(Surah Al-Hijr, 15:9)</span>
          </p>
        </div>
        
        <div className="relative">
          <QuranReader />
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Quran;
