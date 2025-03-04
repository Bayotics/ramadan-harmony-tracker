
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
    <div className="text-center mb-6 px-8 py-6 rounded-xl bg-white shadow-lg border border-green-500/20">
      <div className="inline-block relative">
        <div className="relative animate-spin-slow text-green-500 mb-2">
          <Compass size={70} strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-xl font-medium text-gray-700 mt-4">
        {getTranslation("Calibrating compass...")}
      </p>
      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
        {getTranslation("Please hold your device level and move it in a figure-8 pattern")}
      </p>
      <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-pulse-gentle rounded-full" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
};

export default CalibrationUI;
