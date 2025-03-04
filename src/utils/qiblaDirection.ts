
// Enhanced Qibla direction calculation with improved accuracy

// Coordinates of the Kaaba in Mecca (more precise values)
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

/**
 * Calculate qibla direction based on user's coordinates
 * Using the Spherical Law of Cosines formula for better accuracy
 */
export const calculateQiblaDirection = (userLat: number, userLng: number): number => {
  // Convert to radians
  const userLatRad = toRadians(userLat);
  const kaabaLatRad = toRadians(KAABA_LAT);
  const lngDiffRad = toRadians(KAABA_LNG - userLng);
  
  // Calculate qibla angle using the Spherical Law of Cosines
  const y = Math.sin(lngDiffRad);
  const x = Math.cos(userLatRad) * Math.tan(kaabaLatRad) - Math.sin(userLatRad) * Math.cos(lngDiffRad);
  const qiblaAngle = Math.atan2(y, x);
  
  // Convert to degrees and normalize to a value between 0 and 360
  let qiblaDegrees = toDegrees(qiblaAngle);
  qiblaDegrees = (qiblaDegrees + 360) % 360;
  
  return qiblaDegrees;
};

// Convert degrees to radians
const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

// Convert radians to degrees
const toDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

// Calculate distance to Kaaba in kilometers
export const calculateDistanceToKaaba = (userLat: number, userLng: number): number => {
  const R = 6371; // Earth's radius in kilometers
  
  const userLatRad = toRadians(userLat);
  const kaabaLatRad = toRadians(KAABA_LAT);
  const latDiffRad = toRadians(KAABA_LAT - userLat);
  const lngDiffRad = toRadians(KAABA_LNG - userLng);
  
  // Haversine formula for distance calculation
  const a = 
    Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
    Math.cos(userLatRad) * Math.cos(kaabaLatRad) * 
    Math.sin(lngDiffRad / 2) * Math.sin(lngDiffRad / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance);
};

// Get user's current location with better error handling
export const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: true,  // Try to get the most accurate position
        timeout: 10000,            // Time to wait for a position, in milliseconds
        maximumAge: 0              // No cached positions
      };
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // More specific error handling
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out');
              break;
            default:
              console.error('An unknown error occurred');
          }
          // Default to Mecca coordinates (better than New York for a Muslim app)
          resolve({ latitude: 24.7136, longitude: 46.6753 }); // Riyadh as fallback
        },
        geoOptions
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      resolve({ latitude: 24.7136, longitude: 46.6753 }); // Riyadh as fallback
    }
  });
};
