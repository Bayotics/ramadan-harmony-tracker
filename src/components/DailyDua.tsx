
import React from 'react';
import { Bookmark, Share, PlayCircle } from 'lucide-react';

interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
}

const dummyDuas: Dua[] = [
  {
    id: 1,
    title: "Morning Remembrance",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَٰهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul mulku walahul hamd, wa huwa 'ala kulli shay'in qadeer.",
    translation: "We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent.",
    category: "Morning & Evening"
  },
  {
    id: 2,
    title: "Dua Before Breaking Fast (Iftar)",
    arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma inni laka sumtu, wa bika aamantu, wa 'alayka tawakkaltu, wa 'ala rizqika aftartu.",
    translation: "O Allah, I fasted for Your sake, I believe in You, I rely on You, and I break my fast with Your sustenance.",
    category: "Fasting"
  }
];

const DailyDua: React.FC = () => {
  return (
    <div className="duas-container space-y-6 animate-fade-in">
      {dummyDuas.map((dua) => (
        <div key={dua.id} className="glass-card rounded-xl p-5 border border-islamic-blue/20 bg-gradient-to-r from-white/90 to-islamic-cream/80 shadow-lg hover:shadow-xl transition-shadow dark:from-gray-800/90 dark:to-gray-900/80 dark:border-gray-700/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1 text-islamic-darkBlue dark:text-gray-100">{dua.title}</h3>
              <span className="inline-block px-3 py-1 bg-islamic-blue/10 text-islamic-blue text-xs rounded-full dark:bg-islamic-blue/20 dark:text-islamic-lightBlue">
                {dua.category}
              </span>
            </div>
            
            <div className="flex space-x-1">
              <button className="text-muted-foreground hover:text-islamic-blue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:text-gray-400 dark:hover:text-islamic-lightBlue">
                <PlayCircle size={18} />
              </button>
              <button className="text-muted-foreground hover:text-islamic-blue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:text-gray-400 dark:hover:text-islamic-lightBlue">
                <Bookmark size={18} />
              </button>
              <button className="text-muted-foreground hover:text-islamic-blue transition-colors p-1.5 rounded-full hover:bg-islamic-blue/10 dark:text-gray-400 dark:hover:text-islamic-lightBlue">
                <Share size={18} />
              </button>
            </div>
          </div>
          
          <div className="arabic-text text-xl md:text-2xl mb-5 leading-relaxed text-islamic-darkBlue bg-islamic-cream/50 p-4 rounded-lg border border-islamic-gold/20 dark:bg-gray-800/50 dark:text-white dark:border-gray-700/30">
            {dua.arabic}
          </div>
          
          <div className="transliteration text-sm text-muted-foreground italic mb-3 bg-islamic-blue/5 p-3 rounded-lg dark:bg-gray-700/30 dark:text-gray-300">
            {dua.transliteration}
          </div>
          
          <div className="translation text-base p-3 border-l-4 border-islamic-blue/20 bg-islamic-blue/5 rounded-r-lg dark:bg-gray-700/30 dark:text-gray-200 dark:border-islamic-blue/30">
            {dua.translation}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyDua;
