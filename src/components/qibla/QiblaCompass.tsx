
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Compass, MapPin } from 'lucide-react';

interface QiblaCompassProps {
  qiblaAngle: number | null;
  compassHeading: number;
  compassRotation: number;
  directionLabel: string;
  isCalibrating?: boolean;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ 
  qiblaAngle, 
  compassHeading, 
  compassRotation, 
  directionLabel,
  isCalibrating = false
}) => {
  const { getTranslation } = useLanguage();
  const compassRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!compassRef.current) return;
    
    // Apply rotation with smooth animation
    compassRef.current.style.transform = `rotate(${compassRotation}deg)`;
  }, [compassRotation]);
  
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-6">
      {/* Soft glow background effect - different colors for different modes */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-600/20 dark:to-indigo-700/20 blur-xl"></div>
      
      {/* Main compass circle with dynamic border based on theme */}
      <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-green-400 to-emerald-500 dark:from-emerald-500 dark:to-green-600 bg-white dark:bg-gray-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] dark:shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden">
        {/* Tick marks for the compass */}
        {Array.from({ length: 72 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute h-2.5 w-0.5 ${i % 9 === 0 ? 'bg-green-600 dark:bg-green-500 h-4' : 'bg-gray-400/60 dark:bg-gray-600/60'}`}
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 5}deg) translateY(2px)`,
            }}
          />
        ))}
        
        {/* Cardinal directions */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-green-600 dark:text-green-500 font-bold text-sm" 
             style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}>N</div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-green-600 dark:text-green-500 font-bold text-sm" 
             style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}>S</div>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-500 font-bold text-sm" 
             style={{ transform: `translateY(-50%) rotate(${-compassHeading}deg)` }}>W</div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-500 font-bold text-sm" 
             style={{ transform: `translateY(-50%) rotate(${-compassHeading}deg)` }}>E</div>
        
        {/* Light compass rose backdrop with subtle pattern */}
        <div className="absolute inset-0 m-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full" style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(200,200,200,0.15) 51%, rgba(200,200,200,0.15) 100%)'
            }}></div>
            
            {/* Subtle compass rose pattern */}
            <div className="absolute inset-0 opacity-20 dark:opacity-30" style={{
              backgroundImage: `radial-gradient(circle at center, transparent 30%, rgba(74, 222, 128, 0.1) 30.5%, transparent 32%, 
                                rgba(74, 222, 128, 0.1) 32.5%, transparent 34%, rgba(74, 222, 128, 0.1) 34.5%, transparent 36%)`,
              backgroundSize: '100% 100%',
              transform: `rotate(${-compassHeading}deg)`
            }}></div>
          </div>
        </div>
        
        {/* North indicator (green triangle) */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 -translate-y-2 z-10"
          style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}
        >
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-green-500 filter drop-shadow-md"></div>
        </div>
      </div>

      {/* Kaaba image in the compass with subtle glow */}
      <div 
        className="absolute"
        style={{ 
          top: '50%', 
          left: '50%', 
          width: '20%', 
          height: '20%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg -z-10 animate-pulse-gentle"></div>
        <img 
          src="/lovable-uploads/704f6a5c-508a-417c-9516-ef48332a1ac0.png" 
          alt="Kaaba" 
          className="w-full h-full object-contain drop-shadow-md"
        />
      </div>
      
      {/* Rotating compass needle with glossy styling */}
      <div 
        ref={compassRef}
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${compassRotation}deg)` }}
      >
        <div className="absolute h-full w-full flex items-center justify-center">
          {/* Red Arrow Pointer with glossy effect */}
          <div className="relative h-[70%] w-4">
            {/* Arrow body with gradient */}
            <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-b from-red-600 to-red-500 shadow-md"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2">
              {/* Triangle pointer with glossy effect */}
              <div className="w-0 h-0 absolute -top-[15px] left-1/2 -translate-x-1/2
                  border-l-[15px] border-r-[15px] border-b-[30px] 
                  border-l-transparent border-r-transparent border-b-red-500
                  after:content-[''] after:absolute after:top-0 after:left-[-7px] after:w-[14px] after:h-[15px] 
                  after:bg-gradient-to-br after:from-red-400/40 after:to-transparent after:z-10">
              </div>
            </div>
            
            {/* Dashed line to Kaaba with improved styling */}
            <div className="absolute top-0 left-1/2 w-0.5 h-[40%] -translate-x-1/2 overflow-hidden">
              <div className="w-full h-full flex flex-col">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-full bg-red-500 my-1 rounded-full shadow-sm"></div>
                ))}
              </div>
            </div>
            
            {/* Center circle with glossy effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-inner shadow-gray-200 dark:shadow-gray-900">
              <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-white/80 to-transparent dark:from-gray-700/80"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 dark:from-purple-600/0 dark:via-purple-600/10 dark:to-purple-600/0 opacity-70 pointer-events-none animate-pulse-gentle"></div>
      
      {/* Direction label with Qibla angle */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-green-600 dark:text-green-500 font-medium text-lg">
          {qiblaAngle !== null ? `${Math.round(qiblaAngle)}°` : "--°"}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {directionLabel || getTranslation("Finding direction...")}
        </div>
      </div>
      
      {/* Calibration overlay */}
      {isCalibrating && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm rounded-full animate-pulse z-20">
          <div className="text-center p-4">
            <Compass className="mx-auto h-12 w-12 text-white mb-2 animate-spin-slow" />
            <p className="text-white text-sm font-medium">
              {getTranslation("Calibrating...")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QiblaCompass;
