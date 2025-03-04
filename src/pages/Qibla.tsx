
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
      <div className={`page-container bg-gradient-to-b from-gray-900 via-purple-950/90 to-indigo-950 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header title={getTranslation("qibla")} />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 mb-4 border border-purple-300/30 shadow-inner shadow-purple-300/20">
            <Compass size={32} className="text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-2">
            {getTranslation("Find Your Direction")}
          </h2>
          <p className="text-gray-300 max-w-md mx-auto">
            {getTranslation(
              "Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer"
            )}
          </p>
        </div>
        
        <div className="relative">
          <QiblaFinder />
          
          <div className="absolute top-0 w-full h-full pointer-events-none opacity-10 bg-pattern z-0"></div>
        </div>
        
        <div className="mt-10 rounded-xl p-6 bg-gray-800/90 border border-gray-600/20 shadow-lg max-w-lg mx-auto text-white">
          <div className="flex items-start space-x-4 rtl:space-x-reverse">
            <div className="bg-gray-700/80 p-3 rounded-full flex-shrink-0 mt-1 border border-gray-500/20">
              <Info size={22} className="text-purple-300" />
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-lg text-gray-200">
                {getTranslation("How to use the Qibla Finder")}
              </h3>
              <ol className="list-decimal pl-5 rtl:pr-5 rtl:pl-0 space-y-3 text-sm bg-gray-800/90 p-4 rounded-lg">
                <li className="text-gray-200">
                  {getTranslation(
                    "Hold your device flat with the screen facing up, away from electronic devices or metal objects"
                  )}
                </li>
                <li className="text-gray-200">
                  {getTranslation(
                    "Allow the compass to calibrate by moving your device in a figure-8 pattern"
                  )}
                </li>
                <li className="text-gray-200">
                  {getTranslation(
                    "When ready, the red needle will point towards the Qibla direction"
                  )}
                </li>
                <li className="text-gray-200">
                  {getTranslation(
                    "For best results, use in an open area away from interference"
                  )}
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-5 p-5 rounded-lg text-center border border-gray-600/20 bg-gray-900/80">
            <div className="flex items-center justify-center mb-2">
              <MapPin size={16} className={`${isRTL ? 'ml-1 mr-0' : 'mr-1'} text-purple-300`} />
              <span className="text-sm font-medium text-gray-200">
                {getTranslation("Mecca, Saudi Arabia")}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              {getTranslation(
                "The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca"
              )}
            </p>
          </div>
          
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <div className="bg-gray-700/80 px-4 py-2 rounded-full text-sm text-gray-200 flex items-center">
              <Navigation size={14} className={`${isRTL ? 'ml-1.5 mr-0' : 'mr-1.5'}`} />
              <span>
                {getTranslation(
                  "Compass accuracy depends on your device's sensors"
                )}
              </span>
            </div>
            
            <div className="bg-gray-700/80 px-4 py-2 rounded-full text-sm text-gray-200 flex items-center">
              <GlobeIcon size={14} className={`${isRTL ? 'ml-1.5 mr-0' : 'mr-1.5'}`} />
              <span>
                {getTranslation(
                  "The Kaaba is located at 21.4225°N, 39.8262°E"
                )}
              </span>
            </div>
            
            <div className="bg-gray-700/80 px-4 py-2 rounded-full text-sm text-gray-200 flex items-center">
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
