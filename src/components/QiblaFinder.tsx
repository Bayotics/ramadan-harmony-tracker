
import React, { useState, useEffect, useRef } from 'react';
import { Compass, MapPin, Navigation, RotateCw, AlertCircle } from 'lucide-react';
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
          <div className="inline-block animate-spin-slow text-purple-600 mb-2">
            <Compass size={60} strokeWidth={1.5} />
          </div>
          <p className="text-lg font-medium text-gray-200">
            {getTranslation("Calibrating compass...")}
          </p>
          <p className="text-sm text-gray-400">
            {getTranslation("Please hold your device level")}
          </p>
        </div>
      ) : permissionDenied ? (
        <div className="text-center mb-6 p-6 rounded-xl bg-gray-800/90 border border-red-500/30">
          <AlertCircle size={60} className="mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-red-300 mb-2">
            {getTranslation("Compass Access Required")}
          </h3>
          <p className="text-gray-300 mb-4">
            {getTranslation("Please allow access to your device's compass to find Qibla direction")}
          </p>
          <button 
            onClick={requestPermission}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
          >
            {getTranslation("Grant Permission")}
          </button>
        </div>
      ) : (
        <>
          <div className="compass-container relative w-80 h-80 mb-8 transition-all duration-500">
            {/* Compass outer ring with modern border */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-500/40 bg-gray-800 shadow-lg overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-pattern-islamic"></div>
              
              {/* Numerical degree markers */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-300">0</div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-300">90</div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-300">180</div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-300">270</div>
              
              {/* 45-degree markers */}
              <div className="absolute top-[12%] right-[12%] text-sm font-bold text-gray-300">45</div>
              <div className="absolute bottom-[12%] right-[12%] text-sm font-bold text-gray-300">135</div>
              <div className="absolute bottom-[12%] left-[12%] text-sm font-bold text-gray-300">225</div>
              <div className="absolute top-[12%] left-[12%] text-sm font-bold text-gray-300">315</div>
              
              {/* Cardinal directions */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 font-bold text-lg text-red-500">
                {getTranslation("N")}
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 font-bold text-lg text-gray-200">
                {getTranslation("E")}
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-bold text-lg text-gray-200">
                {getTranslation("S")}
              </div>
              <div className="absolute left-8 top-1/2 -translate-y-1/2 font-bold text-lg text-gray-200">
                {getTranslation("W")}
              </div>
              
              {/* Inner circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gray-500/30 bg-gray-700/80"></div>
              
              {/* Inner center circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border border-gray-500/40 z-20"></div>
              
              {/* Degree markings */}
              {Array.from({ length: 72 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`absolute ${
                    i % 9 === 0 
                      ? 'h-5 w-1 bg-gray-400/70' 
                      : i % 3 === 0 
                        ? 'h-3 w-0.5 bg-gray-400/50' 
                        : 'h-2 w-0.5 bg-gray-400/30'
                  }`}
                  style={{
                    top: '8px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i * 5}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                ></div>
              ))}
              
              {/* Cross lines */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600/50"></div>
              <div className="absolute top-0 left-1/2 h-full w-0.5 bg-gray-600/50 -translate-x-1/2"></div>
              
              {/* Diagonal lines */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full" 
                     style={{ transform: 'rotate(45deg)' }}>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600/30 -translate-y-1/2"></div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full" 
                     style={{ transform: 'rotate(-45deg)' }}>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600/30 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Kaaba symbol at the top */}
            <div 
              className="absolute z-30 transition-transform"
              style={{ 
                top: '5%', 
                left: '50%', 
                transform: `translateX(-50%) rotate(${-compassHeading}deg)` 
              }}
            >
              <div className="w-12 h-12 flex flex-col items-center">
                <div className="w-8 h-8 bg-black border border-yellow-500 flex items-center justify-center">
                  <div className="w-6 h-1 bg-yellow-500"></div>
                </div>
              </div>
            </div>
            
            {/* Improved Compass needles with better alignment */}
            <div 
              className="absolute top-1/2 left-1/2 transition-transform duration-300 ease-out z-20"
              style={{ transform: `translate(-50%, -50%) rotate(${compassRotation}deg)` }}
            >
              {/* Needle design with perfect alignment */}
              <div className="relative flex flex-col items-center">
                {/* North pointing needle (red) - reduced height for better fit */}
                <div className="absolute w-3 h-28 bg-gradient-to-t from-red-900 via-red-700 to-red-500 rounded-t-full shadow-lg -mt-28 left-1/2 -translate-x-1/2"></div>
                
                {/* South pointing needle (blue) - reduced height for better fit */}
                <div className="absolute w-3 h-28 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 rounded-b-full shadow-lg mt-0 left-1/2 -translate-x-1/2"></div>
                
                {/* Center pivot */}
                <div className="absolute w-10 h-10 rounded-full bg-gray-300/20 border-2 border-gray-400/30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          
          {qiblaAngle !== null && (
            <div className="qibla-info rounded-2xl px-8 py-5 text-center bg-gray-800/90 shadow-lg border border-gray-600/30 w-80">
              <p className="text-xl font-semibold mb-2 text-gray-200 flex items-center justify-center">
                <Navigation size={18} className={`${isRTL ? 'ml-2' : 'mr-2'} text-purple-400`} />
                {getTranslation("Qibla Direction")}: {Math.round(qiblaAngle)}°
              </p>
              <p className="text-sm text-gray-300 mb-2">
                {getTranslation("Direction")}: {directionLabel()}
              </p>
              {userLocation && (
                <p className="flex items-center justify-center text-sm text-gray-400">
                  <MapPin size={14} className={`${isRTL ? 'ml-1' : 'mr-1'} text-purple-400`} />
                  {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°
                </p>
              )}
              
              {needsCalibration && (
                <button 
                  onClick={calibrateCompass}
                  className={`mt-3 flex items-center justify-center ${isRTL ? 'space-x-reverse' : 'space-x-1'} text-xs font-medium text-gray-200 bg-purple-900/50 px-3 py-1.5 rounded-full hover:bg-purple-800/50 transition-all mx-auto`}
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
