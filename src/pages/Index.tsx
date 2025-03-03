
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PrayerTimes from '../components/PrayerTimes';
import Countdown from '../components/Countdown';
import HomeWidget from '../components/HomeWidget';
import DailyDua from '../components/DailyDua';
import { Moon, Sun, Book, Clock, Compass, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20 dark:to-gray-800/50">
        <Header title="Ramadan Timekeeper" showBismillah />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="prayer-section">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-islamic-blue/10 p-2 rounded-full mr-3">
                  <Clock size={20} className="text-islamic-blue" />
                </div>
                <h2 className="section-title text-foreground dark:text-gray-100">Today's Prayer Times</h2>
              </div>
              <div className="glass-card rounded-xl overflow-hidden border border-islamic-blue/20 shadow-lg">
                <PrayerTimes />
              </div>
            </div>
            
            <div className="ramadan-times-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              <Countdown type="suhoor" />
              <Countdown type="iftar" />
            </div>
          </div>
          
          <div className="info-section">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-islamic-gold/20 p-2 rounded-full mr-3">
                  <Compass size={20} className="text-islamic-gold" />
                </div>
                <h2 className="section-title text-foreground dark:text-gray-100">Quick Access</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Link to="/quran" className="glass-card rounded-xl p-5 text-center border border-islamic-blue/20 shadow-md hover:shadow-lg transition-all hover:bg-islamic-blue/5">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-islamic-blue/10 mb-3">
                    <Book size={22} className="text-islamic-blue" />
                  </div>
                  <h3 className="font-medium text-foreground dark:text-gray-100">Quran Reader</h3>
                </Link>
                
                <Link to="/qibla" className="glass-card rounded-xl p-5 text-center border border-islamic-blue/20 shadow-md hover:shadow-lg transition-all hover:bg-islamic-blue/5">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-islamic-blue/10 mb-3">
                    <Compass size={22} className="text-islamic-blue" />
                  </div>
                  <h3 className="font-medium text-foreground dark:text-gray-100">Qibla Finder</h3>
                </Link>
              </div>
              
              <div className="w-full">
                <HomeWidget />
              </div>
            </div>
            
            <div className="ramadan-info glass-card rounded-xl p-5 mb-6 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 dark:from-gray-800/90 dark:to-gray-900/80 shadow-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-1 bg-islamic-blue/10 p-2 rounded-full flex-shrink-0">
                  <Moon size={20} className="text-islamic-blue" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground dark:text-gray-100">Ramadan Reminder</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    The Prophet (ﷺ) said: "Whoever fasts during Ramadan out of sincere faith and hoping to attain Allah's rewards, then all his past sins will be forgiven."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="ramadan-tip glass-card rounded-xl p-5 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 dark:from-gray-800/90 dark:to-gray-900/80 shadow-lg">
              <div className="flex items-start">
                <div className="mr-3 mt-1 bg-islamic-gold/10 p-2 rounded-full flex-shrink-0">
                  <Sun size={20} className="text-islamic-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground dark:text-gray-100">Fasting Tip</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Stay hydrated during non-fasting hours by drinking plenty of water. Avoid caffeinated drinks as they can lead to dehydration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="daily-dua-section mt-8">
          <div className="flex items-center mb-4">
            <div className="bg-islamic-green/10 p-2 rounded-full mr-3">
              <Book size={20} className="text-islamic-green" />
            </div>
            <h2 className="section-title text-foreground dark:text-gray-100">Daily Duas</h2>
          </div>
          <DailyDua />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Made with love for the Ummah by Tahirah Shobaloju
          </p>
          <a 
            href="https://www.paypal.com/donate/?business=CB2Y4PCSEG3WU&no_recurring=0&currency_code=USD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Heart size={16} className="mr-2" />
            Support Ramadan Timekeeper
          </a>
          <p className="mt-2 text-xs text-muted-foreground dark:text-gray-400 max-w-lg mx-auto">
            Your donation helps provide meals for those fasting and improves this app for the global Muslim community. 
            Join us in spreading kindness and making prayer times more accessible.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
