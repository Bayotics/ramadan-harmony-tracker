
import React, { useState, useEffect, useRef } from 'react';
import { Compass, MapPin, Star, Navigation, RotateCw, AlertCircle } from 'lucide-react';
import { calculateQiblaDirection, getUserLocation } from '../utils/qiblaDirection';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from "../components/ui/use-toast";

const QiblaFinder: React.FC = () => {
  const { language, getTranslation } = useLanguage();
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [needsCalibration, setNeedsCalibration] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const isInitializedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  
  // Function to handle device orientation
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      // Apply smoothing to reduce jumpiness
      setCompassHeading(prevHeading => {
        // Simple low-pass filter for smoothing
        const alpha = 0.2; // Adjust based on desired smoothing (0-1)
        const newHeading = event.alpha!;
        return prevHeading * (1 - alpha) + newHeading * alpha;
      });
    }
  };
  
  // Function to request device orientation permission
  const requestPermission = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // For iOS 13+
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleDeviceOrientation, true);
          setPermissionDenied(false);
        } else {
          setPermissionDenied(true);
          toast({
            title: getTranslation("Permission Denied"),
            description: getTranslation("Please allow compass access for accurate Qibla direction"),
            variant: "destructive"
          });
        }
      } else {
        // For non-iOS devices or older iOS that don't require permission
        window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      }
    } catch (error) {
      console.error('Error requesting device orientation permission:', error);
      setPermissionDenied(true);
    }
  };
  
  // Function to calibrate compass
  const calibrateCompass = () => {
    setIsCalibrating(true);
    setNeedsCalibration(false);
    toast({
      title: getTranslation("Calibrating Compass"),
      description: getTranslation("Move your device in a figure-8 pattern"),
    });
    
    // Simulate calibration completion after 3 seconds
    setTimeout(() => {
      setIsCalibrating(false);
      toast({
        title: getTranslation("Calibration Complete"),
        description: getTranslation("Your compass is now calibrated"),
      });
    }, 3000);
  };
  
  // Initialize Qibla finder
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    const initQibla = async () => {
      try {
        // Get user location
        const location = await getUserLocation();
        setUserLocation(location);
        
        // Calculate Qibla direction
        const qibla = calculateQiblaDirection(location.latitude, location.longitude);
        setQiblaAngle(qibla);
        
        // Request permission for device orientation
        await requestPermission();
        
        // After a short delay, hide the calibration message
        setTimeout(() => {
          setIsCalibrating(false);
        }, 2000);
      } catch (error) {
        console.error('Error initializing qibla finder:', error);
        setIsCalibrating(false);
        toast({
          title: getTranslation("Error"),
          description: getTranslation("Could not determine your location or Qibla direction"),
          variant: "destructive"
        });
      }
    };
    
    initQibla();
    
    // Detect if the device needs calibration after 10 seconds
    const calibrationCheckTimer = setTimeout(() => {
      // This would ideally check actual sensor accuracy, for now just a simulated check
      if (Math.random() < 0.3) { // 30% chance to need calibration - in real app this would be based on sensor data
        setNeedsCalibration(true);
      }
    }, 10000);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('deviceorientation', handleDeviceOrientation, true);
      clearTimeout(calibrationCheckTimer);
    };
  }, []);
  
  // Calculate the angle to rotate the compass needle
  const compassRotation = qiblaAngle !== null ? qiblaAngle - compassHeading : 0;
  
  const directionLabel = () => {
    if (qiblaAngle === null) return "";
    const normalizedAngle = (qiblaAngle + 360) % 360;
    
    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) return getTranslation("North");
    if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) return getTranslation("Northeast");
    if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) return getTranslation("East");
    if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) return getTranslation("Southeast");
    if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) return getTranslation("South");
    if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) return getTranslation("Southwest");
    if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) return getTranslation("West");
    if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) return getTranslation("Northwest");
    
    return "";
  };
  
  const isRTL = language === 'ar';
  
  return (
    <div className="qibla-finder flex flex-col items-center justify-center py-4 animate-fade-in">
      {isCalibrating ? (
        <div className="text-center mb-6">
          <div className="inline-block animate-spin-slow text-islamic-blue mb-2">
            <Compass size={60} strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium bg-gradient-to-r from-islamic-blue to-islamic-darkBlue bg-clip-text text-transparent">
            {getTranslation("Calibrating compass...")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getTranslation("Please hold your device level")}
          </p>
        </div>
      ) : permissionDenied ? (
        <div className="text-center mb-6 p-6 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle size={60} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            {getTranslation("Compass Access Required")}
          </h3>
          <p className="text-gray-700 mb-4">
            {getTranslation("Please allow access to your device's compass to find Qibla direction")}
          </p>
          <button 
            onClick={requestPermission}
            className="px-4 py-2 bg-islamic-blue text-white rounded-full hover:bg-islamic-darkBlue transition-all"
          >
            {getTranslation("Grant Permission")}
          </button>
        </div>
      ) : (
        <>
          <div className="compass-container relative w-80 h-80 mb-8 transition-all duration-500 hover:scale-105">
            {/* Compass outer ring with golden border */}
            <div className="absolute inset-0 rounded-full border-4 border-islamic-gold/30 bg-gradient-to-br from-white to-islamic-cream shadow-lg backdrop-blur-sm overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-pattern-islamic"></div>
              
              {/* Cardinal directions with enhanced styling */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue flex flex-col items-center">
                <Star size={16} className="mb-1 text-islamic-gold" />
                <span>{getTranslation("N")}</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue flex items-center">
                <span>{getTranslation("E")}</span>
                <Star size={16} className="ml-1 text-islamic-gold" />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-lg text-islamic-darkBlue flex flex-col items-center">
                <span>{getTranslation("S")}</span>
                <Star size={16} className="mt-1 text-islamic-gold" />
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-islamic-darkBlue flex items-center">
                <Star size={16} className="mr-1 text-islamic-gold" />
                <span>{getTranslation("W")}</span>
              </div>
              
              {/* Inner circle with enhanced gradient */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-islamic-blue/20 bg-gradient-to-br from-white/90 to-islamic-cream/80"></div>
              
              {/* Subtle inner shadow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full shadow-inner opacity-20"></div>
              
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
              
              {/* Current heading indicator */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-1 h-10 bg-islamic-blue/60"></div>
                <div className="mt-1 px-3 py-1 rounded-full bg-islamic-blue text-white text-xs font-medium">
                  {Math.round(compassHeading)}°
                </div>
              </div>
            </div>
            
            {/* Compass needle with enhanced styling */}
            <div 
              className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out z-10"
              style={{ transform: `translate(-50%, -50%) rotate(${compassRotation}deg)` }}
            >
              {/* Needle design */}
              <div className="relative h-64 w-4 flex flex-col items-center">
                {/* North pointing needle */}
                <div className="w-2 h-[7rem] bg-gradient-to-t from-islamic-blue via-islamic-lightBlue to-white rounded-t-full shadow-lg"></div>
                
                {/* South pointing needle */}
                <div className="w-2 h-[7rem] bg-gradient-to-b from-islamic-gold via-islamic-gold to-islamic-sand rounded-b-full shadow-lg"></div>
                
                {/* Kaaba indicator with enhanced animation and styling */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center animate-float">
                  <div className="w-12 h-12 bg-gradient-to-br from-islamic-darkBlue to-islamic-blue rounded-full flex items-center justify-center shadow-lg shadow-islamic-blue/30 glow-gold">
                    <div className="w-8 h-8 bg-gradient-to-br from-white/90 to-islamic-cream rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-gradient-to-r from-islamic-gold to-yellow-400 rounded-full animate-pulse-gentle"></div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs font-semibold bg-gradient-to-r from-islamic-darkBlue to-islamic-blue bg-clip-text text-transparent">
                    {getTranslation("Kaaba")}
                  </div>
                </div>
                
                {/* Center pivot with more dimension */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-white to-islamic-cream border-2 border-islamic-gold/40 shadow-lg"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-islamic-gold/20 shadow-inner"></div>
              </div>
            </div>
          </div>
          
          {qiblaAngle !== null && (
            <div className="qibla-info glass-card rounded-2xl px-8 py-5 text-center bg-gradient-to-r from-white/90 to-islamic-cream/90 shadow-lg border border-islamic-gold/30 w-80">
              <p className="text-xl font-semibold mb-2 bg-gradient-to-r from-islamic-darkBlue to-islamic-blue bg-clip-text text-transparent flex items-center justify-center">
                <Navigation size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-islamic-blue`} />
                {getTranslation("Qibla Direction")}: {Math.round(qiblaAngle)}°
              </p>
              <p className="text-sm text-islamic-darkBlue/80 mb-2">
                {getTranslation("Direction")}: {directionLabel()}
              </p>
              {userLocation && (
                <p className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={14} className={`${isRTL ? 'ml-1' : 'mr-1'} text-islamic-blue`} />
                  {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°
                </p>
              )}
              
              {needsCalibration && (
                <button 
                  onClick={calibrateCompass}
                  className={`mt-3 flex items-center justify-center ${isRTL ? 'space-x-reverse' : 'space-x-1'} text-xs font-medium text-islamic-blue bg-islamic-blue/10 px-3 py-1.5 rounded-full hover:bg-islamic-blue/20 transition-all mx-auto`}
                >
                  <RotateCw size={12} className={isRTL ? 'ml-1' : 'mr-1'} />
                  <span>{getTranslation("Calibrate Compass")}</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QiblaFinder;
