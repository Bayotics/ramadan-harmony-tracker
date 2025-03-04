
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
        <>
          <QiblaHeader qiblaAngle={qiblaAngle} />

          <QiblaCompass 
            compassHeading={compassHeading} 
            compassRotation={compassRotation} 
          />

          <LocationInfo 
            userLocation={userLocation} 
            needsCalibration={needsCalibration}
            calibrateCompass={calibrateCompass}
          />
        </>
      )}
    </div>
  );
};

export default QiblaFinder;
