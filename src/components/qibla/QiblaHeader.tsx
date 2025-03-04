
import React from 'react';
import { Switch } from "../ui/switch";
import { useLanguage } from '../../contexts/LanguageContext';

interface QiblaHeaderProps {
  qiblaAngle: number | null;
}

const QiblaHeader: React.FC<QiblaHeaderProps> = ({ qiblaAngle }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="flex items-center justify-between w-full max-w-md mb-6 px-4">
      <div className="flex items-center space-x-3">
        <img src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
             alt="Prayer Times" 
             className="w-12 h-12 rounded-full" />
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-200">
            {getTranslation("Qibla Direction")}
          </h3>
          {qiblaAngle !== null && (
            <p className="text-sm text-gray-400">
              {Math.round(qiblaAngle)}° {getTranslation("east of north")}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-400">{getTranslation("Use compass")}</span>
        <Switch defaultChecked />
      </div>
    </div>
  );
};

export default QiblaHeader;
