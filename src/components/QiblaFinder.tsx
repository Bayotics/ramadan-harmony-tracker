
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import QiblaCompass from './qibla/QiblaCompass';
import CalibrationUI from './qibla/CalibrationUI';
import PermissionDeniedUI from './qibla/PermissionDeniedUI';
import LocationInfo from './qibla/LocationInfo';
import QiblaHeader from './qibla/QiblaHeader';
import { useQiblaCompass } from '../hooks/useQiblaCompass';

const QiblaFinder: React.FC = () => {
  const { language } = useLanguage();
  const {
    qiblaAngle,
    compassHeading,
    userLocation,
    isCalibrating,
    needsCalibration,
    permissionDenied,
    compassRotation,
    requestPermission,
    calibrateCompass
  } = useQiblaCompass();
  
  const isRTL = language === 'ar';
  
  return (
    <div className="qibla-finder flex flex-col items-center justify-center py-4">
      <CalibrationUI isCalibrating={isCalibrating} />
      
      <PermissionDeniedUI 
        permissionDenied={permissionDenied} 
        requestPermission={requestPermission} 
      />
      
      {!isCalibrating && !permissionDenied && (
        <div className="flex flex-col items-center max-w-lg w-full mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-green-500/20 dark:border-green-400/10 shadow-lg transform transition-all duration-300 animate-fade-in">
          <QiblaHeader qiblaAngle={qiblaAngle} />

          <div className="py-4 relative">
            {/* Decorative circles */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-500/5 rounded-full filter blur-md"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-md"></div>
            
            <div className="relative z-10">
              <QiblaCompass 
                compassHeading={compassHeading} 
                compassRotation={compassRotation} 
              />
            </div>
          </div>

          <LocationInfo 
            userLocation={userLocation} 
            needsCalibration={needsCalibration}
            calibrateCompass={calibrateCompass}
          />
        </div>
      )}
    </div>
  );
};

export default QiblaFinder;
