
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface QiblaCompassProps {
  compassHeading: number;
  compassRotation: number;
}

const QiblaCompass: React.FC<QiblaCompassProps> = ({ compassHeading, compassRotation }) => {
  const { getTranslation } = useLanguage();
  
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
      {/* Soft glow background effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-xl"></div>
      
      {/* Main compass circle with gradient border */}
      <div className="absolute inset-0 rounded-full border-[6px] border-gradient-to-r from-green-500 to-emerald-600 bg-white dark:bg-gray-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden">
        {/* Tick marks for the compass */}
        {Array.from({ length: 72 }).map((_, i) => (
          <div 
            key={i} 
            className={`absolute h-2.5 w-0.5 ${i % 9 === 0 ? 'bg-green-600 h-4' : 'bg-gray-400/60 dark:bg-gray-600/60'}`}
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 5}deg) translateY(2px)`,
            }}
          />
        ))}
        
        {/* Cardinal directions */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-green-600 font-bold text-sm" 
             style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}>N</div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-green-600 font-bold text-sm" 
             style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}>S</div>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-green-600 font-bold text-sm" 
             style={{ transform: `translateY(-50%) rotate(${-compassHeading}deg)` }}>W</div>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-green-600 font-bold text-sm" 
             style={{ transform: `translateY(-50%) rotate(${-compassHeading}deg)` }}>E</div>
        
        {/* Light gray compass rose backdrop with subtle pattern */}
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

      {/* Kaaba image in the top right with subtle glow */}
      <div 
        className="absolute"
        style={{ 
          top: '10%', 
          right: '3%', 
          width: '20%', 
          height: '20%',
          transform: `rotate(${-compassHeading}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg -z-10 animate-pulse-gentle"></div>
        <img 
          src="/lovable-uploads/704f6a5c-508a-417c-9516-ef48332a1ac0.png" 
          alt="Kaaba" 
          className="w-full h-full object-contain drop-shadow-md"
          style={{ transform: 'scale(2.5)' }}
        />
      </div>
      
      {/* Rotating compass needle with improved styling */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotate(${compassRotation}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
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
      
      {/* Direction label indicator */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-green-600 dark:text-green-500 font-medium text-lg">
        {Math.round(compassRotation)}°
      </div>
    </div>
  );
};

export default QiblaCompass;
