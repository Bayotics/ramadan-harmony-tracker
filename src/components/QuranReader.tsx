
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Bookmark, PlayCircle } from 'lucide-react';

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
      <div className="surah-header text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">{mockSurah.name}</h2>
        <div className="arabic-text text-xl">{mockSurah.arabicName}</div>
      </div>
      
      <div className="reader-controls flex justify-between items-center mb-4 glass-card rounded-lg p-3">
        <button className="text-islamic-blue hover:text-islamic-darkBlue transition-colors">
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-3">
          <button 
            className={`text-xs px-2 py-1 rounded ${showTranslation ? 'bg-islamic-blue text-white' : 'bg-secondary'}`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            Translation
          </button>
          
          <button 
            className={`text-xs px-2 py-1 rounded ${showTransliteration ? 'bg-islamic-blue text-white' : 'bg-secondary'}`}
            onClick={() => setShowTransliteration(!showTransliteration)}
          >
            Transliteration
          </button>
          
          <div className="flex items-center space-x-1">
            <button 
              className="text-xs px-2 py-1 rounded bg-secondary"
              onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
            >
              A-
            </button>
            
            <button 
              className="text-xs px-2 py-1 rounded bg-secondary"
              onClick={() => setFontSize(Math.min(1.5, fontSize + 0.1))}
            >
              A+
            </button>
          </div>
        </div>
        
        <button className="text-islamic-blue hover:text-islamic-darkBlue transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="verses-container space-y-6" style={{ fontSize: `${fontSize}rem` }}>
        {mockSurah.verses.map((verse) => (
          <div key={verse.id} className="verse glass-card rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="verse-number bg-islamic-blue/10 text-islamic-blue rounded-full w-8 h-8 flex items-center justify-center">
                {verse.id}
              </div>
              
              <div className="flex space-x-2">
                <button className="text-muted-foreground hover:text-islamic-blue transition-colors">
                  <Bookmark size={18} />
                </button>
                
                <button className="text-muted-foreground hover:text-islamic-blue transition-colors">
                  <PlayCircle size={18} />
                </button>
              </div>
            </div>
            
            <div className="arabic-text text-xl md:text-2xl mb-3">
              {verse.arabic}
            </div>
            
            {showTransliteration && (
              <div className="transliteration text-sm text-muted-foreground italic mb-2">
                {verse.transliteration}
              </div>
            )}
            
            {showTranslation && (
              <div className="translation text-sm md:text-base">
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
