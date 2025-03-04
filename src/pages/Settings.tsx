import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Moon, Sun, Bell, Globe, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage, LanguageType } from '../contexts/LanguageContext';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is24HourFormat, setIs24HourFormat] = useState(false);
  const { language, setLanguage, getTranslation } = useLanguage();
  
  useEffect(() => {
    const darkModeSetting = localStorage.getItem('darkMode') === 'true';
    const hourFormatSetting = localStorage.getItem('24HourFormat') === 'true';
    
    setIsDarkMode(darkModeSetting);
    setIs24HourFormat(hourFormatSetting);
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    localStorage.setItem('darkMode', String(newDarkModeState));
    
    if (newDarkModeState) {
      document.documentElement.classList.add('dark');
      toast.success(getTranslation('dark_mode'));
    } else {
      document.documentElement.classList.remove('dark');
      toast.success(getTranslation('light_mode'));
    }
  };
  
  const toggle24HourFormat = () => {
    const newFormatState = !is24HourFormat;
    setIs24HourFormat(newFormatState);
    localStorage.setItem('24HourFormat', String(newFormatState));
    toast.success(newFormatState ? getTranslation('hour_format_24') : getTranslation('hour_format_12'));
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LanguageType;
    setLanguage(newLanguage);
    toast.success(`Language changed to ${getLanguageName(newLanguage)}`);
  };
  
  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      'en': 'English',
      'ar': 'العربية (Arabic)',
      'fr': 'Français (French)',
      'ur': 'اردو (Urdu)',
      'id': 'Bahasa Indonesia'
    };
    return languages[code] || 'Unknown';
  };
  
  return (
    <Layout>
      <div className="page-container">
        <Header title={getTranslation('settings')} />
        
        <div className="settings-sections space-y-8">
          <div className="setting-group glass-card rounded-xl p-5 dark:bg-gray-800/90 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Bell size={20} className="mr-2 text-islamic-blue" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Prayer Times</p>
                  <p className="text-sm text-muted-foreground">Receive notifications for prayer times</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Suhoor Reminder</p>
                  <p className="text-sm text-muted-foreground">30 minutes before Suhoor ends</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Iftar Reminder</p>
                  <p className="text-sm text-muted-foreground">15 minutes before Iftar</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="setting-group glass-card rounded-xl p-5 dark:bg-gray-800/90 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Sun size={20} className="mr-2 text-islamic-blue" />
              Display
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Switch between light and dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">24-Hour Format</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Display times in 24-hour format</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={is24HourFormat}
                    onChange={toggle24HourFormat}
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="setting-group glass-card rounded-xl p-5 dark:bg-gray-800/90 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Globe size={20} className="mr-2 text-islamic-blue" />
              Language
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Select Language</p>
                <select 
                  className="w-full p-2 rounded-lg border border-border dark:border-gray-700 bg-background dark:bg-gray-700"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                  <option value="fr">Français (French)</option>
                  <option value="ur">اردو (Urdu)</option>
                  <option value="id">Bahasa Indonesia</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="setting-group glass-card rounded-xl p-5 dark:bg-gray-800/90 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Heart size={20} className="mr-2 text-islamic-blue" />
              Support the App
            </h3>
            
            <div className="space-y-4">
              <p className="text-sm dark:text-gray-300">
                {getTranslation('donation_text')}
              </p>
              
              <a 
                href="https://www.paypal.com/donate/?business=CB2Y4PCSEG3WU&no_recurring=0&currency_code=USD"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-islamic-blue text-white py-2 px-4 rounded-lg hover:bg-islamic-blue/90 transition-colors text-center"
              >
                Donate via PayPal
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Ramadan Timekeeper v1.0
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {getTranslation('made_with_love')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
