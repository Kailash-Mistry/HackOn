import React from 'react';

const Navbar = () => (
  <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
          <span role="img" aria-label="tv" className="text-2xl">📺</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Fire TV
        </h1>
      </div>
      <nav className="flex items-center gap-8">
        <a href="/" className="text-white hover:text-orange-400 font-medium">Home</a>
        <a href="#" className="text-gray-400 hover:text-white">Movies</a>
        <a href="#" className="text-gray-400 hover:text-white">TV Shows</a>
        <a href="#" className="text-gray-400 hover:text-white">My List</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Favorites">❤️</button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Search">🔍</button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Settings">⚙️</button>
        <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Profile">👤</button>
      </div>
    </div>
  </header>
);

export default Navbar; 