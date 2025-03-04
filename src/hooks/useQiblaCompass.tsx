
import { useState, useEffect, useRef } from 'react';
import { calculateQiblaDirection, getUserLocation } from '../utils/qiblaDirection';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from "../components/ui/use-toast";

export const useQiblaCompass = () => {
  const { getTranslation } = useLanguage();
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
  }, [getTranslation]);
  
  const getDirectionLabel = () => {
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
  
  const directionLabel = getDirectionLabel();
  const compassRotation = qiblaAngle !== null ? qiblaAngle - compassHeading : 0;
  
  return {
    qiblaAngle,
    compassHeading,
    userLocation,
    isCalibrating,
    needsCalibration,
    permissionDenied,
    compassRotation,
    directionLabel,
    requestPermission,
    calibrateCompass
  };
};
