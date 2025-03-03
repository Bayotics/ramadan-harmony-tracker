
import React from 'react';

interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

const dummyDuas: Dua[] = [
  {
    id: 1,
    title: "Morning Remembrance",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَٰهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la shareeka lah, lahul mulku walahul hamd, wa huwa 'ala kulli shay'in qadeer.",
    translation: "We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise, and He is over all things omnipotent."
  },
  {
    id: 2,
    title: "Dua Before Breaking Fast (Iftar)",
    arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma inni laka sumtu, wa bika aamantu, wa 'alayka tawakkaltu, wa 'ala rizqika aftartu.",
    translation: "O Allah, I fasted for Your sake, I believe in You, I rely on You, and I break my fast with Your sustenance."
  }
];

const DailyDua: React.FC = () => {
  return (
    <div className="duas-container space-y-6 animate-fade-in">
      {dummyDuas.map((dua) => (
        <div key={dua.id} className="dua-card">
          <h3 className="text-xl font-semibold mb-4 text-islamic-blue">{dua.title}</h3>
          
          <div className="arabic-text text-xl md:text-2xl mb-4 leading-relaxed">
            {dua.arabic}
          </div>
          
          <div className="transliteration text-sm text-muted-foreground italic mb-3">
            {dua.transliteration}
          </div>
          
          <div className="translation text-base">
            {dua.translation}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyDua;
