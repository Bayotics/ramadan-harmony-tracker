
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface PermissionDeniedUIProps {
  permissionDenied: boolean;
  requestPermission: () => Promise<void>;
}

const PermissionDeniedUI: React.FC<PermissionDeniedUIProps> = ({ permissionDenied, requestPermission }) => {
  const { getTranslation } = useLanguage();
  
  if (!permissionDenied) return null;
  
  return (
    <div className="text-center mb-6 p-8 rounded-xl bg-gradient-to-b from-gray-800/90 to-gray-900/95 backdrop-blur-md border border-red-500/30 shadow-[0_10px_25px_-5px_rgba(220,38,38,0.2)]">
      <div className="inline-block relative mb-4">
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"></div>
        <AlertCircle size={70} className="relative text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-red-300 mb-3 tracking-wide">
        {getTranslation("Compass Access Required")}
      </h3>
      <p className="text-gray-300 mb-6 max-w-sm mx-auto">
        {getTranslation("Please allow access to your device's compass to find Qibla direction")}
      </p>
      <button 
        onClick={requestPermission}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-full hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {getTranslation("Grant Permission")}
      </button>
    </div>
  );
};

export default PermissionDeniedUI;
