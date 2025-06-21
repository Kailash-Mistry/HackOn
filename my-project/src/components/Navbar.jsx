import React, { useRef, useState, useEffect } from 'react';
import { detectMoodBERT } from '../utils/recommendations';
import { searchShows } from '../utils/search';
import { MOOD_PHRASES } from '../utils/constants';
import Logo from './Logo';
import Navigation from './Navigation';
import MoodDropdown from './MoodDropdown';

const Navbar = ({ onMoodSubmit, onSearchResults }) => {
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [moodInput, setMoodInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  
  const dropdownRef = useRef(null);
  const heartBtnRef = useRef(null);
  const searchBtnRef = useRef(null);
  const searchBarRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !heartBtnRef.current.contains(event.target)
      ) {
        setShowMoodDropdown(false);
        setMoodInput('');
        setLoading(false);
      }
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        !searchBtnRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
        setSearchInput('');
      }
    }
    
    if (showMoodDropdown || showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMoodDropdown, showSearchBar]);

  // Mood handling
  const handleHeartClick = () => setShowMoodDropdown((v) => !v);
  const handleInputChange = (e) => setMoodInput(e.target.value);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (moodInput.trim()) {
      setLoading(true);
      const detectedMood = await detectMoodBERT(moodInput);
      setLoading(false);
      onMoodSubmit(moodInput, detectedMood);
      setShowMoodDropdown(false);
      setMoodInput('');
    }
  };
  
  const handleMoodBtn = async (mood) => {
    setMoodInput(MOOD_PHRASES[mood]);
    setLoading(true);
    const detectedMood = await detectMoodBERT(MOOD_PHRASES[mood]);
    setLoading(false);
    onMoodSubmit(MOOD_PHRASES[mood], detectedMood);
    setShowMoodDropdown(false);
    setMoodInput('');
  };

  // Search handling
  const handleSearchClick = () => {
    setShowSearchBar((v) => !v);
    setShowMoodDropdown(false);
    setSearchInput('');
  };
  
  const handleSearchInputChange = (e) => setSearchInput(e.target.value);
  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    onSearchResults(null, searchInput, true); // Signal loading
    
    const { results, error } = await searchShows(searchInput);
    
    if (error) {
      onSearchResults([], searchInput, false, error);
    } else {
      onSearchResults(results, searchInput, false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
        <Logo />
        <Navigation />
        
        <div className="flex items-center gap-4 relative">
          <button
            ref={heartBtnRef}
            className={`p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg relative ${showMoodDropdown ? 'bg-gray-800 text-orange-400' : ''}`}
            title="Favorites"
            onClick={handleHeartClick}
            aria-haspopup="true"
            aria-expanded={showMoodDropdown}
          >
            ❤️
          </button>
          
          <MoodDropdown
            isOpen={showMoodDropdown}
            moodInput={moodInput}
            loading={loading}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onMoodBtn={handleMoodBtn}
            onClose={() => { setShowMoodDropdown(false); setMoodInput(''); setLoading(false); }}
            dropdownRef={dropdownRef}
          />
          
          <button
            ref={searchBtnRef}
            className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
            title="Search"
            onClick={handleSearchClick}
          >
            🔍
          </button>

          {showSearchBar && (
            <div ref={searchBarRef} className="absolute right-14 top-full mt-2 w-full max-w-xs">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-orange-400 min-w-0"
                  placeholder="Search for a show..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center disabled:opacity-60"
                  aria-label="Search"
                  disabled={!searchInput.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-6-6 18-2-8-8-2z" />
                  </svg>
                </button>
              </form>
            </div>
          )}
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Settings">⚙️</button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800 rounded-lg" title="Profile">👤</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 