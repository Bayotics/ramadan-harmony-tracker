
import React, { useState, useEffect } from 'react';
import { getRamadanTimes } from '../utils/prayerTimes';

interface CountdownProps {
  type: 'iftar' | 'suhoor';
}

const Countdown: React.FC<CountdownProps> = ({ type }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [timeLabel, setTimeLabel] = useState<string>('');
  
  useEffect(() => {
    const ramadanTimes = getRamadanTimes();
    const targetTime = type === 'iftar' ? ramadanTimes.iftar : ramadanTimes.suhoor;
    setTimeLabel(targetTime);
    
    const updateCountdown = () => {
      const now = new Date();
      
      // For Suhoor, we need to handle it differently since it's for "time until end"
      if (type === 'suhoor') {
        // If current time is after Suhoor (e.g., during day), countdown to next day's Suhoor
        const [targetHour, targetMinute] = targetTime.split(':').map(Number);
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
      } 
      // For Iftar, similar logic
      else {
        const [targetHour, targetMinute] = targetTime.split(':').map(Number);
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
      }
    };
    
    // Initial update
    updateCountdown();
    
    // Update every minute
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, [type]);
  
  return (
    <div className={`countdown-container glass-card rounded-xl p-4 border ${
      type === 'iftar' ? 'border-islamic-gold/30' : 'border-islamic-blue/30'
    }`}>
      <h3 className="text-center font-semibold mb-2">
        {type === 'iftar' ? 'Iftar' : 'Suhoor'} Time: <span className="text-islamic-blue">{timeLabel}</span>
      </h3>
      
      <div className="countdown-display flex justify-center items-center space-x-2">
        <div className={`countdown-timer ${
          type === 'iftar' ? 'text-islamic-gold' : 'text-islamic-blue'
        }`}>
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
        </div>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-2">
        {type === 'iftar' ? 'Time until breaking fast' : 'Time until end of suhoor'}
      </p>
    </div>
  );
};

export default Countdown;
