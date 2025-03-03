
// This is a simplified version of qibla direction calculation
// In a real app, this would use more accurate formulas and device sensors

// Coordinates of the Kaaba in Mecca
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

// Calculate qibla direction based on user's coordinates
export const calculateQiblaDirection = (userLat: number, userLng: number): number => {
  // Convert to radians
  const userLatRad = (userLat * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const lngDiffRad = ((KAABA_LNG - userLng) * Math.PI) / 180;
  
  // Calculate qibla angle
  const y = Math.sin(lngDiffRad);
  const x = Math.cos(userLatRad) * Math.tan(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(lngDiffRad);
  const qiblaAngle = Math.atan2(y, x);
  
  // Convert to degrees and normalize to a value between 0 and 360
  let qiblaDegrees = (qiblaAngle * 180) / Math.PI;
  qiblaDegrees = (qiblaDegrees + 360) % 360;
  
  return qiblaDegrees;
};

// Get user's current location
export const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to New York coordinates for demo purposes
          resolve({ latitude: 40.7128, longitude: -74.0060 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      // Default to New York coordinates for demo purposes
      resolve({ latitude: 40.7128, longitude: -74.0060 });
    }
  });
};
