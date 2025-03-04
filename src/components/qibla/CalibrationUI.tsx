
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
    <div className="text-center mb-6 px-8 py-6 rounded-xl bg-gradient-to-b from-gray-800/80 to-indigo-950/90 backdrop-blur-md border border-indigo-500/20 shadow-[0_10px_25px_-5px_rgba(99,102,241,0.3)]">
      <div className="inline-block relative">
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl"></div>
        <div className="relative animate-spin-slow text-indigo-400 mb-2">
          <Compass size={70} strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-xl font-medium text-gray-200 mt-4 tracking-wide">
        {getTranslation("Calibrating compass...")}
      </p>
      <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
        {getTranslation("Please hold your device level and move it in a figure-8 pattern")}
      </p>
      <div className="mt-4 w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-400 animate-pulse-gentle rounded-full" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
};

export default CalibrationUI;
