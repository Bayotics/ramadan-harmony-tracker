
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QuranReader from '../components/QuranReader';
import { Book, BookOpen, Search, Bookmark, PlayCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Quran = () => {
  const [viewMode, setViewMode] = useState<'reading' | 'listening'>('reading');
  
  const handleFeatureClick = (feature: string) => {
    toast({
      title: feature,
      description: `${feature} feature selected`,
    });
  };
  
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20 dark:from-gray-900 dark:to-gray-900">
        <Header title="Quran Reader" showBismillah />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-islamic-blue/10 dark:bg-islamic-blue/20 mb-4">
            <Book size={24} className="text-islamic-blue dark:text-islamic-lightBlue" />
          </div>
          <h2 className="text-xl font-medium text-islamic-darkBlue dark:text-white mb-2">Read with Reflection</h2>
          <p className="text-muted-foreground dark:text-gray-300 max-w-md mx-auto">
            "Indeed, it is We who sent down the Quran and indeed, We will be its guardian."
            <span className="block text-xs mt-1">(Surah Al-Hijr, 15:9)</span>
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-islamic-blue/5 dark:bg-gray-800/90 p-1 rounded-full">
            <button
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors ${
                viewMode === 'reading' 
                  ? 'bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900' 
                  : 'text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20'
              }`}
              onClick={() => setViewMode('reading')}
            >
              <BookOpen size={18} />
              <span>Read</span>
            </button>
            
            <button
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors ${
                viewMode === 'listening' 
                  ? 'bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900' 
                  : 'text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20'
              }`}
              onClick={() => setViewMode('listening')}
            >
              <PlayCircle size={18} />
              <span>Listen</span>
            </button>
          </div>
        </div>
        
        <div className="quran-features flex flex-wrap justify-center gap-4 mb-8">
          <button 
            onClick={() => handleFeatureClick('Surah & Juz Navigation')}
            className="feature-card p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm border border-islamic-blue/10 dark:border-gray-700 flex items-center gap-2 hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 transition-colors cursor-pointer"
          >
            <BookOpen size={16} className="text-islamic-blue dark:text-islamic-lightBlue" />
            <span className="text-sm text-muted-foreground dark:text-gray-300">Surah & Juz Navigation</span>
          </button>
          
          <button 
            onClick={() => handleFeatureClick('Audio Recitation')}
            className="feature-card p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm border border-islamic-blue/10 dark:border-gray-700 flex items-center gap-2 hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 transition-colors cursor-pointer"
          >
            <PlayCircle size={16} className="text-islamic-blue dark:text-islamic-lightBlue" />
            <span className="text-sm text-muted-foreground dark:text-gray-300">Audio Recitation</span>
          </button>
          
          <button 
            onClick={() => handleFeatureClick('Bookmark Verses')}
            className="feature-card p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-sm border border-islamic-blue/10 dark:border-gray-700 flex items-center gap-2 hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 transition-colors cursor-pointer"
          >
            <Bookmark size={16} className="text-islamic-blue dark:text-islamic-lightBlue" />
            <span className="text-sm text-muted-foreground dark:text-gray-300">Bookmark Verses</span>
          </button>
        </div>
        
        <div className="relative">
          <QuranReader viewMode={viewMode} />
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Quran;
