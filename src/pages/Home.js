import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WellnessSection from '../components/WellnessSection';
import CommitmentSection from '../components/CommitmentSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <WellnessSection />
      <CommitmentSection />
    </main>
  );
};

export default Home; 