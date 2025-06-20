import React from 'react';

// Import the HeroBanner section (to be implemented next)
import HeroBanner from '../sections/HeroBanner';
import TrendingSection from '../sections/TrendingSection';
// import WatchHistorySection from '../sections/WatchHistorySection';
import RecommendedSection from '../sections/RecommendedSection';
import ContinueWatchingSection from '../sections/ContinueWatchingSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar (to be added as a component) */}
      {/* <Navbar /> */}

      {/* Hero Banner / Featured Show */}
      <HeroBanner />
      <ContinueWatchingSection />
      <TrendingSection />
      <RecommendedSection />
      {/* <WatchHistorySection /> */}
      {/* Other sections (Trending, Watch History, etc.) will go here */}
    </div>
  );
};

export default Home; 