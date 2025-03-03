
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QiblaFinder from '../components/QiblaFinder';

const Qibla = () => {
  return (
    <Layout>
      <div className="page-container">
        <Header title="Qibla Finder" />
        
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            Point your device toward the direction shown below to find the Qibla
          </p>
        </div>
        
        <QiblaFinder />
        
        <div className="mt-8 glass-card rounded-xl p-5 bg-white/80 border border-islamic-blue/10 shadow-md">
          <h3 className="font-semibold mb-3 text-islamic-darkBlue">How to use the Qibla Finder</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Hold your device flat with the screen facing up</li>
            <li>Make sure you're away from electronic devices or metal objects that might interfere with the compass</li>
            <li>Allow the compass to calibrate by moving your device in a figure-8 pattern</li>
            <li>The blue arrow will point towards the Qibla direction</li>
          </ol>
          <div className="mt-4 p-3 bg-islamic-blue/10 rounded-lg text-xs text-center text-muted-foreground">
            <p>The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca, Saudi Arabia</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Qibla;
