import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Play, Pause, FileText, MoreVertical, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from './ui/sonner';
import { useQuery } from '@tanstack/react-query';

interface Verse {
  id: number;
  arabic: string;
  translation: string;
  transliteration: string;
  audio?: string;
  number?: number;
  numberInSurah?: number;
}

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  translation: string;
  location: string;
  verses: Verse[];
  englishName?: string;
  englishNameTranslation?: string;
  revelationType?: string;
  numberOfAyahs?: number;
}

// Initial surah data for immediate rendering while API loads
const initialSurahsData: Record<number, Surah> = {
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
      }
    ]
  }
};

// Fetch all surahs from the Quran API
const fetchSurahs = async (): Promise<Record<number, Surah>> => {
  try {
    const response = await fetch('https://api.alquran.cloud/v1/surah');
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error('Failed to fetch surahs');
    }
    
    const surahs: Record<number, Surah> = {};
    
    for (const surah of data.data) {
      surahs[surah.number] = {
        number: surah.number,
        name: surah.englishName,
        arabicName: surah.name,
        translation: surah.englishNameTranslation,
        location: surah.revelationType,
        verses: [],
        englishName: surah.englishName,
        englishNameTranslation: surah.englishNameTranslation,
        revelationType: surah.revelationType,
        numberOfAyahs: surah.numberOfAyahs
      };
    }
    
    return surahs;
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
};

// Fetch detailed surah data with verses
const fetchSurahDetails = async (surahNumber: number): Promise<Surah> => {
  try {
    // Get the detailed surah data with verses
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`Failed to fetch surah ${surahNumber} details`);
    }
    
    // Get the Arabic text using a reliable endpoint that provides proper Unicode
    // Using quran-uthmani endpoint for better Arabic text rendering
    const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
    const arabicData = await arabicResponse.json();
    
    if (arabicData.code !== 200) {
      throw new Error(`Failed to fetch surah ${surahNumber} Arabic text`);
    }
    
    const verses: Verse[] = data.data.ayahs.map((ayah: any, index: number) => ({
      id: ayah.numberInSurah,
      number: ayah.number,
      numberInSurah: ayah.numberInSurah,
      arabic: arabicData.data.ayahs[index].text,
      translation: ayah.text,
      transliteration: "", // API doesn't provide transliteration
      audio: ayah.audio
    }));
    
    return {
      number: data.data.number,
      name: data.data.englishName,
      arabicName: data.data.name,
      translation: data.data.englishNameTranslation,
      location: data.data.revelationType,
      verses,
      englishName: data.data.englishName,
      englishNameTranslation: data.data.englishNameTranslation,
      revelationType: data.data.revelationType,
      numberOfAyahs: data.data.numberOfAyahs
    };
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber} details:`, error);
    throw error;
  }
};

interface QuranReaderProps {
  viewMode: 'reading' | 'listening';
  onBackClick?: () => void;
}

const QuranReader: React.FC<QuranReaderProps> = ({ viewMode, onBackClick }) => {
  const navigate = useNavigate();
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [currentView, setCurrentView] = useState<'page' | 'display' | 'audio'>('page');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<number | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Fetch all surahs
  const { data: allSurahs, isLoading: isLoadingSurahs, error: surahsError } = useQuery({
    queryKey: ['surahs'],
    queryFn: fetchSurahs
  });
  
  // Fetch current surah details
  const { data: currentSurahData, isLoading: isLoadingSurahDetails, error: surahDetailsError } = useQuery({
    queryKey: ['surah', currentSurahNumber],
    queryFn: () => fetchSurahDetails(currentSurahNumber),
    enabled: !!currentSurahNumber
  });
  
  // Current surah - use API data if available, otherwise fall back to initial data
  const currentSurah = currentSurahData || initialSurahsData[1];
  
  // Total number of surahs
  const totalSurahs = allSurahs ? Object.keys(allSurahs).length : 114;
  
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
  }, [currentView, currentSurahNumber]);
  
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
        const fullAudioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${currentSurahNumber}.mp3`;
        
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
    const nextSurahNumber = currentSurahNumber < totalSurahs ? currentSurahNumber + 1 : 1;
    setCurrentSurahNumber(nextSurahNumber);
    if (audio) {
      audio.pause();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };
  
  const navigateToPrevSurah = () => {
    const prevSurahNumber = currentSurahNumber > 1 ? currentSurahNumber - 1 : totalSurahs;
    setCurrentSurahNumber(prevSurahNumber);
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
    // Show loading state while fetching surah details
    if (isLoadingSurahDetails) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-500" />
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading surah...</p>
          </div>
        </div>
      );
    }
    
    // Show error message if there was an error fetching the surah
    if (surahDetailsError) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-500">
            <p>Error loading surah. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-md"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    
    if (currentView === 'page') {
      return (
        <div className="verses flex-1 overflow-y-auto px-4">
          {currentSurah.verses.map((verse) => (
            <div key={verse.id} className="verse mb-8">
              <div className="arabic-text text-right leading-loose text-2xl my-3 text-gray-800 dark:text-gray-100 font-arabic">
                {verse.arabic}
              </div>
              
              <div className="transliteration text-green-600 dark:text-green-400 text-sm italic leading-relaxed mt-2 mb-1">
                {verse.id}. {verse.transliteration || ''}
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
      const firstVerse = currentSurah.verses[0] || { 
        id: 1, 
        arabic: "", 
        translation: "Loading...", 
        transliteration: "" 
      };
      
      return (
        <div className="display-view flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="arabic-text text-4xl mb-6 text-gray-800 dark:text-gray-100 font-arabic leading-relaxed">
              {firstVerse.arabic}
            </div>
            <div className="transliteration text-lg text-green-600 dark:text-green-400 mb-4">
              {firstVerse.transliteration || ''}
            </div>
            <div className="translation text-gray-700 dark:text-gray-300">
              {firstVerse.translation}
            </div>
            <div className="pagination mt-8 flex justify-center gap-2">
              {currentSurah.verses.slice(0, 10).map((verse, index) => (
                <div 
                  key={verse.id}
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                />
              ))}
              {currentSurah.verses.length > 10 && (
                <div className="text-xs text-gray-500 ml-1">+{currentSurah.verses.length - 10}</div>
              )}
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
              {isLoadingSurahs ? 'Loading...' : currentSurah.name}
            </h2>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {isLoadingSurahs ? '' : currentSurah.location}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={navigateToPrevSurah}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Previous surah"
            disabled={isLoadingSurahs}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={navigateToNextSurah}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Next surah"
            disabled={isLoadingSurahs}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            {isLoadingSurahs ? 'Loading...' : `${currentSurah.number}. ${currentSurah.name}`}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {isLoadingSurahs ? '' : `"${currentSurah.translation}"`}
          </span>
        </div>
        <div className="text-right arabic-text mt-1 text-gray-800 dark:text-gray-200 text-lg">
          {isLoadingSurahs ? '' : currentSurah.arabicName}
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
