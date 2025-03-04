
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
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
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
  
  // Clean up any playing audio
  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      } catch (e) {
        console.error("Error stopping oscillator:", e);
      }
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close().catch(err => {
          console.error("Error closing audio context:", err);
        });
        audioContextRef.current = null;
      } catch (e) {
        console.error("Error closing audio context:", e);
      }
    }
    
    setIsPlaying(false);
    setGlobalPlayback(false);
  };
  
  useEffect(() => {
    if (viewMode === 'listening') {
      toast({
        title: "Listening Mode Activated",
        description: "You can now listen to Quran recitation (demo with synthesized audio)",
      });
    } else {
      // If we're switching away from listening mode, stop any playing audio
      stopAudio();
      
      toast({
        title: "Reading Mode Activated",
        description: "You can now read the Quran",
      });
    }
    
    // Clean up on component unmount
    return () => {
      stopAudio();
    };
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
  
  // Create synthesized audio using Web Audio API
  const createSynthesizedAudio = (frequency: number, duration: number, onEnd?: () => void) => {
    try {
      // Stop any existing audio
      stopAudio();
      
      // Create a new AudioContext
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        throw new Error("AudioContext not supported");
      }
      
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create a gain node for volume control
      const gainNode = audioContext.createGain();
      gainNode.gain.value = isMuted ? 0 : 0.3; // Set initial volume
      gainNode.connect(audioContext.destination);
      gainNodeRef.current = gainNode;
      
      // Create an oscillator for the tone
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillatorRef.current = oscillator;
      
      // Add some "rhythm" by periodically changing the gain
      const now = audioContext.currentTime;
      gainNode.gain.setValueAtTime(isMuted ? 0 : 0.3, now);
      
      // Create a "recitation" effect with changing amplitude and frequency
      for (let i = 0; i < duration * 2; i++) {
        const time = now + (i * 0.5);
        const value = isMuted ? 0 : (i % 2 === 0 ? 0.3 : 0.15);
        gainNode.gain.linearRampToValueAtTime(value, time);
        gainNode.gain.linearRampToValueAtTime(isMuted ? 0 : 0.05, time + 0.25);
        
        // Slight frequency modulation for more realistic sound
        const freqMod = i % 3 === 0 ? frequency * 1.02 : (i % 3 === 1 ? frequency * 0.98 : frequency);
        oscillator.frequency.setValueAtTime(freqMod, time);
      }
      
      // Connect oscillator to gain node
      oscillator.connect(gainNode);
      
      // Set callback for when audio finishes
      if (onEnd) {
        setTimeout(() => {
          if (onEnd) onEnd();
        }, duration * 1000);
      }
      
      // Start and stop the oscillator
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
      
      console.log("Audio playback started successfully");
      return true;
    } catch (synthError) {
      console.error("Failed to create synthesized audio:", synthError);
      toast({
        title: "Audio Error",
        description: "Could not create demo audio. Please check your browser settings.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const handlePlayAudio = (verseId: number) => {
    setCurrentVerseId(verseId);
    
    // If already playing this verse, stop it
    if (isPlaying && currentVerseId === verseId) {
      stopAudio();
      return;
    }
    
    // Get frequency for this surah
    const frequency = demoAudioFrequencies[currentSurah.number as keyof typeof demoAudioFrequencies] || 440;
    // Shorter duration for individual verses
    const duration = (demoAudioDurations[currentSurah.number as keyof typeof demoAudioDurations] || 10) / 3;
    
    // Create synthesized audio
    const success = createSynthesizedAudio(frequency, duration, () => {
      setIsPlaying(false);
      setCurrentVerseId(null);
    });
    
    if (success) {
      setIsPlaying(true);
      
      toast({
        title: "Demo Mode",
        description: `Playing verse ${verseId} with synthesized audio`,
      });
    }
  };
  
  const handleGlobalPlayback = () => {
    if (globalPlayback) {
      // Stop playback
      stopAudio();
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
      
      // Create synthesized audio
      const success = createSynthesizedAudio(frequency, duration, () => {
        setIsPlaying(false);
        setGlobalPlayback(false);
        setCurrentVerseId(null);
      });
      
      if (success) {
        setIsPlaying(true);
        setGlobalPlayback(true);
        toast({
          title: "Playback Started",
          description: `Now playing Surah ${currentSurah.name} with synthesized audio`,
        });
      }
    }
  };
  
  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // If we're using Web Audio API, update the gain
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newMutedState ? 0 : 0.3;
    }
    
    toast({
      title: newMutedState ? "Audio Muted" : "Audio Unmuted",
      description: newMutedState ? "Audio has been muted" : "You can now hear the recitation",
    });
  };
  
  const selectSurah = (surah: typeof mockSurahList[0]) => {
    // Get the actual surah data from our mock data
    const surahData = surahsData[surah.number as keyof typeof surahsData];
    
    if (surahData) {
      // Stop any playing audio
      stopAudio();
      
      setCurrentSurah(surahData);
      setShowSurahList(false);
      setCurrentVerseId(null);
      
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
  }, [currentSurah.verses, currentVerseId]);
  
  return (
    <div className="quran-reader animate-fade-in relative">
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
          onClick={() => setShowSurahList(true)}
          className="text-islamic-blue dark:text-islamic-lightBlue hover:text-islamic-darkBlue dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20"
        >
          <BookOpen size={20} />
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
          
          {viewMode === 'listening' && (
            <button 
              onClick={handleMuteToggle}
              className="text-islamic-blue dark:text-islamic-lightBlue p-1.5 rounded-full hover:bg-islamic-blue/10 dark:hover:bg-islamic-blue/20 transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Verses */}
      <div className="verses space-y-6 px-1 py-2 mb-4">
        {currentSurah.verses.map((verse, index) => (
          <div 
            key={verse.id}
            ref={el => verseRefs.current[index] = el}
            className={`verse-container glass-card rounded-lg p-4 backdrop-blur-sm ${
              currentVerseId === verse.id && isPlaying
                ? 'border-l-4 border-islamic-blue bg-islamic-blue/5 dark:border-islamic-lightBlue dark:bg-islamic-lightBlue/5'
                : 'border border-islamic-blue/10 bg-white/70 dark:bg-gray-800/70 dark:border-gray-700'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="verse-number w-8 h-8 rounded-full bg-islamic-blue/10 dark:bg-islamic-blue/20 flex items-center justify-center text-sm font-medium text-islamic-blue dark:text-islamic-lightBlue">
                {verse.id}
              </div>
              
              <div className="flex gap-1">
                {viewMode === 'listening' && (
                  <button 
                    onClick={() => handlePlayAudio(verse.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      isPlaying && currentVerseId === verse.id
                        ? 'text-islamic-blue dark:text-islamic-lightBlue bg-islamic-blue/10 dark:bg-islamic-blue/20'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {isPlaying && currentVerseId === verse.id ? <PauseCircle size={18} /> : <PlayCircle size={18} />}
                  </button>
                )}
                
                <button 
                  onClick={() => handleBookmark(verse.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    bookmarkedVerses.includes(verse.id)
                      ? 'text-islamic-blue dark:text-islamic-lightBlue bg-islamic-blue/10 dark:bg-islamic-blue/20'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="arabic-text text-right leading-loose" style={{ fontSize: `${1.5 * fontSize}rem` }}>
                {verse.arabic}
              </div>
              
              {showTransliteration && (
                <div className="transliteration text-muted-foreground dark:text-gray-400 italic" style={{ fontSize: `${0.9 * fontSize}rem` }}>
                  {verse.transliteration}
                </div>
              )}
              
              {showTranslation && (
                <div className="translation dark:text-gray-300" style={{ fontSize: `${1 * fontSize}rem` }}>
                  {verse.translation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranReader;
