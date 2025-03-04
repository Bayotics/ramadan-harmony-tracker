
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PermissionDeniedUI from './qibla/PermissionDeniedUI';
import LocationInfo from './qibla/LocationInfo';
import QiblaHeader from './qibla/QiblaHeader';
import QiblaCompass from './qibla/QiblaCompass';
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
    requestPermission,
    calibrateCompass,
    compassRotation,
    directionLabel
  } = useQiblaCompass();
  
  const isRTL = language === 'ar';
  
  return (
    <div className="qibla-finder flex flex-col items-center justify-center py-4">
      {permissionDenied && (
        <PermissionDeniedUI 
          permissionDenied={permissionDenied} 
          requestPermission={requestPermission} 
        />
      )}
      
      {!permissionDenied && (
        <div className="flex flex-col items-center max-w-lg w-full mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-green-500/20 dark:border-green-400/10 shadow-lg transform transition-all duration-300 animate-fade-in">
          <QiblaHeader qiblaAngle={qiblaAngle} />

          {!isCalibrating && (
            <QiblaCompass 
              qiblaAngle={qiblaAngle}
              compassHeading={compassHeading}
              compassRotation={compassRotation}
              directionLabel={directionLabel}
            />
          )}

          {isCalibrating && (
            <QiblaCompass 
              qiblaAngle={qiblaAngle}
              compassHeading={compassHeading}
              compassRotation={compassRotation}
              directionLabel={directionLabel}
              isCalibrating={true}
            />
          )}

          {userLocation && (
            <LocationInfo 
              userLocation={userLocation} 
              needsCalibration={needsCalibration}
              calibrateCompass={calibrateCompass}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QiblaFinder;
