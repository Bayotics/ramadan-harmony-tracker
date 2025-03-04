
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
      {/* Main compass background */}
      <div className="absolute inset-0 rounded-full shadow-[0_0_25px_rgba(104,211,145,0.2)] 
                    bg-gradient-to-b from-gray-900/90 to-gray-800/80 backdrop-blur-lg 
                    border-4 border-emerald-600/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(104,211,145,0.3)]">
        
        {/* Cardinal directions */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-lg font-bold text-emerald-400 tracking-wider">{getTranslation("N")}</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg font-bold text-emerald-400 tracking-wider">{getTranslation("E")}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-lg font-bold text-emerald-400 tracking-wider">{getTranslation("S")}</div>
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-lg font-bold text-emerald-400 tracking-wider">{getTranslation("W")}</div>

        {/* Tick marks - more sophisticated pattern */}
        {Array.from({ length: 72 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute ${
              i % 18 === 0 
                ? 'h-5 w-1 bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.7)]' 
                : i % 9 === 0 
                  ? 'h-4 w-0.5 bg-emerald-500/70' 
                  : 'h-2 w-0.5 bg-emerald-600/30'
            }`}
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 5}deg)`,
              transition: 'all 0.3s ease-out'
            }}
          />
        ))}

        {/* Inner circle gradient */}
        <div className="absolute inset-0 m-6 rounded-full bg-gradient-to-b from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-emerald-900/30"></div>

        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] z-10"></div>
        
        {/* Qibla prayer mat that rotates with compass heading */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 relative">
            <img 
              src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
              alt="Prayer Mat" 
              className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              style={{
                transform: `rotate(${-compassHeading}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Rotating compass needle */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotate(${compassRotation}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="absolute h-full w-full">
          {/* Main needle */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-600 via-rose-500 to-rose-600/0 z-20"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-3 bg-rose-600 rounded-t-full shadow-[0_0_10px_rgba(225,29,72,0.7)] z-20"></div>
          
          {/* Subtle glow effect around needle */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-1 bg-rose-500/30 blur-sm z-10"></div>
        </div>
      </div>

      {/* Outer ring glow */}
      <div className="absolute -inset-1 rounded-full bg-emerald-500/5 blur-md"></div>
    </div>
  );
};

export default QiblaCompass;
