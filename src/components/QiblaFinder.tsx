
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
        <div className="flex flex-col items-center max-w-lg w-full mx-auto bg-white p-6 rounded-2xl border border-green-500/20 shadow-lg">
          <QiblaHeader qiblaAngle={qiblaAngle} />

          <div className="py-6 relative">
            <QiblaCompass 
              compassHeading={compassHeading} 
              compassRotation={compassRotation} 
            />
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
