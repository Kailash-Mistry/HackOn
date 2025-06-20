import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-800 hover:border-orange-500/50 flex flex-col"
      onClick={() => navigate(`/show/${show.id}`)}
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
          ★ {show.rating}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{show.title}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2 flex-1">{show.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {show.genres.map((g) => (
            <span key={g} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCard; 