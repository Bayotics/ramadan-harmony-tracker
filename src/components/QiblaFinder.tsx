
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
            <div className="absolute inset-0 rounded-full border-4 border-islamic-blue/20 bg-white/80 shadow-lg">
              {/* Cardinal directions */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 font-semibold text-lg">N</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 font-semibold text-lg">E</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-semibold text-lg">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 font-semibold text-lg">W</div>
              
              {/* Degrees markings */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-0.5 h-3 bg-islamic-blue/50"
                  style={{
                    top: '4px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                ></div>
              ))}
            </div>
            
            {/* Compass needle */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-40 -ml-0.5 -mt-20 transition-transform duration-300 ease-out"
              style={{ transform: `translate(-50%, -50%) rotate(${compassRotation}deg)` }}
            >
              <div className="w-full h-1/2 bg-islamic-blue"></div>
              <div className="w-full h-1/2 bg-islamic-gold"></div>
              
              {/* Kaaba indicator */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-6 h-6 bg-islamic-blue rounded-full flex items-center justify-center shadow-lg glow">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {qiblaAngle !== null && (
            <div className="qibla-info text-center">
              <p className="text-lg font-semibold mb-1">
                Qibla Direction: {Math.round(qiblaAngle)}°
              </p>
              {userLocation && (
                <p className="flex items-center justify-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-1" />
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
