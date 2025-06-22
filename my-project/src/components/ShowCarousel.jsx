import React, { useRef } from 'react';
import ShowCard from './ShowCard';

const ShowCarousel = ({ shows, hideScrollbar }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      <div
        className={`flex gap-4 overflow-x-auto pb-4 ${hideScrollbar ? 'hide-scrollbar' : 'scrollbar-hide'}`}
        ref={scrollRef}
      >
        {shows.map((show) => (
          <div key={show.id} className="flex-shrink-0 w-64">
            <ShowCard show={show} />
          </div>
        ))}
      </div>
      {/* Scroll buttons for desktop */}
      <button
        className="flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full z-10"
        style={{ left: '0.5rem' }}
        onClick={() => scroll('left')}
        aria-label="Scroll left"
      >
        ◀
      </button>
      <button
        className="flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full z-10"
        style={{ right: '0.5rem' }}
        onClick={() => scroll('right')}
        aria-label="Scroll right"
      >
        ▶
      </button>
    </div>
  );
};

export default ShowCarousel; 