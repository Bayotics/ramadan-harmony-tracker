
import React from 'react';

interface HeaderProps {
  title: string;
  showBismillah?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBismillah = false }) => {
  return (
    <header className="text-center py-6 mb-6">
      {showBismillah && (
        <div className="arabic-text text-xl md:text-2xl mb-4 animate-fade-in text-islamic-blue/90">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-islamic-darkBlue animate-slide-down">
        {title}
      </h1>
      <div className="flex justify-center mt-2">
        <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-islamic-blue/30 via-islamic-blue/70 to-islamic-blue/30"></div>
      </div>
    </header>
  );
};

export default Header;
