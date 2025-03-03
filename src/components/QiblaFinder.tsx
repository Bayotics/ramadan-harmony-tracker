
import React, { useState, useEffect } from 'react';
import { Compass, MapPin } from 'lucide-react';
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
            <Compass size={60} />
          </div>
          <p className="text-lg font-medium">Calibrating compass...</p>
          <p className="text-sm text-muted-foreground">Please hold your device level</p>
        </div>
      ) : (
        <>
          <div className="compass-container relative w-64 h-64 mb-6">
            {/* Compass background */}
            <div className="absolute inset-0 rounded-full border-4 border-islamic-blue/20 bg-gradient-to-br from-white to-islamic-cream/50 shadow-lg backdrop-blur-sm">
              {/* Cardinal directions */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue">N</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue">E</div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue">S</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue">W</div>
              
              {/* Inner circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-islamic-blue/30 bg-white/40"></div>
              
              {/* Degree markings */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`absolute w-0.5 h-3 ${i % 3 === 0 ? 'h-5 bg-islamic-blue/70' : 'bg-islamic-blue/40'}`}
                  style={{
                    top: '8px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 15}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                ></div>
              ))}
            </div>
            
            {/* Compass needle */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
              style={{ transform: `translate(-50%, -50%) rotate(${compassRotation}deg)` }}
            >
              {/* Needle design */}
              <div className="relative h-52 w-4 flex flex-col items-center">
                <div className="w-1.5 h-[5.5rem] bg-gradient-to-t from-islamic-blue to-islamic-lightBlue rounded-t-full shadow-md"></div>
                <div className="w-1.5 h-[5.5rem] bg-gradient-to-b from-islamic-gold to-islamic-sand rounded-b-full shadow-md"></div>
                
                {/* Kaaba indicator */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-islamic-darkBlue to-islamic-blue rounded-full flex items-center justify-center shadow-lg glow">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-islamic-gold rounded-full animate-pulse-gentle"></div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-islamic-darkBlue">Kaaba</div>
                </div>
                
                {/* Center pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-islamic-blue/50 shadow-inner"></div>
              </div>
            </div>
          </div>
          
          {qiblaAngle !== null && (
            <div className="qibla-info glass-card rounded-xl px-6 py-4 text-center">
              <p className="text-lg font-semibold mb-1 text-islamic-darkBlue">
                Qibla Direction: {Math.round(qiblaAngle)}°
              </p>
              {userLocation && (
                <p className="flex items-center justify-center text-sm text-muted-foreground">
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
