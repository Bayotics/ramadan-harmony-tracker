
import React from 'react';

interface HeaderProps {
  title: string;
  showBismillah?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBismillah = false }) => {
  return (
    <header className="text-center py-6 mb-4">
      {showBismillah && (
        <div className="arabic-text text-xl md:text-2xl mb-4 animate-fade-in text-islamic-blue">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground animate-slide-down">
        {title}
      </h1>
      <div className="flex justify-center mt-2">
        <div className="w-16 h-1 bg-islamic-blue/50 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
