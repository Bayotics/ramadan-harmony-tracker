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
    // Qibla page translations
    'Find Your Direction': 'Find Your Direction',
    'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer': 'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer',
    'How to use the Qibla Finder': 'How to use the Qibla Finder',
    'Hold your device flat with the screen facing up, away from electronic devices or metal objects': 'Hold your device flat with the screen facing up, away from electronic devices or metal objects',
    'Allow the compass to calibrate by moving your device in a figure-8 pattern': 'Allow the compass to calibrate by moving your device in a figure-8 pattern',
    'When ready, the blue needle will point towards the Qibla direction': 'When ready, the blue needle will point towards the Qibla direction',
    'For best results, use in an open area away from interference': 'For best results, use in an open area away from interference',
    'Mecca, Saudi Arabia': 'Mecca, Saudi Arabia',
    'The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca': 'The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca',
    'Compass accuracy depends on your device\'s sensors': 'Compass accuracy depends on your device\'s sensors',
    'The Kaaba is located at 21.4225°N, 39.8262°E': 'The Kaaba is located at 21.4225°N, 39.8262°E',
    'The first Qibla was Al-Aqsa Mosque before changing to the Kaaba': 'The first Qibla was Al-Aqsa Mosque before changing to the Kaaba',
    'Calibrating compass...': 'Calibrating compass...',
    'Please hold your device level': 'Please hold your device level',
    'Compass Access Required': 'Compass Access Required',
    'Please allow access to your device\'s compass to find Qibla direction': 'Please allow access to your device\'s compass to find Qibla direction',
    'Grant Permission': 'Grant Permission',
    'N': 'N',
    'E': 'E',
    'S': 'S',
    'W': 'W',
    'Kaaba': 'Kaaba',
    'Qibla Direction': 'Qibla Direction',
    'Direction': 'Direction',
    'Calibrate Compass': 'Calibrate Compass',
    'North': 'North',
    'Northeast': 'Northeast',
    'East': 'East',
    'Southeast': 'Southeast',
    'South': 'South',
    'Southwest': 'Southwest',
    'West': 'West',
    'Northwest': 'Northwest',
    'Permission Denied': 'Permission Denied',
    'Please allow compass access for accurate Qibla direction': 'Please allow compass access for accurate Qibla direction',
    'Calibrating Compass': 'Calibrating Compass',
    'Move your device in a figure-8 pattern': 'Move your device in a figure-8 pattern',
    'Calibration Complete': 'Calibration Complete',
    'Your compass is now calibrated': 'Your compass is now calibrated',
    'Error': 'Error',
    'Could not determine your location or Qibla direction': 'Could not determine your location or Qibla direction',
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
    // Qibla page translations in Arabic
    'Find Your Direction': 'اعثر على اتجاهك',
    'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer': 'وجّه جهازك نحو الاتجاه المبين أدناه للعثور على القبلة، الاتجاه الذي يواجهه المسلمون أثناء الصلاة',
    'How to use the Qibla Finder': 'كيفية استخدام مستكشف القبلة',
    'Hold your device flat with the screen facing up, away from electronic devices or metal objects': 'امسك جهازك بشكل مسطح مع توجيه الشاشة لأعلى، بعيدًا عن الأجهزة الإلكترونية أو الأشياء المعدنية',
    'Allow the compass to calibrate by moving your device in a figure-8 pattern': 'اسمح للبوصلة بالمعايرة عن طريق تحريك جهازك في نمط الرقم 8',
    'When ready, the blue needle will point towards the Qibla direction': 'عندما تكون جاهزًا، ستشير الإبرة الزرقاء نحو اتجاه القبلة',
    'For best results, use in an open area away from interference': 'للحصول على أفضل النتائج، استخدمه في منطقة مفتوحة بعيدًا عن التداخل',
    'Mecca, Saudi Arabia': 'مكة المكرمة، المملكة العربية السعودية',
    'The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca': 'القبلة هي الاتجاه الذي يواجهه المسلمون أثناء الصلاة، نحو الكعبة في مكة المكرمة',
    'Compass accuracy depends on your device\'s sensors': 'دقة البوصلة تعتمد على أجهزة استشعار جهازك',
    'The Kaaba is located at 21.4225°N, 39.8262°E': 'تقع الكعبة عند 21.4225° شمالاً، 39.8262° شرقاً',
    'The first Qibla was Al-Aqsa Mosque before changing to the Kaaba': 'كانت القبلة الأولى المسجد الأقصى قبل أن تتغير إلى الكعبة',
    'Calibrating compass...': 'جاري معايرة البوصلة...',
    'Please hold your device level': 'يرجى إبقاء جهازك مستويًا',
    'Compass Access Required': 'مطلوب الوصول إلى البوصلة',
    'Please allow access to your device\'s compass to find Qibla direction': 'يرجى السماح بالوصول إلى بوصلة جهازك للعثور على اتجاه القبلة',
    'Grant Permission': 'منح الإذن',
    'N': 'ش',
    'E': 'ش',
    'S': 'ج',
    'W': 'غ',
    'Kaaba': 'الكعبة',
    'Qibla Direction': 'اتجاه القبلة',
    'Direction': 'الاتجاه',
    'Calibrate Compass': 'معايرة البوصلة',
    'North': 'شمال',
    'Northeast': 'شمال شرق',
    'East': 'شرق',
    'Southeast': 'جنوب شرق',
    'South': 'جنوب',
    'Southwest': 'جنوب غرب',
    'West': 'غرب',
    'Northwest': 'شمال غرب',
    'Permission Denied': 'تم رفض الإذن',
    'Please allow compass access for accurate Qibla direction': 'يرجى السماح بالوصول إلى البوصلة للحصول على اتجاه القبلة الدقيق',
    'Calibrating Compass': 'معايرة البوصلة',
    'Move your device in a figure-8 pattern': 'حرك جهازك في نمط الرقم 8',
    'Calibration Complete': 'اكتملت المعايرة',
    'Your compass is now calibrated': 'تمت معايرة البوصلة الآن',
    'Error': 'خطأ',
    'Could not determine your location or Qibla direction': 'تعذر تحديد موقعك أو اتجاه القبلة',
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
    // Qibla page translations for French...
    'Find Your Direction': 'Trouvez Votre Direction',
    'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer': 'Orientez votre appareil vers la direction indiquée ci-dessous pour trouver la Qibla, la direction vers laquelle les musulmans se tournent pendant la prière',
    'How to use the Qibla Finder': 'Comment utiliser le Chercheur de Qibla',
    'Hold your device flat with the screen facing up, away from electronic devices or metal objects': 'Tenez votre appareil à plat avec l\'écran vers le haut, loin des appareils électroniques ou des objets métalliques',
    'Allow the compass to calibrate by moving your device in a figure-8 pattern': 'Permettez à la boussole de se calibrer en déplaçant votre appareil en forme de 8',
    'When ready, the blue needle will point towards the Qibla direction': 'Une fois prêt, l\'aiguille bleue pointera vers la direction de la Qibla',
    'For best results, use in an open area away from interference': 'Pour de meilleurs résultats, utilisez dans un espace ouvert à l\'écart des interférences',
    'Mecca, Saudi Arabia': 'La Mecque, Arabie Saoudite',
    'The Qibla is the direction Muslims face during prayer, toward the Kaaba in Mecca': 'La Qibla est la direction vers laquelle les musulmans se tournent pendant la prière, vers la Kaaba à La Mecque',
    'Compass accuracy depends on your device\'s sensors': 'La précision de la boussole dépend des capteurs de votre appareil',
    'The Kaaba is located at 21.4225°N, 39.8262°E': 'La Kaaba est située à 21.4225°N, 39.8262°E',
    'The first Qibla was Al-Aqsa Mosque before changing to the Kaaba': 'La première Qibla était la mosquée Al-Aqsa avant de changer pour la Kaaba',
    'N': 'N',
    'E': 'E',
    'S': 'S',
    'W': 'O',
    'Kaaba': 'Kaaba',
    'Qibla Direction': 'Direction de la Qibla',
    'Direction': 'Direction',
    'Calibrate Compass': 'Calibrer la Boussole',
    'North': 'Nord',
    'Northeast': 'Nord-Est',
    'East': 'Est',
    'Southeast': 'Sud-Est',
    'South': 'Sud',
    'Southwest': 'Sud-Ouest',
    'West': 'Ouest',
    'Northwest': 'Nord-Ouest',
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
    // Qibla page translations for Urdu...
    'Find Your Direction': 'اپنی سمت تلاش کریں',
    'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer': 'قبلہ تلاش کرنے کے لئے اپنے آلے کو نیچے دکھائی گئی سمت کی طرف رکھیں، وہ سمت جس کی طرف مسلمان نماز کے دوران منہ کرتے ہیں',
    'How to use the Qibla Finder': 'قبلہ فائنڈر کو کیسے استعمال کریں',
    'Hold your device flat with the screen facing up, away from electronic devices or metal objects': 'اپنے آلے کو اسکرین کے ساتھ اوپر کی طرف پکڑیں، الیکٹرانک آلات یا دھاتی اشیاء سے دور',
    'Allow the compass to calibrate by moving your device in a figure-8 pattern': 'اپنے آلے کو 8 کی شکل میں حرکت دے کر کمپاس کو کیلیبریٹ کرنے دیں',
    'When ready, the blue needle will point towards the Qibla direction': 'جب تیار ہو، نیلی سوئی قبلہ کی سمت کی طرف اشارہ کرے گی',
    'For best results, use in an open area away from interference': 'بہترین نتائج کے لئے، مداخلت سے دور کھلی جگہ میں استعمال کریں',
    'N': 'ش',
    'E': 'م',
    'S': 'ج',
    'W': 'م',
    'Kaaba': 'کعبہ',
    'Qibla Direction': 'قبلہ کی سمت',
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
    // Qibla page translations for Indonesian...
    'Find Your Direction': 'Temukan Arah Anda',
    'Point your device toward the direction shown below to find the Qibla, the direction Muslims face during prayer': 'Arahkan perangkat Anda ke arah yang ditunjukkan di bawah untuk menemukan Kiblat, arah yang dihadapi umat Islam saat shalat',
    'How to use the Qibla Finder': 'Cara menggunakan Pencari Kiblat',
    'Hold your device flat with the screen facing up, away from electronic devices or metal objects': 'Pegang perangkat Anda dengan layar menghadap ke atas, jauh dari perangkat elektronik atau benda logam',
    'Allow the compass to calibrate by moving your device in a figure-8 pattern': 'Biarkan kompas terkalibrasi dengan menggerakkan perangkat Anda dalam pola angka 8',
    'When ready, the blue needle will point towards the Qibla direction': 'Ketika siap, jarum biru akan menunjuk ke arah Kiblat',
    'For best results, use in an open area away from interference': 'Untuk hasil terbaik, gunakan di area terbuka jauh dari gangguan',
    'N': 'U',
    'E': 'T',
    'S': 'S',
    'W': 'B',
    'Kaaba': 'Ka\'bah',
    'Qibla Direction': 'Arah Kiblat',
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
