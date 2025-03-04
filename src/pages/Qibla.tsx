
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QiblaFinder from '../components/QiblaFinder';
import { Compass, Info, Navigation, MapPin, GlobeIcon, History } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Qibla = () => {
  const { language, getTranslation } = useLanguage();
  const isRTL = language === 'ar';
  
  return (
    <Layout>
      <div className={`page-container bg-gradient-to-b from-background via-islamic-cream/10 to-islamic-blue/5 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header title={getTranslation("qibla")} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-islamic-blue/20 to-islamic-green/20 mb-4 border border-islamic-gold/20 shadow-inner shadow-islamic-blue/10">
            <Compass size={28} className="text-islamic-blue" />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-islamic-blue to-islamic-green bg-clip-text text-transparent mb-2">
            {getTranslation("Find Your Direction")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {getTranslation(
              "Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer"
            )}
          </p>
        </div>
        
        <div className="relative">
          <QiblaFinder />
          
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
        
        <div className="mt-10 glass-card rounded-xl p-6 bg-gradient-to-b from-white/90 to-islamic-cream/80 border border-islamic-gold/30 shadow-lg max-w-lg mx-auto">
          <div className="flex items-start space-x-4 rtl:space-x-reverse">
            <div className="bg-gradient-to-br from-islamic-blue/20 to-islamic-green/20 p-3 rounded-full flex-shrink-0 mt-1 border border-islamic-gold/20">
              <Info size={22} className="text-islamic-blue" />
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-lg bg-gradient-to-r from-islamic-darkBlue to-islamic-blue bg-clip-text text-transparent">
                {getTranslation("How to use the Qibla Finder")}
              </h3>
              <ol className="list-decimal pl-5 rtl:pr-5 rtl:pl-0 space-y-3 text-sm">
                <li className="text-gray-700 dark:text-gray-300">
                  {getTranslation(
                    "Hold your device flat with the screen facing up, away from electronic devices or metal objects"
                  )}
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  {getTranslation(
                    "Allow the compass to calibrate by moving your device in a figure-8 pattern"
                  )}
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  {getTranslation(
                    "When ready, the blue needle will point towards the Qibla direction"
                  )}
                </li>
                <li className="text-gray-700 dark:text-gray-300">
                  {getTranslation(
                    "For best results, use in an open area away from interference"
                  )}
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-5 p-5 rounded-lg text-center border border-islamic-gold/20 bg-gradient-to-r from-islamic-blue/5 to-islamic-green/5">
            <div className="flex items-center justify-center mb-2">
              <MapPin size={16} className={`${isRTL ? 'ml-1 mr-0' : 'mr-1'} text-islamic-blue`} />
              <span className="text-sm font-medium text-islamic-darkBlue">
                {getTranslation("Mecca, Saudi Arabia")}
              </span>
            </div>
            <p className="text-sm text-islamic-darkBlue">
              {getTranslation(
                "The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca"
              )}
            </p>
          </div>
          
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <div className="bg-islamic-blue/10 px-4 py-2 rounded-full text-sm text-islamic-blue flex items-center">
              <Navigation size={14} className={`${isRTL ? 'ml-1.5 mr-0' : 'mr-1.5'}`} />
              <span>
                {getTranslation(
                  "Compass accuracy depends on your device's sensors"
                )}
              </span>
            </div>
            
            <div className="bg-islamic-green/10 px-4 py-2 rounded-full text-sm text-islamic-green flex items-center">
              <GlobeIcon size={14} className={`${isRTL ? 'ml-1.5 mr-0' : 'mr-1.5'}`} />
              <span>
                {getTranslation(
                  "The Kaaba is located at 21.4225°N, 39.8262°E"
                )}
              </span>
            </div>
            
            <div className="bg-islamic-gold/10 px-4 py-2 rounded-full text-sm text-islamic-darkGold flex items-center">
              <History size={14} className={`${isRTL ? 'ml-1.5 mr-0' : 'mr-1.5'}`} />
              <span>
                {getTranslation(
                  "The first Qibla was Al-Aqsa Mosque before changing to the Kaaba"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Qibla;
