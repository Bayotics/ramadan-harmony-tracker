
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Compass, Moon, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-full flex flex-col bg-pattern">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border shadow-lg z-10">
        <div className="container max-w-lg mx-auto">
          <div className="flex justify-around items-center py-2">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
              <Home size={24} className="mb-1" />
              <span className="text-xs">Home</span>
            </Link>
            
            <Link to="/quran" className={`nav-item ${isActive('/quran') ? 'active' : ''}`}>
              <Book size={24} className="mb-1" />
              <span className="text-xs">Quran</span>
            </Link>
            
            <Link to="/qibla" className={`nav-item ${isActive('/qibla') ? 'active' : ''}`}>
              <Compass size={24} className="mb-1" />
              <span className="text-xs">Qibla</span>
            </Link>
            
            <Link to="/duas" className={`nav-item ${isActive('/duas') ? 'active' : ''}`}>
              <Moon size={24} className="mb-1" />
              <span className="text-xs">Duas</span>
            </Link>
            
            <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
              <Settings size={24} className="mb-1" />
              <span className="text-xs">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
