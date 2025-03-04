
import React from 'react';
import { Compass } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CalibrationUIProps {
  isCalibrating: boolean;
}

const CalibrationUI: React.FC<CalibrationUIProps> = ({ isCalibrating }) => {
  const { getTranslation } = useLanguage();
  
  if (!isCalibrating) return null;
  
  return (
    <div className="text-center mb-6">
      <div className="inline-block animate-spin-slow text-purple-400 mb-2">
        <Compass size={60} strokeWidth={1.5} />
      </div>
      <p className="text-lg font-medium text-gray-200">
        {getTranslation("Calibrating compass...")}
      </p>
      <p className="text-sm text-gray-400">
        {getTranslation("Please hold your device level")}
      </p>
    </div>
  );
};

export default CalibrationUI;
