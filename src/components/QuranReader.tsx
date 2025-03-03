<lov-code>
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Bookmark, PlayCircle, PauseCircle, Search, Settings, BookOpen, Music, List, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock surah data for different surahs
const surahsData = {
  1: {
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
  },
  2: {
    name: "Al-Baqara",
    arabicName: "البقرة",
    number: 2,
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
      }
    ]
  },
  3: {
    name: "Ali 'Imran",
    arabicName: "آل عمران",
    number: 3,
    verses: [
      {
        id: 1,
        arabic: "الم",
        translation: "Alif, Lam, Meem.",
        transliteration: "Alif Lam Meem"
      },
      {
        id: 2,
        arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
        transliteration: "Allahu la ilaha illa huwa alhayyu alqayyoom"
      }
    ]
  },
  4: {
    name: "An-Nisa",
    arabicName: "النساء",
    number: 4,
    verses: [
      {
        id: 1,
        arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً ۚ وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ ۚ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
        translation: "O mankind, fear your Lord, who created you from one soul and created from it its mate and dispersed from both of them many men and women. And fear Allah, through whom you ask one another, and the wombs. Indeed Allah is ever, over you, an Observer.",
        transliteration: "Ya ayyuha alnnasu ittaqoo rabbakumu allathee khalaqakum min nafsin wahidatin wakhalaqa minha zawjaha wabaththa minhuma rijalan katheeran wanisaan waittaqoo Allaha allathee tasaaloona bihi waalarhama inna Allaha kana AAalaykum raqeeban"
      }
    ]
  },
  5: {
    name: "Al-Ma'idah",
    arabicName: "المائدة",
    number: 5,
    verses: [
      {
        id: 1,
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ ۚ أُحِلَّتْ لَكُم بَهِيمَةُ الْأَنْعَامِ إِلَّا مَا يُتْلَىٰ عَلَيْكُمْ غَيْرَ مُحِلِّي الصَّيْدِ وَأَنتُمْ حُرُمٌ ۗ إِنَّ اللَّهَ يَحْكُمُ مَا يُرِيدُ",
        translation: "O you who have believed, fulfill [all] contracts. Lawful for you are the animals of grazing livestock except for that which is recited to you [in this Qur'an] - hunting not being permitted while you are in the state of ihram. Indeed, Allah ordains what He intends.",
        transliteration: "Ya ayyuha allatheena amanoo awfoo bialAAuqoodi ohillat lakum baheematu alanAAami illa ma yutla AAalaykum ghayra muhillee alssaydi waantum hurumun inna Allaha yahkumu ma yureed"
      }
    ]
  }
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
  const [currentSurah, setCurrentSurah] = useState(surahsData[1]);
  const [showSurahList, setShowSurahList] = useState(false);
  const [showQariList, setShowQariList] = useState(false);
  const [selectedQari, setSelectedQari] = useState(mockQariList[0]);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVerseId, setCurrentVerseId] = useState<number | null>(null);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [currentJuz, setCurrentJuz] = useState(1);
  const [globalPlayback, setGlobalPlayback] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Demo audio generation frequencies for different surahs
  const demoAudioFrequencies = {
    1: 440, // A4 note
    2: 493.88, // B4 note
    3: 523.25, // C5 note
    4: 587.33, // D5 note
    5: 659.25, // E5 note
  };
  
  // Duration for each surah in seconds
  const demoAudioDurations = {
    1: 12, // Al-Fatiha is shorter
    2: 20,
    3: 18,
    4: 15,
    5: 16,
  };
  
  useEffect(() => {
    if (viewMode === 'listening') {
      toast({
        title: "Listening Mode Activated",
        description: "Using demo recitation (synthesized audio)",
      });
      
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        const audio = new Audio();
        audio.onended = () => {
          setIsPlaying(false);
          setGlobalPlayback(false);
        };
        audioRef.current = audio;
      }
    } else {
      // If we're switching away from listening mode, pause any playing audio
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setGlobalPlayback(false);
      }
      
      toast({
        title: "Reading Mode Activated",
        description: "You can now read the Quran",
      });
    }
    
    // Clean up on component unmount
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [viewMode, isPlaying]);
  
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
  
  // Create synthesized audio using Web Audio API
  const createSynthesizedAudio = (frequency: number, duration: number, callback?: () => void) => {
    try {
      // Close previous AudioContext if exists
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
      
      // Create a new AudioContext
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        throw new Error("AudioContext not supported");
      }
      
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create a gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = isMuted ? 0 : 0.2; // Lower volume to avoid startling the user
      gainNode.connect(audioContext.destination);
      
      // Create an oscillator for the tone
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      // Add some "rhythm" by periodically changing the gain
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      
      // Create a "recitation" effect with changing amplitude
      for (let i = 0; i < duration * 2; i++) {
        const time = now + (i * 0.5);
        const value = i % 2 === 0 ? 0.2 : 0.1;
        gainNode.gain.linearRampToValueAtTime(value, time);
        gainNode.gain.linearRampToValueAtTime(0.05, time + 0.25);
      }
      
      // Connect oscillator to gain node
      oscillator.connect(gainNode);
      
      // Start and stop the oscillator
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
      
      // Set callback for when audio finishes
      oscillator.onended = () => {
        if (callback) callback();
      };
      
      // Return a stop function
      return {
        stop: () => {
          oscillator.stop();
          audioContext.close().catch(console.error);
          audioContextRef.current = null;
        }
      };
    } catch (synthError) {
      console.error("Failed to create synthesized audio:", synthError);
      toast({
        title: "Audio Error",
        description: "Could not create demo audio. Please check your browser settings.",
        variant: "destructive",
      });
      return { stop: () => {} };
    }
  };
  
  const handlePlayAudio = (verseId: number) => {
    setCurrentVerseId(verseId);
    
    // If already playing this verse, stop it
    if (isPlaying && currentVerseId === verseId) {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }
    
    // Get frequency for this surah
    const frequency = demoAudioFrequencies[currentSurah.number as keyof typeof demoAudioFrequencies] || 440;
    // Shorter duration for individual verses
    const duration = (demoAudioDurations[currentSurah.number as keyof typeof demoAudioDurations] || 10) / 3;
    
    // Stop any existing audio
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    // Create synthesized audio
    createSynthesizedAudio(frequency, duration, () => {
      setIsPlaying(false);
    });
    
    setIsPlaying(true);
    
    toast({
      title: "Demo Mode",
      description: `Playing verse ${verseId} with synthesized audio`,
    });
  };
  
  const handleGlobalPlayback = () => {
    if (globalPlayback) {
      // Stop playback
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setGlobalPlayback(false);
      toast({
        title: "Playback Paused",
        description: "Quran recitation paused",
      });
    } else {
      // Start playback from the first verse or current verse
      const firstVerseId = currentSurah.verses[0].id;
      setCurrentVerseId(firstVerseId);
      
      // Get frequency and duration for this surah
      const frequency = demoAudioFrequencies[currentSurah.number as keyof typeof demoAudioFrequencies] || 440;
      const duration = demoAudioDurations[currentSurah.number as keyof typeof demoAudioDurations] || 10;
      
      // Stop any existing audio
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Create synthesized audio
      createSynthesizedAudio(frequency, duration, () => {
        setIsPlaying(false);
        setGlobalPlayback(false);
      });
      
      setIsPlaying(true);
      setGlobalPlayback(true);
      toast({
        title: "Playback Started",
        description: `Now playing Surah ${currentSurah.name} with synthesized audio`,
      });
    }
  };
  
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    
    // If we're using Web Audio API, update the gain
    if (audioContextRef.current) {
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = isMuted ? 0.2 : 0; // Toggle volume
      gainNode.connect(audioContextRef.current.destination);
    }
    
    // If using audio element
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    
    toast({
      title: isMuted ? "Audio Unmuted" : "Audio Muted",
      description: isMuted ? "You can now hear the recitation" : "Audio has been muted",
    });
  };
  
  const selectSurah = (surah: typeof mockSurahList[0]) => {
    // Get the actual surah data from our mock data
    const surahData = surahsData[surah.number as keyof typeof surahsData];
    
    if (surahData) {
      setCurrentSurah(surahData);
      setShowSurahList(false);
      setCurrentVerseId(null);
      setIsPlaying(false);
      setGlobalPlayback(false);
      
      // If there's audio playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      toast({
        title: "Surah changed",
        description: `Now viewing ${surah.name}`,
      });
    } else {
      toast({
        title: "Surah not available",
        description: `Surah ${surah.name} is not available in the demo`,
        variant: "destructive",
      });
    }
  };
  
  const selectQari = (qari: typeof mockQariList[0]) => {
    setSelectedQari(qari);
    setShowQariList(false);
    
    toast({
      title: "Reciter changed",
      description: `Now listening to ${qari.name}`,
    });
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
    
    // If we have active audio playback and change surah, update it
    if (isPlaying) {
      // Stop current audio
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
        audioContextRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      setIsPlaying(false);
      setGlobalPlayback(false);
    }
  }, [currentSurah.verses, currentVerseId, currentSurah.number, isPlaying]);

  return (
    <div className="quran-reader animate-fade-in relative">
      {/* No hidden audio element needed anymore since we're creating it dynamically */}
      
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
      
      {/* Surah header card */}
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
        
        {viewMode === 'listening' && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGlobalPlayback}
              className="flex items-center space-x-2 bg-islamic-blue text-white dark:bg-islamic-lightBlue dark:text-gray-900 px-5 py-2 rounded-full hover:bg-islamic-blue/90 dark:hover:bg-islamic-lightBlue/90 transition-colors"
            >
              {globalPlayback ? (
                <>
                  <PauseCircle size={20} />
                  <span>Pause Recitation</span>
                </>
              ) : (
                <>
                  <PlayCircle size={20} />
                  <span>Play Surah</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Reader controls */}
      <div className="reader-controls flex justify-between items-center mb-5 glass-card rounded-xl p-3 border border-islamic-blue/20 bg-white/90 dark:bg-gray-800/90 dark:border-gray-700 shadow-md">
        <button 
          onClick={navigateToPreviousSurah}
          className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-dark
