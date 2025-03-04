
import React, { useState, useEffect } from 'react';
import { getNextPrayer, getTimeRemaining, formatAmPmTime } from '../utils/prayerTimes';

const UpcomingPrayerWidget: React.FC = () => {
  const [nextPrayer, setNextPrayer] = useState(getNextPrayer());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const updateCountdown = () => {
      if (nextPrayer) {
        const { hours: h, minutes: m, seconds: s } = getTimeRemaining(nextPrayer.time);
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }
    };
    
    // Initial update
    updateCountdown();
    
    // Update every second
    const interval = setInterval(() => {
      updateCountdown();
      
      // Also check if we need to update the next prayer (every minute)
      if (seconds === 0) {
        setNextPrayer(getNextPrayer());
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [nextPrayer, seconds]);
  
  if (!nextPrayer) return null;
  
  const formattedTime = formatAmPmTime(nextPrayer.time);
  
  return (
    <div className="upcoming-prayer-widget rounded-xl overflow-hidden">
      <div className="widget-content bg-gradient-to-br from-gray-900 to-blue-950 text-white p-5 text-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-10"></div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-medium mb-1">Upcoming Prayer</h2>
          <h3 className="text-2xl font-bold mb-4">{nextPrayer.name}</h3>
          
          <div className="countdown-timer text-5xl font-bold tracking-wider mb-3">
            {hours.toString().padStart(2, '0')}:
            {minutes.toString().padStart(2, '0')}:
            {seconds.toString().padStart(2, '0')}
          </div>
          
          <div className="prayer-time text-xl">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrayerWidget;
