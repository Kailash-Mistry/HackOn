import React, { useEffect, useState } from 'react';
import ShowCard from '../components/ShowCard';

const TrendingSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/trending.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([trendingIds, allShows]) => {
      setShows(allShows.filter(s => trendingIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        {/* <span className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-2xl">🔥</span> */}
        <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 pl-4">
        {shows.map((show) => (
          <div key={show.id} className="min-w-[18rem] h-full flex">
            <ShowCard show={show} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection; 