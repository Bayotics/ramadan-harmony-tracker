
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Moon, Sun, Bell, Globe, Heart } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <div className="page-container">
        <Header title="Settings" />
        
        <div className="settings-sections space-y-8">
          <div className="setting-group glass-card rounded-xl p-5">
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
          
          <div className="setting-group glass-card rounded-xl p-5">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Sun size={20} className="mr-2 text-islamic-blue" />
              Display
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">24-Hour Format</p>
                  <p className="text-sm text-muted-foreground">Display times in 24-hour format</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-blue"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="setting-group glass-card rounded-xl p-5">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Globe size={20} className="mr-2 text-islamic-blue" />
              Language
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-2">Select Language</p>
                <select className="w-full p-2 rounded-lg border border-border bg-background">
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                  <option value="fr">Français (French)</option>
                  <option value="ur">اردو (Urdu)</option>
                  <option value="id">Bahasa Indonesia</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="setting-group glass-card rounded-xl p-5">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Heart size={20} className="mr-2 text-islamic-blue" />
              Support the App
            </h3>
            
            <div className="space-y-4">
              <p className="text-sm">
                If you find this app helpful and would like to support its development, please consider making a donation.
              </p>
              
              <button className="w-full bg-islamic-blue text-white py-2 px-4 rounded-lg hover:bg-islamic-blue/90 transition-colors">
                Donate via PayPal
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Ramadan Timekeeper v1.0
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Made with love for the Ummah by Tahirah Shobaloju
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
