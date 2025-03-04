
import React from 'react';
import Layout from '../components/Layout';
import QuranReader from '../components/QuranReader';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quran = () => {
  const navigate = useNavigate();
  
  return (
    <Layout hideHeader>
      <div className="quran-page-container relative h-full bg-gradient-to-b from-emerald-400 via-emerald-300 to-blue-500 dark:from-emerald-900 dark:via-emerald-800 dark:to-blue-900 min-h-screen pt-4 pb-20">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden relative h-[calc(100vh-2rem)]">
          <div className="quran-reader-container h-full overflow-y-auto">
            <QuranReader viewMode="reading" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quran;
