
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPin } from 'lucide-react';

interface QiblaHeaderProps {
  qiblaAngle: number | null;
}

const QiblaHeader: React.FC<QiblaHeaderProps> = ({ qiblaAngle }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="flex items-center justify-between w-full max-w-md mb-6 px-4">
      <div className="text-left">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
          {getTranslation("Qibla Direction")}
        </h3>
        {qiblaAngle !== null && (
          <div className="flex items-center mt-1">
            <MapPin size={14} className="text-green-600 dark:text-green-500 mr-1" />
            <p className="text-sm text-green-600 dark:text-green-500 font-medium">
              {Math.round(qiblaAngle)}° {getTranslation("east of north")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QiblaHeader;
