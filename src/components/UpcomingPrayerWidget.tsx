
import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getMockPrayerTimes, getNextPrayer, getTimeRemaining } from '../utils/prayerTimes';
import { useLocation } from 'react-router-dom';

const UpcomingPrayerWidget = () => {
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [nextPrayerTime, setNextPrayerTime] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const { getTranslation } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const updatePrayerTimes = () => {
      const nextPrayerInfo = getNextPrayer();
      if (nextPrayerInfo) {
        setNextPrayer(nextPrayerInfo.name);
        setNextPrayerTime(nextPrayerInfo.time);

        // Calculate time remaining
        const remaining = getTimeRemaining(nextPrayerInfo.time);
        setTimeRemaining(`${remaining.hours}h ${remaining.minutes}m`);
      } else {
        setNextPrayer(null);
        setNextPrayerTime(null);
        setTimeRemaining('');
      }
    };

    updatePrayerTimes();
    const intervalId = setInterval(updatePrayerTimes, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <div className="upcoming-prayer-widget glass-card rounded-xl overflow-hidden border border-islamic-gold/30 shadow-lg">
      <div className="bg-gradient-to-r from-islamic-blue/90 to-islamic-green/90 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg flex items-center">
            <Clock size={18} className="mr-2 text-islamic-gold" />
            {getTranslation('up_next')}
          </h3>
          {nextPrayer && (
            <span className="text-islamic-gold font-bold">{nextPrayer}</span>
          )}
        </div>
        
        <div className="mt-2 flex justify-between items-end">
          {nextPrayerTime && (
            <span className="text-xl font-bold">{nextPrayerTime}</span>
          )}
          {timeRemaining && (
            <span className="text-islamic-cream/90 text-sm">
              {timeRemaining}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingPrayerWidget;
