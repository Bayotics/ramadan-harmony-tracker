
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
    <div className="text-center mb-6 px-8 py-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-green-500/20 dark:border-green-500/10 transform transition-all animate-fade-in">
      <div className="inline-block relative">
        <div className="absolute inset-0 rounded-full bg-green-500/10 blur-md animate-pulse-gentle"></div>
        <div className="relative animate-spin-slow text-green-500 mb-2">
          <Compass size={80} strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-xl font-medium text-gray-700 dark:text-gray-200 mt-4">
        {getTranslation("Calibrating compass...")}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
        {getTranslation("Please hold your device level and move it in a figure-8 pattern")}
      </p>
      <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse-gentle rounded-full" style={{ width: '60%' }}></div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="relative w-40 h-10">
          <div className="absolute inset-0 w-10 h-10 bg-green-500/20 rounded-full blur-md animate-float transform -translate-x-8"></div>
          <div className="absolute inset-0 w-10 h-10 bg-green-500/20 rounded-full blur-md animate-float animation-delay-500 transform translate-x-8"></div>
        </div>
      </div>
    </div>
  );
};

export default CalibrationUI;
