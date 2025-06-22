import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowCard = ({ show }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[20rem] h-[30rem] bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-800 hover:border-orange-500/50 flex flex-col"
      onClick={() => navigate(`/show/${show.id}`)}
    >
      <div className="w-full h-full relative overflow-hidden">
        <img
          src="/assets/stranger-things.jpg"
          alt={show.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ShowCard; 