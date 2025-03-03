import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Bookmark, PlayCircle, PauseCircle, Search, Settings, BookOpen, Music, List, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock surah data for demo
const mockSurah = {
  name: "Al-Fatiha",
  arabicName: "الفاتحة",
  number: 1,
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

// Mock list of surahs for navigation
const mockSurahList = [
  { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", verses: 7 },
  { number: 2, name: "Al-Baqara", arabicName: "البقرة", verses: 286 },
  { number: 3, name: "Ali 'Imran", arabicName: "آل عمران", verses: 200 },
  { number: 4, name: "An-Nisa", arabicName: "النساء", verses: 176 },
  { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", verses: 120 },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام", verses: 165 },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف", verses: 206 },
];

// Mock list of Qaris (reciters)
const mockQariList = [
  { id: 1, name: "Abdul Basit Abdul Samad", style: "Murattal" },
  { id: 2, name: "Mishary Rashid Alafasy", style: "Murattal" },
  { id: 3, name: "Mahmoud Khalil Al-Husary", style: "Murattal" },
  { id: 4, name: "Mohamed Siddiq El-Minshawi", style: "Murattal" },
  { id: 5, name: "Abu Bakr Al-Shatri", style: "Murattal" },
];

interface QuranReaderProps {
  viewMode: 'reading' | 'listening';
}

const QuranReader: React.FC<QuranReaderProps> = ({ viewMode }) => {
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [fontSize, setFontSize] = useState(1);
  const [currentSurah, setCurrentSurah] = useState(mockSurah);
  const [showSurahList, setShowSurahList] = useState(false);
  const [showQariList, setShowQariList] = useState(false);
  const [selectedQari, setSelectedQari] = useState(mockQariList[0]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVerseId, setCurrentVerseId] = useState<number | null>(null);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [currentJuz, setCurrentJuz] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (viewMode === 'listening') {
      toast({
        title: "Listening Mode Activated",
        description: "You can now listen to Quran recitation",
      });
      
      // Auto-play the first verse when switching to listening mode
      if (currentSurah.verses.length > 0 && !isPlaying) {
        handlePlayAudio(currentSurah.verses[0].id);
      }
    } else {
      // If we're switching away from listening mode, pause any playing audio
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      toast({
        title: "Reading Mode Activated",
        description: "You can now read the Quran",
      });
    }
  }, [viewMode]);
  
  const handleBookmark = (verseId: number) => {
    if (bookmarkedVerses.includes(verseId)) {
      setBookmarkedVerses(bookmarkedVerses.filter(id => id !== verseId));
      toast({
        title: "Bookmark removed",
        description: `Verse ${verseId} removed from bookmarks`,
      });
    } else {
      setBookmarkedVerses([...bookmarkedVerses, verseId]);
      toast({
        title: "Bookmark added",
        description: `Verse ${verseId} added to bookmarks`,
      });
    }
  };
  
  const handlePlayAudio = (verseId: number) => {
    setCurrentVerseId(verseId);
    // In a real app, we would set the audio source to the actual audio file
    if (audioRef.current) {
      // For demo purposes, we're just toggling play/pause
      if (isPlaying && currentVerseId === verseId) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // In a real implementation, we'd set the src to the correct audio file for this verse
        // audioRef.current.src = `https://api.quran.com/api/v4/recitations/${selectedQari.id}/by_ayah/${currentSurah.number}:${verseId}`;
        audioRef.current.play().catch(e => {
          console.error("Error playing audio:", e);
          toast({
            title: "Playback error",
            description: "Could not play audio. Please try again.",
            variant: "destructive",
          });
        });
        setIsPlaying(true);
      }
    }
  };
  
  const selectSurah = (surah: typeof mockSurahList[0]) => {
    // In a real app, we would fetch the surah data from an API
    setCurrentSurah({
      ...mockSurah,
      name: surah.name,
      arabicName: surah.arabicName,
      number: surah.number
    });
    setShowSurahList(false);
    setCurrentVerseId(null);
    setIsPlaying(false);
    
    toast({
      title: "Surah changed",
      description: `Now viewing ${surah.name}`,
    });
  };
  
  const selectQari = (qari: typeof mockQariList[0]) => {
    setSelectedQari(qari);
    setShowQariList(false);
    
    toast({
      title: "Reciter changed",
      description: `Now listening to ${qari.name}`,
    });
  };
  
  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const navigateToNextSurah = () => {
    const newIndex = currentSurahIndex < mockSurahList.length - 1 ? currentSurahIndex + 1 : 0;
    setCurrentSurahIndex(newIndex);
    selectSurah(mockSurahList[newIndex]);
  };
  
  const navigateToPreviousSurah = () => {
    const newIndex = currentSurahIndex > 0 ? currentSurahIndex - 1 : mockSurahList.length - 1;
    setCurrentSurahIndex(newIndex);
    selectSurah(mockSurahList[newIndex]);
  };
  
  const navigateToNextJuz = () => {
    setCurrentJuz(prev => prev < 30 ? prev + 1 : 1);
    toast({
      title: "Juz changed",
      description: `Now viewing Juz ${currentJuz < 30 ? currentJuz + 1 : 1}`,
    });
  };
  
  const navigateToPreviousJuz = () => {
    setCurrentJuz(prev => prev > 1 ? prev - 1 : 30);
    toast({
      title: "Juz changed",
      description: `Now viewing Juz ${currentJuz > 1 ? currentJuz - 1 : 30}`,
    });
  };
  
  useEffect(() => {
    // Initialize verse refs array
    verseRefs.current = verseRefs.current.slice(0, currentSurah.verses.length);
    
    // Scroll to verse if one is selected
    if (currentVerseId) {
      const verseIndex = currentSurah.verses.findIndex(verse => verse.id === currentVerseId);
      if (verseIndex !== -1 && verseRefs.current[verseIndex]) {
        verseRefs.current[verseIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentSurah.verses, currentVerseId]);
  
  return (
    <div className="quran-reader animate-fade-in relative">
      {/* Audio element (hidden) */}
      <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)}>
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Surah selection modal */}
      {showSurahList && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[70vh] overflow-y-auto shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold dark:text-white">Select Surah</h3>
              <button 
                onClick={() => setShowSurahList(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={navigateToPreviousSurah}
                  className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="text-center">
                  <div className="text-xl font-semibold text-islamic-blue dark:text-islamic-lightBlue mb-1">
                    {mockSurahList[currentSurahIndex].name}
                  </div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Surah {mockSurahList[currentSurahIndex].number} • {mockSurahList[currentSurahIndex].verses} verses
                  </div>
                </div>
                
                <button 
                  onClick={navigateToNextSurah}
                  className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className="arabic-text text-2xl mb-2 text-islamic-darkBlue dark:text-white">
                  {mockSurahList[currentSurahIndex].arabicName}
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => selectSurah(mockSurahList[currentSurahIndex])}
                  className="bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900 px-5 py-2 rounded-lg hover:bg-islamic-blue/90 dark:hover:bg-islamic-lightBlue/90 transition-colors"
                >
                  Select this Surah
                </button>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-center text-sm font-medium text-muted-foreground dark:text-gray-400 mb-4">Navigate by Juz</h4>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={navigateToPreviousJuz}
                    className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="text-center">
                    <div className="text-lg font-medium text-islamic-blue dark:text-islamic-lightBlue">
                      Juz {currentJuz}
                    </div>
                  </div>
                  
                  <button 
                    onClick={navigateToNextJuz}
                    className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Qari selection modal */}
      {showQariList && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[70vh] overflow-y-auto shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold dark:text-white">Select Reciter</h3>
              <button 
                onClick={() => setShowQariList(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <ul className="p-2">
              {mockQariList.map((qari) => (
                <li key={qari.id}>
                  <button 
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                      selectedQari.id === qari.id 
                        ? 'bg-islamic-blue/10 dark:bg-islamic-blue/20' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => selectQari(qari)}
                  >
                    <div className="flex items-center gap-3">
                      <Music className={`${
                        selectedQari.id === qari.id 
                          ? 'text-islamic-blue dark:text-islamic-lightBlue' 
                          : 'text-muted-foreground dark:text-gray-400'
                      }`} size={18} />
                      <div>
                        <div className={`font-medium ${
                          selectedQari.id === qari.id 
                            ? 'text-islamic-blue dark:text-islamic-lightBlue' 
                            : 'dark:text-white'
                        }`}>{qari.name}</div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">{qari.style}</div>
                      </div>
                    </div>
                    
                    {selectedQari.id === qari.id && (
                      <div className="w-2 h-2 rounded-full bg-islamic-blue dark:bg-islamic-lightBlue"></div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="glass-card rounded-xl p-5 mb-6 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 dark:from-gray-800/90 dark:to-gray-900/80 dark:border-islamic-blue/30 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={navigateToPreviousSurah}
            className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold mb-1 text-islamic-darkBlue dark:text-white">{currentSurah.name}</h2>
            <div className="arabic-text text-xl text-islamic-blue dark:text-islamic-lightBlue">{currentSurah.arabicName}</div>
          </div>
          
          <button
            onClick={navigateToNextSurah}
            className="text-islamic-blue dark:text-islamic-lightBlue hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="reader-controls flex justify-between items-center mb-5 glass-card rounded-xl p-3 border border-islamic-blue/20 bg-white/90 dark:bg-gray-800/90 dark:border-gray-700 shadow-md">
        <button 
          onClick={navigateToPreviousSurah}
          className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-darkBlue dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex space-x-2">
          <button 
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${showTranslation ? 'bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900' : 'bg-islamic-blue/10 text-islamic-blue dark:bg-islamic-blue/20 dark:text-islamic-lightBlue'}`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            Translation
          </button>
          
          <button 
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${showTransliteration ? 'bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900' : 'bg-islamic-blue/10 text-islamic-blue dark:bg-islamic-blue/20 dark:text-islamic-lightBlue'}`}
            onClick={() => setShowTransliteration(!showTransliteration)}
          >
            Transliteration
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="text-xs px-2 py-1 rounded-full bg-islamic-blue/10 text-islamic-blue dark:bg-islamic-blue/20 dark:text-islamic-lightBlue hover:bg-islamic-blue/20 dark:hover:bg-islamic-blue/30 transition-colors"
            onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
          >
            A-
          </button>
          
          <button 
            className="text-xs px-2 py-1 rounded-full bg-islamic-blue/10 text-islamic-blue dark:bg-islamic-blue/20 dark:text-islamic-lightBlue hover:bg-islamic-blue/20 dark:hover:bg-islamic-blue/30 transition-colors"
            onClick={() => setFontSize(Math.min(1.5, fontSize + 0.1))}
          >
            A+
          </button>
          
          <button 
            onClick={() => setShowQariList(true)}
            className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-darkBlue dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
          >
            <Music size={18} />
          </button>
          
          <button 
            onClick={handleMuteToggle}
            className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-darkBlue dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        
        <button 
          onClick={navigateToNextSurah}
          className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-darkBlue dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="mb-5 flex items-center justify-center space-x-4">
        <button 
          onClick={() => setShowSurahList(true)}
          className="flex items-center space-x-2 bg-islamic-blue/10 dark:bg-islamic-blue/20 text-islamic-blue dark:text-islamic-lightBlue px-4 py-2 rounded-lg hover:bg-islamic-blue/20 dark:hover:bg-islamic-blue/30 transition-colors"
        >
          <BookOpen size={16} />
          <span>Select Surah or Juz</span>
        </button>
        
        {bookmarkedVerses.length > 0 && (
          <button 
            className="flex items-center space-x-2 bg-islamic-gold/10 text-islamic-gold dark:bg-islamic-gold/20 dark:text-islamic-gold px-4 py-2 rounded-lg hover:bg-islamic-gold/20 dark:hover:bg-islamic-gold/30 transition-colors"
            onClick={() => {
              // In a real app, we would navigate to the bookmarked verses
              toast({
                title: "Bookmarks",
                description: `You have ${bookmarkedVerses.length} bookmarked verses`,
              });
            }}
          >
            <Bookmark size={16} />
            <span>Bookmarks ({bookmarkedVerses.length})</span>
          </button>
        )}
      </div>
      
      <div className="verses-container space-y-5" style={{ fontSize: `${fontSize}rem` }}>
        {currentSurah.verses.map((verse, index) => (
          <div 
            key={verse.id} 
            ref={el => verseRefs.current[index] = el}
            className={`verse glass-card rounded-xl p-5 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 dark:from-gray-800/90 dark:to-gray-900/80 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow ${currentVerseId === verse.id ? 'ring-2 ring-islamic-blue dark:ring-islamic-lightBlue' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="verse-number bg-islamic-blue/15 text-islamic-blue dark:bg-islamic-blue/20 dark:text-islamic-lightBlue rounded-full w-8 h-8 flex items-center justify-center border border-islamic-blue/20 dark:border-islamic-blue/30">
                {verse.id}
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleBookmark(verse.id)}
                  className={`transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 ${
                    bookmarkedVerses.includes(verse.id) 
                      ? 'text-islamic-gold' 
                      : 'text-muted-foreground hover:text-islamic-blue dark:text-gray-400 dark:hover:text-islamic-lightBlue'
                  }`}
                >
                  <Bookmark size={18} />
                </button>
                
                <button 
                  onClick={() => handlePlayAudio(verse.id)}
                  className={`transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 ${
                    isPlaying && currentVerseId === verse.id
                      ? 'text-islamic-blue dark:text-islamic-lightBlue' 
                      : 'text-muted-foreground hover:text-islamic-blue dark:text-gray-400 dark:hover:text-islamic-lightBlue'
                  }`}
                >
                  {isPlaying && currentVerseId === verse.id ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                </button>
              </div>
            </div>
            
            <div className="arabic-text text-xl md:text-2xl mb-4 leading-relaxed text-islamic-darkBlue dark:text-white">
              {verse.arabic}
            </div>
            
            {showTransliteration && (
              <div className="transliteration text-sm text-muted-foreground dark:text-gray-300 italic mb-2 bg-islamic-blue/5 dark:bg-islamic-blue/10 p-2 rounded-lg">
                {verse.transliteration}
              </div>
            )}
            
            {showTranslation && (
              <div className="translation text-sm md:text-base text-muted-foreground dark:text-gray-300">
                {verse.translation}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="audio-controls fixed bottom-20 left-0 right-0 flex justify-center z-20">
        {isPlaying && (
          <div className="glass-card px-4 py-2 rounded-full flex items-center space-x-3 border border-islamic-blue/20 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 shadow-lg">
            <button
              onClick={() => {
                if (isPlaying) {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                }
              }}
              className="text-islamic-blue dark:text-islamic-lightBlue p-1 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
            >
              <PauseCircle size={22} />
            </button>
            
            <div className="text-sm text-muted-foreground dark:text-gray-300">
              <span className="font-medium text-islamic-blue dark:text-islamic-lightBlue">
                {selectedQari.name}
              </span>
              <span className="mx-1">•</span>
              <span>Verse {currentVerseId}</span>
            </div>
            
            <button
              onClick={handleMuteToggle}
              className="text-islamic-blue dark:text-islamic-lightBlue p-1 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranReader;
