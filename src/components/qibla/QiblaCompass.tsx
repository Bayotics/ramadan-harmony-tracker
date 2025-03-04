
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface QiblaCompassProps {
  compassHeading: number;
  compassRotation: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ compassHeading, compassRotation }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 rounded-full border-4 border-emerald-600 
                    bg-white dark:bg-gray-900">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xl font-bold text-emerald-600">{getTranslation("N")}</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-600">{getTranslation("E")}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl font-bold text-emerald-600">{getTranslation("S")}</div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-600">{getTranslation("W")}</div>

        {Array.from({ length: 72 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute h-2 w-0.5 ${
              i % 9 === 0 ? 'bg-emerald-600 h-4' : 'bg-emerald-600/30'
            }`}
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 5}deg)`,
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <img 
              src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
              alt="Prayer Mat" 
              className="w-full h-full object-contain"
              style={{
                transform: `rotate(${-compassHeading}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotate(${compassRotation}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-6 w-2 bg-emerald-500"
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QiblaCompass;
