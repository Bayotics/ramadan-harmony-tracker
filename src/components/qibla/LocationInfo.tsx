
import React from 'react';
import { MapPin, RotateCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LocationInfoProps {
  userLocation: { latitude: number; longitude: number } | null;
  needsCalibration: boolean;
  calibrateCompass: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ userLocation, needsCalibration, calibrateCompass }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <>
      {needsCalibration && (
        <button 
          onClick={calibrateCompass}
          className="mt-6 flex items-center space-x-2 px-4 py-2 bg-emerald-600 
                    text-white rounded-full hover:bg-emerald-700 transition-colors"
        >
          <RotateCw size={16} />
          <span>{getTranslation("Calibrate Compass")}</span>
        </button>
      )}

      {userLocation && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center">
            <MapPin size={14} className="mr-1" />
            {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°
          </p>
        </div>
      )}
    </>
  );
};

export default LocationInfo;
