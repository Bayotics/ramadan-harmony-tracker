
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
      {/* Main compass circle with green border */}
      <div className="absolute inset-0 rounded-full border-8 border-green-500 bg-white shadow-lg">
        {/* Tick marks for the compass */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute h-4 w-0.5 bg-gray-800"
            style={{
              top: '0',
              left: '50%',
              transformOrigin: 'bottom',
              transform: `translateX(-50%) rotate(${i * 15}deg) translateY(3px)`,
            }}
          />
        ))}
        
        {/* Light gray compass rose backdrop */}
        <div className="absolute inset-0 m-10 bg-gray-200/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full" style={{ 
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(200,200,200,0.3) 51%, rgba(200,200,200,0.3) 100%)'
            }}></div>
          </div>
        </div>
        
        {/* North indicator (green triangle) */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 -translate-y-2 z-10"
          style={{ transform: `translateX(-50%) rotate(${-compassHeading}deg)` }}
        >
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-green-500"></div>
        </div>
      </div>

      {/* Kaaba image in the top right */}
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
        <img 
          src="/lovable-uploads/704f6a5c-508a-417c-9516-ef48332a1ac0.png" 
          alt="Kaaba" 
          className="w-full h-full object-contain"
          style={{ transform: 'scale(2.5)' }}
        />
      </div>
      
      {/* Rotating compass needle */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `rotate(${compassRotation}deg)`,
          transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="absolute h-full w-full flex items-center justify-center">
          {/* Red Arrow Pointer */}
          <div className="relative h-3/4 w-4">
            {/* Arrow body */}
            <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-red-500"></div>
            <div className="absolute top-0 left-0 right-0 h-1/2">
              {/* Triangle pointer */}
              <div className="w-0 h-0 absolute -top-[15px] left-1/2 -translate-x-1/2
                  border-l-[15px] border-r-[15px] border-b-[30px] 
                  border-l-transparent border-r-transparent border-b-red-500">
              </div>
            </div>
            
            {/* Dashed line to Kaaba */}
            <div className="absolute top-0 left-1/2 w-0.5 h-[40%] -translate-x-1/2">
              <div className="w-full h-full flex flex-col">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-2 w-full bg-red-500 my-1"></div>
                ))}
              </div>
            </div>
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QiblaCompass;
