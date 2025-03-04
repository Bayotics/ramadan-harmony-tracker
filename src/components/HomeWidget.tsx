
import React from 'react';
import { getNextPrayer, getRamadanTimes, getTimeRemaining, getMockPrayerTimes } from '../utils/prayerTimes';

const HomeWidget: React.FC = () => {
  const nextPrayer = getNextPrayer();
  const ramadanTimes = getRamadanTimes();
  
  // Determine if it's after Fajr but before Maghrib (fasting period)
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  const isFasting = currentTime >= ramadanTimes.suhoor && currentTime < ramadanTimes.iftar;
  
  const countdownTime = isFasting ? ramadanTimes.iftar : ramadanTimes.suhoor;
  const countdownLabel = isFasting ? 'Iftar' : 'Suhoor';
  const { hours, minutes } = getTimeRemaining(countdownTime);
  
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
