
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QiblaFinder from '../components/QiblaFinder';
import { Compass, Info } from 'lucide-react';

const Qibla = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-background to-islamic-cream/20">
        <Header title="Qibla Finder" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-islamic-blue/10 mb-4">
            <Compass size={24} className="text-islamic-blue" />
          </div>
          <h2 className="text-xl font-medium text-islamic-darkBlue mb-2">Find Your Direction</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer
          </p>
        </div>
        
        <div className="relative">
          <QiblaFinder />
          
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
        
        <div className="mt-10 glass-card rounded-xl p-6 bg-white/90 border border-islamic-blue/20 shadow-lg max-w-lg mx-auto">
          <div className="flex items-start space-x-4">
            <div className="bg-islamic-blue/10 p-2 rounded-full flex-shrink-0 mt-1">
              <Info size={20} className="text-islamic-blue" />
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-islamic-darkBlue">How to use the Qibla Finder</h3>
              <ol className="list-decimal pl-5 space-y-3 text-sm">
                <li className="text-gray-700 dark:text-gray-300">Hold your device flat with the screen facing up, away from electronic devices or metal objects</li>
                <li className="text-gray-700 dark:text-gray-300">Allow the compass to calibrate by moving your device in a figure-8 pattern</li>
                <li className="text-gray-700 dark:text-gray-300">When ready, the blue needle will point towards the Qibla direction</li>
                <li className="text-gray-700 dark:text-gray-300">For best results, use in an open area away from interference</li>
              </ol>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-lg text-center border border-islamic-blue/10 bg-gradient-to-r from-islamic-blue/5 to-islamic-cream/40">
            <p className="text-sm text-islamic-darkBlue font-medium">
              The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca, Saudi Arabia
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Qibla;
