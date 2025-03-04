import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchPrayerTimes, getNextPrayer, PrayerTime, getMockPrayerTimes } from '../utils/prayerTimes';
import { Bell, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PrayerTimes: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        setLoading(true);
        setLocationStatus('loading');
        
        // Get user's location
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Get location name from coordinates using reverse geocoding
              try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                const locationName = data.address ? 
                  `${data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown'}` : 
                  'Your location';
                
                localStorage.setItem('userLocationName', locationName);
              } catch (error) {
                console.error('Error getting location name:', error);
              }
              
              const times = await fetchPrayerTimes(latitude, longitude);
              setPrayerTimes(times);
              setNextPrayer(getNextPrayer(times));
              setLocationStatus('success');
              toast.success('Prayer times updated for your location');
              setLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fall back to default prayer times
              const times = getMockPrayerTimes();
              setPrayerTimes(times);
              setNextPrayer(getNextPrayer(times));
              setLocationStatus('error');
              toast.error('Could not get your location. Using default prayer times.');
              setLoading(false);
            },
            { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
          );
        } else {
          // Geolocation not supported
          const times = getMockPrayerTimes();
          setPrayerTimes(times);
          setNextPrayer(getNextPrayer(times));
          setLocationStatus('error');
          toast.error('Geolocation is not supported by your browser. Using default prayer times.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error setting up prayer times:', error);
        // Fall back to default prayer times
        const times = getMockPrayerTimes();
        setPrayerTimes(times);
        setNextPrayer(getNextPrayer(times));
        setLocationStatus('error');
        setLoading(false);
      }
    };
    
    fetchTimes();
    
    // Update the current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setNextPrayer(getNextPrayer(prayerTimes));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleRefreshLocation = () => {
    // Re-fetch prayer times with user's current location
    setPrayerTimes([]);
    setNextPrayer(null);
    setLoading(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get location name from coordinates using reverse geocoding
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const locationName = data.address ? 
              `${data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown'}` : 
              'Your location';
            
            localStorage.setItem('userLocationName', locationName);
          } catch (error) {
            console.error('Error getting location name:', error);
          }
          
          const times = await fetchPrayerTimes(latitude, longitude);
          setPrayerTimes(times);
          setNextPrayer(getNextPrayer(times));
          setLocationStatus('success');
          toast.success('Prayer times refreshed for your location');
          setLoading(false);
        },
        (error) => {
          console.error('Geolocation refresh error:', error);
          const times = getMockPrayerTimes();
          setPrayerTimes(times);
          setNextPrayer(getNextPrayer(times));
          setLocationStatus('error');
          toast.error('Could not refresh your location');
          setLoading(false);
        },
        { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  };
  
  // Get the user's location name from localStorage
  const userLocationName = localStorage.getItem('userLocationName') || 'Your location';
  
  // Function to handle alarm toggles
  const toggleAlarm = (prayerName: string) => {
    toast('Prayer alarm feature coming soon', {
      description: `You'll receive notifications before ${prayerName} prayer time.`,
      icon: <Bell className="h-5 w-5 text-islamic-blue" />
    });
  };
  
  return (
    <div className="prayer-times-container animate-fade-in p-4">
      <div className="date-display text-center mb-6">
        <p className="text-muted-foreground">{format(currentDate, 'EEEE, MMMM d, yyyy')}</p>
        <p className="text-2xl font-semibold text-white">{format(currentDate, 'h:mm a')}</p>
        
        <div className="location-indicator flex items-center justify-center mt-2">
          {locationStatus === 'loading' && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Loader2 size={14} className="mr-1 animate-spin" />
              <span>Detecting location...</span>
            </div>
          )}
          
          {locationStatus === 'success' && (
            <div className="flex items-center text-sm text-islamic-green">
              <MapPin size={14} className="mr-1" />
              <span>{userLocationName}</span>
              <button 
                onClick={handleRefreshLocation}
                className="ml-2 text-islamic-blue hover:text-islamic-darkBlue transition-colors text-xs underline"
              >
                Refresh
              </button>
            </div>
          )}
          
          {locationStatus === 'error' && (
            <div className="flex items-center text-sm text-islamic-gold">
              <MapPin size={14} className="mr-1" />
              <span>Using default location</span>
              <button 
                onClick={handleRefreshLocation}
                className="ml-2 text-islamic-blue hover:text-islamic-darkBlue transition-colors text-xs underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 size={30} className="animate-spin text-islamic-blue mb-2" />
          <p className="text-muted-foreground">Loading prayer times...</p>
        </div>
      ) : (
        <div className="prayer-times-grid space-y-3">
          {prayerTimes.map((prayer) => (
            <div 
              key={prayer.name}
              className={`prayer-card flex justify-between items-center p-4 rounded-lg shadow-sm border ${
                prayer.name === nextPrayer?.name 
                  ? 'bg-islamic-blue/10 border-islamic-blue/30' 
                  : 'bg-white/80 border-gray-100'
              } transition-all duration-300 hover:shadow-md`}
            >
              <div className="prayer-info">
                <h3 className="font-semibold text-lg">{prayer.name}</h3>
                <div className="arabic-text text-muted-foreground">{prayer.arabicName}</div>
              </div>
              
              <div className="prayer-time-info flex items-center">
                {prayer.name === nextPrayer?.name && (
                  <span className="bg-islamic-blue text-white text-xs px-2 py-1 rounded-full mr-2 animate-pulse-gentle">
                    Next
                  </span>
                )}
                <span className="text-xl font-medium">{prayer.time}</span>
                <button 
                  className="ml-2 text-muted-foreground hover:text-islamic-blue transition-colors"
                  onClick={() => toggleAlarm(prayer.name)}
                >
                  <Bell size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrayerTimes;
