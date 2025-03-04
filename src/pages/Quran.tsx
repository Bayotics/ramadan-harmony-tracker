
import React from 'react';
import Layout from '../components/Layout';
import QuranReader from '../components/QuranReader';
import { useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new query client instance for this page
const queryClient = new QueryClient();

const Quran = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  return (
    <Layout hideHeader>
      <div className="quran-page-container relative h-full bg-gradient-to-b from-emerald-400 via-emerald-300 to-blue-500 dark:from-emerald-900 dark:via-emerald-800 dark:to-blue-900 min-h-screen pt-4 pb-20">
        <style jsx>{`
          @keyframes pulse-gentle {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.85;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-pulse-gentle {
            animation: pulse-gentle 2s infinite ease-in-out;
          }
        `}</style>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden relative h-[calc(100vh-2rem)]">
          <div className="quran-reader-container h-full overflow-y-auto">
            <QueryClientProvider client={queryClient}>
              <QuranReader viewMode="reading" onBackClick={handleBackClick} />
            </QueryClientProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quran;
