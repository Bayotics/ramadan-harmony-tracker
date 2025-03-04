import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPrayerTimes } from '../utils/prayerTimes';
import { useLocation } from 'react-router-dom';

const UpcomingPrayerWidget = () => {
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [nextPrayerTime, setNextPrayerTime] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const { getTranslation } = useLanguage();
  const location = useLocation();

  const calculateTimeRemaining = (targetTime: Date) => {
    const now = new Date();
    const difference = targetTime.getTime() - now.getTime();

    if (difference > 0) {
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } else {
      return 'Prayer time!';
    }
  };

  useEffect(() => {
    const updatePrayerTimes = () => {
      const prayerTimes = getPrayerTimes();
      if (prayerTimes) {
        const now = new Date();
        let nextPrayerName: string | null = null;
        let nextPrayerDateTime: Date | null = null;

        if (now < prayerTimes.fajr) {
          nextPrayerName = 'Fajr';
          nextPrayerDateTime = prayerTimes.fajr;
        } else if (now < prayerTimes.sunrise) {
          nextPrayerName = 'Sunrise';
          nextPrayerDateTime = prayerTimes.sunrise;
        } else if (now < prayerTimes.dhuhr) {
          nextPrayerName = 'Dhuhr';
          nextPrayerDateTime = prayerTimes.dhuhr;
        } else if (now < prayerTimes.asr) {
          nextPrayerName = 'Asr';
          nextPrayerDateTime = prayerTimes.asr;
        } else if (now < prayerTimes.maghrib) {
          nextPrayerName = 'Maghrib';
          nextPrayerDateTime = prayerTimes.maghrib;
        } else if (now < prayerTimes.isha) {
          nextPrayerName = 'Isha';
          nextPrayerDateTime = prayerTimes.isha;
        } else {
          // If Isha has passed, set next prayer to Fajr of the next day
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0); // Reset time to midnight
          const tomorrowPrayerTimes = getPrayerTimes(tomorrow);
          if (tomorrowPrayerTimes) {
            nextPrayerName = 'Fajr';
            nextPrayerDateTime = tomorrowPrayerTimes.fajr;
          }
        }

        if (nextPrayerName && nextPrayerDateTime) {
          setNextPrayer(nextPrayerName);
          setNextPrayerTime(nextPrayerDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setTimeRemaining(calculateTimeRemaining(nextPrayerDateTime));
        } else {
          setNextPrayer(null);
          setNextPrayerTime(null);
          setTimeRemaining('');
        }
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
