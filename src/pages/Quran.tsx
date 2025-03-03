
import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import QuranReader from '../components/QuranReader';

const Quran = () => {
  return (
    <Layout>
      <div className="page-container">
        <Header title="Quran Reader" showBismillah />
        <QuranReader />
      </div>
    </Layout>
  );
};

export default Quran;
