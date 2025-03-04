
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, FileText, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';

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
  onBackClick?: () => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({ viewMode, onBackClick }) => {
  const navigate = useNavigate();
  const [currentSurah, setCurrentSurah] = useState(surahsData[1]);
  const [currentView, setCurrentView] = useState<'page' | 'display' | 'audio'>('page');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(() => {
    const audioElement = new Audio();
    setAudio(audioElement);
    
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });
    audioElement.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    });
    
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.removeEventListener('timeupdate', updateProgress);
        audioElement.removeEventListener('loadedmetadata', () => {});
        audioElement.removeEventListener('ended', () => {});
      }
    };
  }, []);
  
  useEffect(() => {
    if (currentView === 'audio') {
      loadAudio();
    } else if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentView, currentSurah.number]);
  
  const updateProgress = () => {
    if (audio) {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
      setCurrentTime(audio.currentTime);
    }
  };
  
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const loadAudio = async () => {
    if (audio) {
      setLoading(true);
      try {
        // Use the full Quran API endpoint to get the complete surah audio
        const edition = "ar.alafasy"; // Sheikh Mishari Rashid Al-Afasy recitation
        const fullAudioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${currentSurah.number}.mp3`;
        
        setAudioSrc(fullAudioUrl);
        audio.src = fullAudioUrl;
        
        audio.load();
        setLoading(false);
        
        if (isPlaying) {
          audio.play();
        }
      } catch (error) {
        console.error("Error loading Quran audio:", error);
        toast.error("Failed to load audio. Please try again.");
        setLoading(false);
      }
    }
  };
  
  const handleGoBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/');
    }
  };
  
  const navigateToNextSurah = () => {
    const nextSurahNumber = currentSurah.number === 2 ? 1 : 2;
    setCurrentSurah(surahsData[nextSurahNumber as keyof typeof surahsData]);
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const navigateToPrevSurah = () => {
    const prevSurahNumber = currentSurah.number === 1 ? 2 : 1;
    setCurrentSurah(surahsData[prevSurahNumber as keyof typeof surahsData]);
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const handlePlayPause = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      if (audio.src) {
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          toast.error("Couldn't play audio. Please try again.");
        });
      } else {
        loadAudio().then(() => {
          audio.play().catch(error => {
            console.error("Error playing audio:", error);
            toast.error("Couldn't play audio. Please try again.");
          });
        });
      }
    }
    
    setIsPlaying(!isPlaying);
    console.log("Play/Pause toggled:", !isPlaying);
  };
  
  const toggleView = (view: 'page' | 'display' | 'audio') => {
    setCurrentView(view);
    console.log("View changed to:", view);
  };
  
  const renderContent = () => {
    if (currentView === 'page') {
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
    }
    
    if (currentView === 'display') {
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
    }
    
    if (currentView === 'audio') {
      return (
        <div className="audio-view flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-500/40 flex items-center justify-center">
              <button 
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause size={32} />
                ) : (
                  <Play size={32} className="ml-1" />
                )}
              </button>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            {currentSurah.name} ({currentSurah.translation})
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Recited by Sheikh Mishari Rashid Al-Afasy
          </p>
          <div className="mt-8 w-full max-w-xs">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="quran-reader-new h-full flex flex-col">
      <Toaster />
      <div className="surah-header p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button 
          onClick={handleGoBack}
          className="mr-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex-1">
          <div className="flex items-center">
            <h2 className="text-md font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              {currentSurah.name}
            </h2>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {currentSurah.location}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={navigateToPrevSurah}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Previous surah"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={navigateToNextSurah}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Next surah"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">{currentSurah.number}. {currentSurah.name}</span>
          <span className="text-gray-500 dark:text-gray-400">"{currentSurah.translation}"</span>
        </div>
        <div className="text-right arabic-text mt-1 text-gray-800 dark:text-gray-200 text-lg">
          {currentSurah.arabicName}
        </div>
      </div>
      
      {renderContent()}
      
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
