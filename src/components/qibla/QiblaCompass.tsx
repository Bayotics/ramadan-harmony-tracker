
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Compass } from 'lucide-react';

interface QiblaCompassProps {
  compassHeading: number;
  compassRotation: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ compassHeading, compassRotation }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="relative w-80 h-80">
      {/* Outer glow effect */}
      <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-full"></div>
      
      {/* Main compass background with glass effect */}
      <div className="absolute inset-0 rounded-full 
                    shadow-[0_0_25px_rgba(129,140,248,0.3)] 
                    bg-gradient-to-b from-gray-900/90 to-indigo-950/80 backdrop-blur-lg 
                    border-4 border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(129,140,248,0.4)]">
        
        {/* Cardinal directions with elegant styling */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-lg font-bold text-indigo-300 tracking-wider">{getTranslation("N")}</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-indigo-300 tracking-wider">{getTranslation("E")}</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg font-bold text-indigo-300 tracking-wider">{getTranslation("S")}</div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-indigo-300 tracking-wider">{getTranslation("W")}</div>

        {/* Elegant tick marks for precision */}
        {Array.from({ length: 72 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute ${
              i % 18 === 0 
                ? 'h-6 w-1 bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.7)]' 
                : i % 9 === 0 
                  ? 'h-4 w-0.5 bg-indigo-400/70' 
                  : 'h-2 w-0.5 bg-indigo-500/30'
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

        {/* Inner circle with gradient */}
        <div className="absolute inset-0 m-6 rounded-full bg-gradient-to-b from-indigo-950/80 to-gray-900/90 backdrop-blur-sm border border-indigo-800/40"></div>

        {/* Center point with glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] z-10"></div>
        
        {/* Qibla prayer mat that rotates with compass heading - using more elegant styling */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-48 h-48 relative" 
            style={{
              transform: `rotate(${-compassHeading}deg)`,
              transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-xl"></div>
            <img 
              src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
              alt="Prayer Mat" 
              className="w-full h-full object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
        
        {/* Subtle concentric circles for depth */}
        <div className="absolute inset-0 m-12 rounded-full border border-indigo-500/10"></div>
        <div className="absolute inset-0 m-20 rounded-full border border-indigo-500/10"></div>
        <div className="absolute inset-0 m-28 rounded-full border border-indigo-500/10"></div>
      </div>

      {/* Rotating compass needle with elegant styling and glow effects */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotate(${compassRotation}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="absolute h-full w-full">
          {/* Main needle with gradient */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1.5 -translate-x-1/2 bg-gradient-to-b from-purple-600 via-purple-500 to-purple-600/0 z-20 rounded-full"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-3 bg-gradient-to-r from-purple-700 to-purple-500 rounded-t-full shadow-[0_0_15px_rgba(168,85,247,0.7)] z-20"></div>
          
          {/* Subtle glow effect around needle */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-1/2 w-1 bg-purple-500/40 blur-md z-10"></div>
          
          {/* Arrow tip at the needle end */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1 h-6 w-6">
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute w-4 h-4 bg-purple-600 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsating outer ring for added visual appeal */}
      <div className="absolute -inset-1 rounded-full border-2 border-indigo-500/20 animate-pulse-gentle"></div>
    </div>
  );
};

export default QiblaCompass;
