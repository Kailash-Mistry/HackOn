import React, { useEffect, useState } from 'react';
import ShowCard from '../components/ShowCard';

const RecommendedSection = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/src/data/recommended.json').then(res => res.json()),
      fetch('/src/data/shows.json').then(res => res.json()),
    ]).then(([recommendedIds, allShows]) => {
      setShows(allShows.filter(s => recommendedIds.includes(s.id)));
    });
  }, []);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-2xl">✨</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Recommended for You</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <div key={show.id} className="w-80 mx-auto">
            <ShowCard show={show} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedSection; 