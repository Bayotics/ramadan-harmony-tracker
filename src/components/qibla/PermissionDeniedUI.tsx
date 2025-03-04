
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
    <div className="text-center mb-6 p-6 rounded-xl bg-gray-800/90 border border-red-500/30">
      <AlertCircle size={60} className="mx-auto text-red-500 mb-4" />
      <h3 className="text-xl font-semibold text-red-300 mb-2">
        {getTranslation("Compass Access Required")}
      </h3>
      <p className="text-gray-300 mb-4">
        {getTranslation("Please allow access to your device's compass to find Qibla direction")}
      </p>
      <button 
        onClick={requestPermission}
        className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
      >
        {getTranslation("Grant Permission")}
      </button>
    </div>
  );
};

export default PermissionDeniedUI;
