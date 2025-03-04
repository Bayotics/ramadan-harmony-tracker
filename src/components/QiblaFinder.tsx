import React, { useState, useEffect, useRef } from 'react';
import { Compass, MapPin, Navigation, RotateCw, AlertCircle } from 'lucide-react';
import { calculateQiblaDirection, getUserLocation } from '../utils/qiblaDirection';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from "../components/ui/use-toast";
import { Switch } from "../components/ui/switch";

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
  
  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setCompassHeading(prevHeading => {
        const alpha = 0.2;
        const newHeading = event.alpha!;
        return prevHeading * (1 - alpha) + newHeading * alpha;
      });
    }
  };
  
  const requestPermission = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
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
        window.addEventListener('deviceorientation', handleDeviceOrientation, true);
      }
    } catch (error) {
      console.error('Error requesting device orientation permission:', error);
      setPermissionDenied(true);
    }
  };
  
  const calibrateCompass = () => {
    setIsCalibrating(true);
    setNeedsCalibration(false);
    toast({
      title: getTranslation("Calibrating Compass"),
      description: getTranslation("Move your device in a figure-8 pattern"),
    });
    
    setTimeout(() => {
      setIsCalibrating(false);
      toast({
        title: getTranslation("Calibration Complete"),
        description: getTranslation("Your compass is now calibrated"),
      });
    }, 3000);
  };
  
  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    const initQibla = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        
        const qibla = calculateQiblaDirection(location.latitude, location.longitude);
        setQiblaAngle(qibla);
        
        await requestPermission();
        
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
    
    const calibrationCheckTimer = setTimeout(() => {
      if (Math.random() < 0.3) {
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
    <div className="qibla-finder flex flex-col items-center justify-center py-4">
      {isCalibrating ? (
        <div className="text-center mb-6">
          <div className="inline-block animate-spin-slow text-purple-400 mb-2">
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
          <div className="flex items-center justify-between w-full max-w-md mb-6 px-4">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
                   alt="Prayer Times" 
                   className="w-12 h-12 rounded-full" />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-200">
                  {getTranslation("Qibla Direction")}
                </h3>
                {qiblaAngle !== null && (
                  <p className="text-sm text-gray-400">
                    {Math.round(qiblaAngle)}° {getTranslation("east of north")}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{getTranslation("Use compass")}</span>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-600 
                          bg-white dark:bg-gray-900">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xl font-bold text-emerald-600">N</div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-600">E</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl font-bold text-emerald-600">S</div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xl font-bold text-emerald-600">W</div>

              {Array.from({ length: 72 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`absolute h-2 w-0.5 ${
                    i % 9 === 0 ? 'bg-emerald-600 h-4' : 'bg-emerald-600/30'
                  }`}
                  style={{
                    top: '0',
                    left: '50%',
                    transformOrigin: 'bottom',
                    transform: `translateX(-50%) rotate(${i * 5}deg)`,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  <img 
                    src="/lovable-uploads/642dc626-43c1-4f6e-9d41-1647654d1c98.png" 
                    alt="Prayer Mat" 
                    className="w-full h-full object-contain"
                    style={{
                      transform: `rotate(${-compassHeading}deg)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  />
                </div>
              </div>
            </div>

            <div 
              className="absolute inset-0"
              style={{ 
                transform: `rotate(${compassRotation}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-6 w-2 bg-emerald-500"
                  style={{
                    top: '0',
                    left: '50%',
                    transformOrigin: 'bottom',
                    transform: `translateX(-50%) rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {needsCalibration && (
            <button 
              onClick={calibrateCompass}
              className="mt-6 flex items-center space-x-2 px-4 py-2 bg-emerald-600 
                        text-white rounded-full hover:bg-emerald-700 transition-colors"
            >
              <RotateCw size={16} />
              <span>{getTranslation("Calibrate Compass")}</span>
            </button>
          )}

          {userLocation && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400 flex items-center justify-center">
                <MapPin size={14} className="mr-1" />
                {userLocation.latitude.toFixed(4)}°, {userLocation.longitude.toFixed(4)}°
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QiblaFinder;
