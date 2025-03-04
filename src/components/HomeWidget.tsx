
import React, { useState, useEffect } from 'react';
import { getNextPrayer, getRamadanTimes, getMockPrayerTimes } from '../utils/prayerTimes';

const HomeWidget: React.FC = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const nextPrayer = getNextPrayer();
  const ramadanTimes = getRamadanTimes();
  
  // Determine if it's after Fajr but before Maghrib (fasting period)
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const isFasting = currentTime >= ramadanTimes.suhoor && currentTime < ramadanTimes.iftar;
  
  const countdownTime = isFasting ? ramadanTimes.iftar : ramadanTimes.suhoor;
  const countdownLabel = isFasting ? 'Iftar' : 'Suhoor';
  
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const [targetHour, targetMinute] = countdownTime.split(':').map(Number);
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Convert everything to minutes for easier comparison
      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      const targetTimeInMinutes = targetHour * 60 + targetMinute;
      
      // Calculate the difference in minutes
      let diffInMinutes;
      
      if (currentTimeInMinutes > targetTimeInMinutes) {
        // If current time is past target time, count to next day
        diffInMinutes = 24 * 60 - currentTimeInMinutes + targetTimeInMinutes;
      } else {
        // If current time is before target time, count to today's target
        diffInMinutes = targetTimeInMinutes - currentTimeInMinutes;
      }
      
      // Convert back to hours and minutes
      setHours(Math.floor(diffInMinutes / 60));
      setMinutes(diffInMinutes % 60);
    };
    
    // Initial update
    updateCountdown();
    
    // Update every minute
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, [countdownTime]);
  
  return (
    <div className="home-widget rounded-2xl overflow-hidden border border-islamic-blue/20 dark:border-islamic-blue/15">
      <div className="widget-header bg-islamic-blue/10 dark:bg-islamic-blue/15 p-3 text-center">
        <h3 className="font-semibold text-white">Ramadan Timekeeper</h3>
      </div>
      
      <div className="widget-content p-3 dark:text-gray-200">
        <div className="next-prayer flex justify-between items-center mb-3">
          <span className="text-sm dark:text-gray-300">Next Prayer:</span>
          <span className="font-medium text-islamic-blue dark:text-islamic-lightBlue">
            {nextPrayer ? `${nextPrayer.name} (${nextPrayer.time})` : 'Loading...'}
          </span>
        </div>
        
        <div className="countdown flex justify-between items-center">
          <span className="text-sm dark:text-gray-300">{countdownLabel} in:</span>
          <span className="font-medium text-islamic-blue dark:text-islamic-lightBlue">
            {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeWidget;
