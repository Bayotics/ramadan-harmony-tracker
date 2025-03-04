
import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageType = 'en' | 'ar' | 'fr' | 'ur' | 'id';

type LanguageContextType = {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  getTranslation: (key: string) => string;
};

// Default translations in English
const translations: Record<LanguageType, Record<string, string>> = {
  en: {
    'home': 'Home',
    'quran': 'Quran',
    'qibla': 'Qibla',
    'duas': 'Duas',
    'settings': 'Settings',
    'prayer_times': 'Prayer Times',
    'ramadan_reminder': 'Ramadan Reminder',
    'fasting_tip': 'Fasting Tip',
    'daily_duas': 'Daily Duas',
    'up_next': 'Up Next',
    'donation_text': 'Your donation helps provide meals for those fasting and improves this app for the global Muslim community.',
    'support_btn': 'Support Ramadan Timekeeper',
    'made_with_love': 'Made with love for the Ummah by Tahirah Shobaloju',
    'join_us': 'Join us in spreading kindness and making prayer times more accessible.',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    'hour_format_24': '24-hour format enabled',
    'hour_format_12': '12-hour format enabled',
  },
  ar: {
    'home': 'الرئيسية',
    'quran': 'القرآن',
    'qibla': 'القبلة',
    'duas': 'الأدعية',
    'settings': 'الإعدادات',
    'prayer_times': 'أوقات الصلاة',
    'ramadan_reminder': 'تذكير رمضان',
    'fasting_tip': 'نصيحة الصيام',
    'daily_duas': 'الأدعية اليومية',
    'up_next': 'التالي',
    'donation_text': 'تبرعك يساعد في توفير وجبات للصائمين وتحسين هذا التطبيق للمجتمع الإسلامي العالمي.',
    'support_btn': 'دعم حافظ الوقت رمضان',
    'made_with_love': 'صنع بحب للأمة من طاهرة شوبالوجو',
    'join_us': 'انضم إلينا في نشر اللطف وجعل أوقات الصلاة أكثر سهولة.',
    'dark_mode': 'الوضع الداكن',
    'light_mode': 'الوضع الفاتح',
    'hour_format_24': 'تم تمكين تنسيق 24 ساعة',
    'hour_format_12': 'تم تمكين تنسيق 12 ساعة',
  },
  fr: {
    'home': 'Accueil',
    'quran': 'Coran',
    'qibla': 'Qibla',
    'duas': 'Invocations',
    'settings': 'Paramètres',
    'prayer_times': 'Heures de Prière',
    'ramadan_reminder': 'Rappel de Ramadan',
    'fasting_tip': 'Conseil de Jeûne',
    'daily_duas': 'Invocations Quotidiennes',
    'up_next': 'À venir',
    'donation_text': 'Votre don aide à fournir des repas pour ceux qui jeûnent et améliore cette application pour la communauté musulmane mondiale.',
    'support_btn': 'Soutenir Ramadan Timekeeper',
    'made_with_love': 'Fait avec amour pour la Oummah par Tahirah Shobaloju',
    'join_us': 'Rejoignez-nous pour répandre la gentillesse et rendre les heures de prière plus accessibles.',
    'dark_mode': 'Mode Sombre',
    'light_mode': 'Mode Clair',
    'hour_format_24': 'Format 24 heures activé',
    'hour_format_12': 'Format 12 heures activé',
  },
  ur: {
    'home': 'گھر',
    'quran': 'قرآن',
    'qibla': 'قبلہ',
    'duas': 'دعائیں',
    'settings': 'ترتیبات',
    'prayer_times': 'نماز کے اوقات',
    'ramadan_reminder': 'رمضان کی یاد دہانی',
    'fasting_tip': 'روزے کی تجویز',
    'daily_duas': 'روزانہ کی دعائیں',
    'up_next': 'اگلا',
    'donation_text': 'آپ کا عطیہ روزہ داروں کے لئے کھانا فراہم کرنے اور عالمی مسلم کمیونٹی کے لئے اس ایپ کو بہتر بنانے میں مدد کرتا ہے۔',
    'support_btn': 'رمضان ٹائم کیپر کی حمایت کریں',
    'made_with_love': 'طاہرہ شوبالوجو کی طرف سے امت کے لئے محبت سے بنایا گیا',
    'join_us': 'مہربانی پھیلانے اور نماز کے اوقات کو زیادہ قابل رسائی بنانے میں ہمارے ساتھ شامل ہوں۔',
    'dark_mode': 'ڈارک موڈ',
    'light_mode': 'لائٹ موڈ',
    'hour_format_24': '24 گھنٹے کا فارمیٹ فعال',
    'hour_format_12': '12 گھنٹے کا فارمیٹ فعال',
  },
  id: {
    'home': 'Beranda',
    'quran': 'Quran',
    'qibla': 'Qibla',
    'duas': 'Doa',
    'settings': 'Pengaturan',
    'prayer_times': 'Waktu Shalat',
    'ramadan_reminder': 'Pengingat Ramadhan',
    'fasting_tip': 'Tips Puasa',
    'daily_duas': 'Doa Harian',
    'up_next': 'Selanjutnya',
    'donation_text': 'Donasi Anda membantu menyediakan makanan bagi yang berpuasa dan meningkatkan aplikasi ini untuk komunitas Muslim global.',
    'support_btn': 'Dukung Ramadan Timekeeper',
    'made_with_love': 'Dibuat dengan cinta untuk Umat oleh Tahirah Shobaloju',
    'join_us': 'Bergabunglah dengan kami dalam menyebarkan kebaikan dan membuat waktu shalat lebih mudah diakses.',
    'dark_mode': 'Mode Gelap',
    'light_mode': 'Mode Terang',
    'hour_format_24': 'Format 24 jam diaktifkan',
    'hour_format_12': 'Format 12 jam diaktifkan',
  }
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  getTranslation: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
      if (savedLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Handle RTL for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    
    // Force refresh UI components
    window.dispatchEvent(new Event('language-changed'));
  };

  const getTranslation = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
