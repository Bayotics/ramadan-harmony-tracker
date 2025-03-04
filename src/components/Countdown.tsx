
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
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const [targetHour, targetMinute] = targetTime.split(':').map(Number);
      
      let diffHours = targetHour - currentHour;
      let diffMinutes = targetMinute - currentMinute;
      
      if (diffMinutes < 0) {
        diffMinutes += 60;
        diffHours -= 1;
      }
      
      if (diffHours < 0) {
        diffHours += 24; // Add 24 hours if target is tomorrow
      }
      
      setHours(diffHours);
      setMinutes(diffMinutes);
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
