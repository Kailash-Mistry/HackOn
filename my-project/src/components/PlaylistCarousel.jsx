import React from 'react';
import ShowCard from './ShowCard';

const PlaylistCarousel = ({ title, shows }) => (
  <section className="mb-6">
    <div className="flex items-center gap-2 mb-2">
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
      {shows.map(show => (
        <div key={show.id} className="min-w-[18rem] h-full flex">
          <ShowCard show={show} />
        </div>
      ))}
    </div>
  </section>
);

export default PlaylistCarousel; 