
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, FileText, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const surahsData = {
  1: {
    name: "Al-Fatiha",
    arabicName: "الفاتحة",
    number: 1,
    translation: "The Opening",
    location: "Meccan",
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
  },
  2: {
    name: "Al-Baqara",
    arabicName: "البقرة",
    number: 2,
    translation: "The Cow",
    location: "Medinan",
    verses: [
      {
        id: 1,
        arabic: "الم",
        translation: "Alif, Lam, Meem.",
        transliteration: "Alif Lam Meem"
      },
      {
        id: 2,
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
        translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
        transliteration: "Thalika alkitabu la rayba feehi hudan lilmuttaqeen"
      },
      {
        id: 3,
        arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
        translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them.",
        transliteration: "Allatheena yu/minoona bialghaybi wayuqeemoona alssalata wamimma razaqnahum yunfiqoon"
      },
      {
        id: 19,
        arabic: "أَوْ كَصَيِّبٍ مِّنَ السَّمَاءِ فِيهِ ظُلُمَاتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِم مِّنَ الصَّوَاعِقِ حَذَرَ الْمَوْتِ ۚ وَاللَّهُ مُحِيطٌ بِالْكَافِرِينَ",
        translation: "Or like a rainstorm from the sky, wherein is darkness, thunder and the flash of lightning. They thrust their fingers in their ears by reason of the thunder-claps, for fear of death. Allah encompasses the disbelievers (in His guidance, His omniscience and His omnipotence).",
        transliteration: "Aw kasayyibin mina alssamai feehi thulumatun waraAAdun wabarqun yajAAaloona asabiAAahum fee athanihim mina alssawaAAiqi hathara almawti waAllahu muheetun bialkafireena"
      },
      {
        id: 20,
        arabic: "يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ ۖ كُلَّمَا أَضَاءَ لَهُم مَّشَوْا فِيهِ وَإِذَا أَظْلَمَ عَلَيْهِمْ قَامُوا ۚ وَلَوْ شَاءَ اللَّهُ لَذَهَبَ بِسَمْعِهِمْ وَأَبْصَارِهِمْ ۚ إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        translation: "The lightning almost snatches away their sight; whenever it lights [the way] for them, they walk therein; but when darkness comes over them, they stand [still]. And if Allah had willed, He could have taken away their hearing and their sight. Indeed, Allah is over all things competent.",
        transliteration: "Yakadu albarqu yakhtafu absarahum kullama adaa lahum mashaw feehi waitha athlama AAalayhim qamoo walaw shaa Allahu lathahaba bisamAAihim waabsarihim inna Allaha AAala kulli shayin qadeerun"
      }
    ]
  }
};

interface QuranReaderProps {
  viewMode: 'reading' | 'listening';
}

const QuranReader: React.FC<QuranReaderProps> = ({ viewMode }) => {
  const navigate = useNavigate();
  const [currentSurah, setCurrentSurah] = useState(surahsData[2]);
  const [currentView, setCurrentView] = useState<'page' | 'display' | 'audio'>('page');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const navigateToNextSurah = () => {
    const nextSurahNumber = currentSurah.number === 2 ? 1 : 2;
    setCurrentSurah(surahsData[nextSurahNumber as keyof typeof surahsData]);
  };
  
  const navigateToPrevSurah = () => {
    const prevSurahNumber = currentSurah.number === 1 ? 2 : 1;
    setCurrentSurah(surahsData[prevSurahNumber as keyof typeof surahsData]);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log("Play/Pause toggled:", !isPlaying);
  };
  
  const toggleView = (view: 'page' | 'display' | 'audio') => {
    setCurrentView(view);
    console.log("View changed to:", view);
  };
  
  // Handle showing different content based on selected view
  const renderContent = () => {
    switch(currentView) {
      case 'page':
        return (
          <div className="verses flex-1 overflow-y-auto px-4">
            {currentSurah.verses.map((verse) => (
              <div key={verse.id} className="verse mb-8">
                <div className="arabic-text text-right leading-loose text-2xl my-3 text-gray-800 dark:text-gray-100">
                  {verse.arabic}
                </div>
                
                <div className="transliteration text-green-600 dark:text-green-400 text-sm italic leading-relaxed mt-2 mb-1">
                  {verse.id}. {verse.transliteration}
                </div>
                
                <div className="translation text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {verse.id}. {verse.translation}
                </div>
                
                {verse.id === 1 && (
                  <div className="verse-controls flex justify-center mt-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      case 'display':
        return (
          <div className="display-view flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="arabic-text text-4xl mb-6 text-gray-800 dark:text-gray-100 leading-relaxed">
                {currentSurah.verses[0].arabic}
              </div>
              <div className="transliteration text-lg text-green-600 dark:text-green-400 mb-4">
                {currentSurah.verses[0].transliteration}
              </div>
              <div className="translation text-gray-700 dark:text-gray-300">
                {currentSurah.verses[0].translation}
              </div>
              <div className="pagination mt-8 flex justify-center gap-2">
                {currentSurah.verses.map((verse, index) => (
                  <div 
                    key={verse.id}
                    className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'audio':
        return (
          <div className="audio-view flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-emerald-500/40 flex items-center justify-center">
                <button 
                  onClick={handlePlayPause}
                  className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {currentSurah.name} ({currentSurah.translation})
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Recited by Sheikh Abd-ur Rahman As-Sudais
            </p>
            <div className="mt-8 w-full max-w-xs">
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '35%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1:26</span>
                <span>4:12</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="quran-reader-new h-full flex flex-col">
      {/* Header */}
      <div className="surah-header p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button 
          onClick={handleGoBack}
          className="mr-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-md font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              {currentSurah.name} <ChevronRight size={16} className="inline-block opacity-70 ml-1" />
            </h2>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {currentSurah.location}
          </div>
        </div>
      </div>
      
      {/* Surah info */}
      <div className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 dark:text-gray-400">{currentSurah.number}. {currentSurah.name}</span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">("{currentSurah.translation}")</span>
        </div>
        <div className="text-right arabic-text mt-1 text-gray-800 dark:text-gray-200 text-lg">
          {currentSurah.arabicName}
        </div>
      </div>
      
      {/* Main content area - changes based on selected view */}
      {renderContent()}
      
      {/* Bottom Navigation */}
      <div className="navigation-bar border-t border-gray-200 dark:border-gray-700 p-2 flex items-center justify-around">
        <button 
          onClick={() => toggleView('page')}
          className={`p-2 rounded-full flex flex-col items-center ${
            currentView === 'page' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <FileText size={20} />
          <span className="text-xs mt-1">Page</span>
        </button>
        
        <button 
          onClick={() => toggleView('display')}
          className={`p-2 rounded-full flex flex-col items-center ${
            currentView === 'display' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-xs mt-1">Display</span>
        </button>
        
        <button 
          onClick={() => toggleView('audio')}
          className={`p-2 rounded-full flex flex-col items-center ${
            currentView === 'audio' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          <span className="text-xs mt-1">Audio</span>
        </button>
      </div>
    </div>
  );
};

export default QuranReader;
