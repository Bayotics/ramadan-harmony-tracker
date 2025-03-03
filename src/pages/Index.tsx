
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import PrayerTimes from '../components/PrayerTimes';
import Countdown from '../components/Countdown';
import HomeWidget from '../components/HomeWidget';
import DailyDua from '../components/DailyDua';
import { Moon, Sun } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="page-container">
        <Header title="Ramadan Timekeeper" showBismillah />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="prayer-section">
            <div className="mb-6">
              <h2 className="section-title">Today's Prayer Times</h2>
              <PrayerTimes />
            </div>
            
            <div className="ramadan-times-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              <Countdown type="suhoor" />
              <Countdown type="iftar" />
            </div>
          </div>
          
          <div className="info-section">
            <div className="mb-6">
              <h2 className="section-title">Home Screen Widget</h2>
              <div className="flex justify-center">
                <div className="w-64">
                  <HomeWidget />
                </div>
              </div>
            </div>
            
            <div className="ramadan-info glass-card rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <div className="mr-3 mt-1 text-islamic-blue">
                  <Moon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ramadan Reminder</h3>
                  <p className="text-sm">
                    The Prophet (ﷺ) said: "Whoever fasts during Ramadan out of sincere faith and hoping to attain Allah's rewards, then all his past sins will be forgiven."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="ramadan-tip glass-card rounded-xl p-4">
              <div className="flex items-start">
                <div className="mr-3 mt-1 text-islamic-gold">
                  <Sun size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Fasting Tip</h3>
                  <p className="text-sm">
                    Stay hydrated during non-fasting hours by drinking plenty of water. Avoid caffeinated drinks as they can lead to dehydration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="daily-dua-section mt-8">
          <h2 className="section-title">Daily Duas</h2>
          <DailyDua />
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Made with love for the Ummah by Tahirah Shobaloju
          </p>
          <a 
            href="#"
            className="inline-block mt-2 text-islamic-blue hover:text-islamic-darkBlue font-medium transition-colors"
          >
            Support Ramadan Timekeeper
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
