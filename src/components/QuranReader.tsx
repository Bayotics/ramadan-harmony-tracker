
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Bookmark, PlayCircle, Search, Settings } from 'lucide-react';

// Mock surah data for demo
const mockSurah = {
  name: "Al-Fatiha",
  arabicName: "الفاتحة",
  verses: [
    {
      id: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      transliteration: "Bismillahir rahmanir raheem"
    },
    {
      id: 2,
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      translation: "All praise is due to Allah, Lord of the worlds.",
      transliteration: "Alhamdu lillahi rabbil 'alamin"
    },
    {
      id: 3,
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Entirely Merciful, the Especially Merciful.",
      transliteration: "Ar-rahmanir-raheem"
    },
    {
      id: 4,
      arabic: "مَالِكِ يَوْمِ الدِّينِ",
      translation: "Sovereign of the Day of Recompense.",
      transliteration: "Maliki yawmid-deen"
    },
    {
      id: 5,
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      translation: "It is You we worship and You we ask for help.",
      transliteration: "Iyyaka na'budu wa iyyaka nasta'een"
    },
    {
      id: 6,
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      translation: "Guide us to the straight path.",
      transliteration: "Ihdinas-siratal-mustaqeem"
    },
    {
      id: 7,
      arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      transliteration: "Siratal-latheena an'amta 'alayhim, ghayril-maghdubi 'alayhim wa lad-daalleen"
    }
  ]
};

const QuranReader: React.FC = () => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [fontSize, setFontSize] = useState(1);
  
  return (
    <div className="quran-reader animate-fade-in">
      <div className="glass-card rounded-xl p-5 mb-6 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 shadow-lg">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search surah or verse..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-islamic-blue/20 focus:outline-none focus:ring-2 focus:ring-islamic-blue/30 bg-transparent"
          />
        </div>
      
        <div className="surah-header text-center mb-6">
          <h2 className="text-2xl font-bold mb-1 text-islamic-darkBlue">{mockSurah.name}</h2>
          <div className="arabic-text text-xl text-islamic-blue">{mockSurah.arabicName}</div>
        </div>
      </div>
      
      <div className="reader-controls flex justify-between items-center mb-5 glass-card rounded-xl p-3 border border-islamic-blue/20 bg-white/90 shadow-md">
        <button className="text-islamic-blue hover:text-islamic-darkBlue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10">
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-2">
          <button 
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${showTranslation ? 'bg-islamic-blue text-white' : 'bg-islamic-blue/10 text-islamic-blue'}`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            Translation
          </button>
          
          <button 
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${showTransliteration ? 'bg-islamic-blue text-white' : 'bg-islamic-blue/10 text-islamic-blue'}`}
            onClick={() => setShowTransliteration(!showTransliteration)}
          >
            Transliteration
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="text-xs px-2 py-1 rounded-full bg-islamic-blue/10 text-islamic-blue hover:bg-islamic-blue/20 transition-colors"
            onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
          >
            A-
          </button>
          
          <button 
            className="text-xs px-2 py-1 rounded-full bg-islamic-blue/10 text-islamic-blue hover:bg-islamic-blue/20 transition-colors"
            onClick={() => setFontSize(Math.min(1.5, fontSize + 0.1))}
          >
            A+
          </button>
          
          <button className="text-islamic-blue hover:text-islamic-darkBlue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10">
            <Settings size={18} />
          </button>
        </div>
        
        <button className="text-islamic-blue hover:text-islamic-darkBlue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="verses-container space-y-5" style={{ fontSize: `${fontSize}rem` }}>
        {mockSurah.verses.map((verse) => (
          <div key={verse.id} className="verse glass-card rounded-xl p-5 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="verse-number bg-islamic-blue/15 text-islamic-blue rounded-full w-8 h-8 flex items-center justify-center border border-islamic-blue/20">
                {verse.id}
              </div>
              
              <div className="flex space-x-2">
                <button className="text-muted-foreground hover:text-islamic-blue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10">
                  <Bookmark size={18} />
                </button>
                
                <button className="text-muted-foreground hover:text-islamic-blue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10">
                  <PlayCircle size={18} />
                </button>
              </div>
            </div>
            
            <div className="arabic-text text-xl md:text-2xl mb-4 leading-relaxed text-islamic-darkBlue">
              {verse.arabic}
            </div>
            
            {showTransliteration && (
              <div className="transliteration text-sm text-muted-foreground italic mb-2 bg-islamic-blue/5 p-2 rounded-lg">
                {verse.transliteration}
              </div>
            )}
            
            {showTranslation && (
              <div className="translation text-sm md:text-base text-muted-foreground">
                {verse.translation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranReader;
