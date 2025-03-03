
import { format } from 'date-fns';

// Prayer time interface
export interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
  nextPrayer?: boolean;
}

interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
      [key: string]: string;
    };
    date: {
      readable: string;
      timestamp: string;
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
    };
  };
}

// Get prayer times from the API based on coordinates
export const fetchPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTime[]> => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch prayer times');
    }
    
    const data = await response.json();
    const day = today.getDate() - 1; // API uses 0-based index for days
    const todayData = data.data[day];
    
    return [
      { name: 'Fajr', time: formatTime(todayData.timings.Fajr), arabicName: 'الفجر' },
      { name: 'Sunrise', time: formatTime(todayData.timings.Sunrise), arabicName: 'الشروق' },
      { name: 'Dhuhr', time: formatTime(todayData.timings.Dhuhr), arabicName: 'الظهر' },
      { name: 'Asr', time: formatTime(todayData.timings.Asr), arabicName: 'العصر' },
      { name: 'Maghrib', time: formatTime(todayData.timings.Maghrib), arabicName: 'المغرب' },
      { name: 'Isha', time: formatTime(todayData.timings.Isha), arabicName: 'العشاء' },
    ];
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    // Return mock data as fallback
    return getPrayerTimes();
  }
};

// Format time from API (removes the trailing (EET) or other timezone indicators)
const formatTime = (timeString: string): string => {
  return timeString.split(' ')[0];
};

// Mock prayer time data (used as fallback if API fails)
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

// Get next prayer based on real prayer times
export const getNextPrayer = (prayerTimes: PrayerTime[] = []): PrayerTime | null => {
  // If no prayer times provided, use the mock data
  const times = prayerTimes.length > 0 ? prayerTimes : getPrayerTimes();
  const currentTime = getCurrentTime();
  
  for (const prayer of times) {
    if (prayer.time > currentTime) {
      return { ...prayer, nextPrayer: true };
    }
  }
  
  // If no next prayer found today, return Fajr as the next prayer
  return { ...times[0], nextPrayer: true };
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
export const getRamadanTimes = (prayerTimes: PrayerTime[] = []): { suhoor: string; iftar: string } => {
  const times = prayerTimes.length > 0 ? prayerTimes : getPrayerTimes();
  
  // Find Fajr for Suhoor (subtract 30 minutes)
  const fajrTime = times.find(p => p.name === 'Fajr')?.time || '04:45';
  const [fajrHours, fajrMinutes] = fajrTime.split(':').map(Number);
  let suhoorHours = fajrHours;
  let suhoorMinutes = fajrMinutes - 30;
  
  if (suhoorMinutes < 0) {
    suhoorMinutes += 60;
    suhoorHours = (suhoorHours - 1 + 24) % 24;
  }
  
  const suhoor = `${suhoorHours.toString().padStart(2, '0')}:${suhoorMinutes.toString().padStart(2, '0')}`;
  
  // Find Maghrib for Iftar
  const iftar = times.find(p => p.name === 'Maghrib')?.time || '19:01';
  
  return {
    suhoor,
    iftar
  };
};
