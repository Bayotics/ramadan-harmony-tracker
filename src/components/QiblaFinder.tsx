
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PermissionDeniedUI from './qibla/PermissionDeniedUI';
import LocationInfo from './qibla/LocationInfo';
import QiblaHeader from './qibla/QiblaHeader';
import { useQiblaCompass } from '../hooks/useQiblaCompass';

const QiblaFinder: React.FC = () => {
  const { language } = useLanguage();
  const {
    qiblaAngle,
    userLocation,
    isCalibrating,
    needsCalibration,
    permissionDenied,
    requestPermission,
    calibrateCompass
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
      
      {!isCalibrating && !permissionDenied && (
        <div className="flex flex-col items-center max-w-lg w-full mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-green-500/20 dark:border-green-400/10 shadow-lg transform transition-all duration-300 animate-fade-in">
          <QiblaHeader qiblaAngle={qiblaAngle} />

          <div className="py-6 px-4 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {isRTL ? 'تم إزالة البوصلة' : 'Qibla compass has been removed'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {isRTL 
                  ? 'يمكنك الاعتماد على اتجاه القبلة المحسوب بالدرجات' 
                  : 'You can rely on the calculated Qibla direction in degrees'}
              </p>
            </div>
          </div>

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
