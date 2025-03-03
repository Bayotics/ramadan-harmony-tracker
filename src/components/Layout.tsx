
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Compass, Moon, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Check for dark mode preference in localStorage on component mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-full flex flex-col bg-pattern dark:bg-gray-900 text-foreground">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 dark:bg-gray-800/90 backdrop-blur-lg border-t border-border dark:border-gray-700 shadow-lg z-10">
        <div className="container max-w-lg mx-auto">
          <div className="flex justify-around items-center py-3">
            <Link 
              to="/" 
              className={`nav-item flex flex-col items-center ${isActive('/') ? 'text-islamic-blue dark:text-islamic-lightBlue' : 'text-foreground dark:text-gray-300'}`}
            >
              <div className={`p-1.5 rounded-full mb-1 ${isActive('/') ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' : ''}`}>
                <Home size={22} />
              </div>
              <span className="text-xs">Home</span>
            </Link>
            
            <Link 
              to="/quran" 
              className={`nav-item flex flex-col items-center ${isActive('/quran') ? 'text-islamic-blue dark:text-islamic-lightBlue' : 'text-foreground dark:text-gray-300'}`}
            >
              <div className={`p-1.5 rounded-full mb-1 ${isActive('/quran') ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' : ''}`}>
                <Book size={22} />
              </div>
              <span className="text-xs">Quran</span>
            </Link>
            
            <Link 
              to="/qibla" 
              className={`nav-item flex flex-col items-center ${isActive('/qibla') ? 'text-islamic-blue dark:text-islamic-lightBlue' : 'text-foreground dark:text-gray-300'}`}
            >
              <div className={`p-1.5 rounded-full mb-1 ${isActive('/qibla') ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' : ''}`}>
                <Compass size={22} />
              </div>
              <span className="text-xs">Qibla</span>
            </Link>
            
            <Link 
              to="/duas" 
              className={`nav-item flex flex-col items-center ${isActive('/duas') ? 'text-islamic-blue dark:text-islamic-lightBlue' : 'text-foreground dark:text-gray-300'}`}
            >
              <div className={`p-1.5 rounded-full mb-1 ${isActive('/duas') ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' : ''}`}>
                <Moon size={22} />
              </div>
              <span className="text-xs">Duas</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`nav-item flex flex-col items-center ${isActive('/settings') ? 'text-islamic-blue dark:text-islamic-lightBlue' : 'text-foreground dark:text-gray-300'}`}
            >
              <div className={`p-1.5 rounded-full mb-1 ${isActive('/settings') ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' : ''}`}>
                <Settings size={22} />
              </div>
              <span className="text-xs">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
