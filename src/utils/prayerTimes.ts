
import { format } from 'date-fns';

// Prayer time interface
export interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
  nextPrayer?: boolean;
}

// Mock prayer time data (in a real app, this would come from an API like Aladhan)
export const getPrayerTimes = (date = new Date()): PrayerTime[] => {
  // In a real implementation, this would call an API like Aladhan
  // For this demo, we'll return mock data
  return [
    { name: 'Fajr', time: '04:45', arabicName: 'الفجر' },
    { name: 'Sunrise', time: '06:15', arabicName: 'الشروق' },
    { name: 'Dhuhr', time: '12:30', arabicName: 'الظهر' },
    { name: 'Asr', time: '16:15', arabicName: 'العصر' },
    { name: 'Maghrib', time: '19:01', arabicName: 'المغرب' },
    { name: 'Isha', time: '20:30', arabicName: 'العشاء' },
  ];
};

// Get current time in HH:MM format
export const getCurrentTime = (): string => {
  return format(new Date(), 'HH:mm');
};

// Get next prayer
export const getNextPrayer = (): PrayerTime | null => {
  const prayerTimes = getPrayerTimes();
  const currentTime = getCurrentTime();
  
  for (const prayer of prayerTimes) {
    if (prayer.time > currentTime) {
      return { ...prayer, nextPrayer: true };
    }
  }
  
  // If no next prayer found today, return Fajr as the next prayer
  return { ...prayerTimes[0], nextPrayer: true };
};

// Calculate time remaining until a prayer
export const getTimeRemaining = (prayerTime: string): { hours: number; minutes: number } => {
  const [prayerHours, prayerMinutes] = prayerTime.split(':').map(Number);
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const prayer = prayerHours * 60 + prayerMinutes;
  
  let diff = prayer - current;
  if (diff < 0) {
    diff += 24 * 60; // Add a day if prayer is tomorrow
  }
  
  return {
    hours: Math.floor(diff / 60),
    minutes: diff % 60
  };
};

// For demonstration, let's define iftar and suhoor times
export const getRamadanTimes = (): { suhoor: string; iftar: string } => {
  // In reality, these would be calculated based on location and date
  return {
    suhoor: '04:15',
    iftar: '19:01' // Usually matches Maghrib prayer time
  };
};
