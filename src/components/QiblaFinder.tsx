
import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Star } from 'lucide-react';
import { calculateQiblaDirection, getUserLocation } from '../utils/qiblaDirection';

const QiblaFinder: React.FC = () => {
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  
  useEffect(() => {
    // Get user location and calculate qibla direction
    const initQibla = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        
        const qibla = calculateQiblaDirection(location.latitude, location.longitude);
        setQiblaAngle(qibla);
        
        // After a short delay, hide the calibration message
        setTimeout(() => {
          setIsCalibrating(false);
        }, 2000);
      } catch (error) {
        console.error('Error initializing qibla finder:', error);
        setIsCalibrating(false);
      }
    };
    
    initQibla();
    
    // Set up device orientation handling for compass
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        // Check if we have the alpha value (compass direction)
        if (event.alpha !== null) {
          setCompassHeading(event.alpha);
        }
      };
      
      window.addEventListener('deviceorientation', handleOrientation, true);
      
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    }
  }, []);
  
  // Calculate the angle to rotate the compass needle
  const compassRotation = qiblaAngle !== null ? qiblaAngle - compassHeading : 0;
  
  return (
    <div className="qibla-finder flex flex-col items-center justify-center py-4 animate-fade-in">
      {isCalibrating ? (
        <div className="text-center mb-6">
          <div className="inline-block animate-spin-slow text-islamic-blue mb-2">
            <Compass size={60} strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium bg-gradient-to-r from-islamic-blue to-islamic-darkBlue bg-clip-text text-transparent">Calibrating compass...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Please hold your device level</p>
        </div>
      ) : (
        <>
          <div className="compass-container relative w-72 h-72 mb-8">
            {/* Compass outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-islamic-blue/30 bg-gradient-to-br from-white to-islamic-cream shadow-lg backdrop-blur-sm overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-pattern-islamic"></div>
              
              {/* Cardinal directions with enhanced styling */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue flex flex-col items-center">
                <Star size={16} className="mb-1 text-islamic-blue" />
                <span>N</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue flex items-center">
                <span>E</span>
                <Star size={16} className="ml-1 text-islamic-blue" />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue flex flex-col items-center">
                <span>S</span>
                <Star size={16} className="mt-1 text-islamic-blue" />
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue flex items-center">
                <Star size={16} className="mr-1 text-islamic-blue" />
                <span>W</span>
              </div>
              
              {/* Inner circle with gradient */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-islamic-blue/20 bg-gradient-to-br from-white/90 to-islamic-cream/80"></div>
              
              {/* Subtle inner shadow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full shadow-inner opacity-20"></div>
              
              {/* Degree markings with enhanced visibility */}
              {Array.from({ length: 72 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`absolute ${
                    i % 9 === 0 
                      ? 'h-5 w-1 bg-islamic-blue/80' 
                      : i % 3 === 0 
                        ? 'h-3 w-0.5 bg-islamic-blue/60' 
                        : 'h-2 w-0.5 bg-islamic-blue/30'
                  }`}
                  style={{
                    top: '8px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 5}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                ></div>
              ))}
            </div>
            
            {/* Compass needle with enhanced styling */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out z-10"
              style={{ transform: `translate(-50%, -50%) rotate(${compassRotation}deg)` }}
            >
              {/* Needle design */}
              <div className="relative h-60 w-4 flex flex-col items-center">
                {/* North pointing needle */}
                <div className="w-2 h-[6.5rem] bg-gradient-to-t from-islamic-blue via-islamic-lightBlue to-white rounded-t-full shadow-lg"></div>
                
                {/* South pointing needle */}
                <div className="w-2 h-[6.5rem] bg-gradient-to-b from-islamic-gold via-islamic-gold to-islamic-sand rounded-b-full shadow-lg"></div>
                
                {/* Kaaba indicator with enhanced animation and styling */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center animate-float">
                  <div className="w-10 h-10 bg-gradient-to-br from-islamic-darkBlue to-islamic-blue rounded-full flex items-center justify-center shadow-lg shadow-islamic-blue/30 glow">
                    <div className="w-7 h-7 bg-gradient-to-br from-white/90 to-islamic-cream rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-islamic-gold to-yellow-400 rounded-full animate-pulse-gentle"></div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs font-semibold bg-gradient-to-r from-islamic-darkBlue to-islamic-blue bg-clip-text text-transparent">Kaaba</div>
                </div>
                
                {/* Center pivot with more dimension */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-white to-islamic-cream border-2 border-islamic-blue/40 shadow-lg"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-islamic-blue/20 shadow-inner"></div>
              </div>
            </div>
          </div>
          
          {qiblaAngle !== null && (
            <div className="qibla-info glass-card rounded-2xl px-8 py-5 text-center bg-gradient-to-r from-white/90 to-islamic-cream/90 shadow-lg border border-islamic-blue/20">
              <p className="text-xl font-semibold mb-2 bg-gradient-to-r from-islamic-darkBlue to-islamic-blue bg-clip-text text-transparent">
                Qibla Direction: {Math.round(qiblaAngle)}°
              </p>
              {userLocation && (
                <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={14} className="mr-1 text-islamic-blue" />
                  {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QiblaFinder;
