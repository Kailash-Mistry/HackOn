import React, { useEffect, useState } from 'react';
import ShowCarousel from '../components/ShowCarousel';

const WatchHistorySection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/history.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([historyIds, allShows]) => {
      setShows(allShows.filter(s => historyIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-2xl">🕒</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Watch History</h2>
      </div>
      <ShowCarousel shows={shows} />
    </section>
  );
};

export default WatchHistorySection; 