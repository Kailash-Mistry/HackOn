import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TABS = ['Chat', 'Polls', 'React'];

const ShowDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [tab, setTab] = useState('Chat');

  useEffect(() => {
    fetch('/src/data/shows.json')
      .then(res => res.json())
      .then(data => setShow(data.find(s => s.id === id)));
  }, [id]);

  if (!show) {
    return <div className="text-white p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner */}
      <div className="relative w-full h-[50vh] flex items-end bg-gradient-to-t from-black via-black/60 to-transparent overflow-hidden mb-8">
        <img
          src={show.banner}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        <div className="relative z-20 p-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{show.title}</h1>
          <div className="flex items-center gap-4 mb-2 text-lg">
            <span className="text-yellow-400 font-bold">★ {show.rating}</span>
            <span>{show.duration}</span>
            <span>{show.year}</span>
          </div>
          <p className="text-lg text-gray-200 mb-4 line-clamp-2">{show.description}</p>
          <div className="flex gap-2 mb-6">
            {show.genres.map((g) => (
              <span key={g} className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-white/80">{g}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-lg shadow-lg transition-all">Play Now</button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all">Back</button>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${tab === t ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="bg-gray-900 rounded-b-lg p-6 min-h-[200px]">
          {tab === 'Chat' && <div className="text-gray-300">Live chat coming soon!</div>}
          {tab === 'Polls' && <div className="text-gray-300">Polls coming soon!</div>}
          {tab === 'React' && <div className="text-gray-300">Reactions coming soon!</div>}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails; 