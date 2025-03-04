
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
        <div className="flex flex-col items-center max-w-lg w-full mx-auto backdrop-blur-sm bg-gradient-to-b from-gray-800/40 to-gray-900/50 p-6 rounded-2xl border border-emerald-600/20 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)]">
          <QiblaHeader qiblaAngle={qiblaAngle} />

          <div className="py-6 relative">
            <QiblaCompass 
              compassHeading={compassHeading} 
              compassRotation={compassRotation} 
            />
            
            {/* Subtle radial glow under compass */}
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
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
