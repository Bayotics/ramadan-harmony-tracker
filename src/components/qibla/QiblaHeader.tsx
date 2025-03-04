
import React from 'react';
import { Switch } from "../ui/switch";
import { useLanguage } from '../../contexts/LanguageContext';
import { Compass } from 'lucide-react';

interface QiblaHeaderProps {
  qiblaAngle: number | null;
}

const QiblaHeader: React.FC<QiblaHeaderProps> = ({ qiblaAngle }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="flex items-center justify-between w-full max-w-md mb-6 px-4">
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg"></div>
          <Compass className="w-10 h-10 text-green-600 relative" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-700 tracking-wide">
            {getTranslation("Qibla Direction")}
          </h3>
          {qiblaAngle !== null && (
            <p className="text-sm text-green-600">
              {Math.round(qiblaAngle)}° {getTranslation("east of north")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">{getTranslation("Use compass")}</span>
        <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
      </div>
    </div>
  );
};

export default QiblaHeader;
