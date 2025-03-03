
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getPrayerTimes, getNextPrayer, PrayerTime } from '../utils/prayerTimes';
import { Bell } from 'lucide-react';

const PrayerTimes: React.FC = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  
  useEffect(() => {
    // Set up the initial data
    const times = getPrayerTimes();
    setPrayerTimes(times);
    setNextPrayer(getNextPrayer());
    
    // Update the current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setNextPrayer(getNextPrayer());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="prayer-times-container animate-fade-in">
      <div className="date-display text-center mb-4">
        <p className="text-muted-foreground">{format(currentDate, 'EEEE, MMMM d, yyyy')}</p>
        <p className="text-2xl font-semibold">{format(currentDate, 'h:mm a')}</p>
      </div>
      
      <div className="prayer-times-grid space-y-3">
        {prayerTimes.map((prayer) => (
          <div 
            key={prayer.name}
            className={`prayer-card flex justify-between items-center ${
              prayer.name === nextPrayer?.name ? 'bg-islamic-blue/10 border-islamic-blue/30' : ''
            }`}
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
              <button className="ml-2 text-muted-foreground hover:text-islamic-blue transition-colors">
                <Bell size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
