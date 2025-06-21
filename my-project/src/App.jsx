import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';

const App = () => {
  const [moodInput, setMoodInput] = useState('');
  const [detectedMood, setDetectedMood] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Now receives both input and detectedMood from Navbar
  const handleMoodSubmit = (input, detectedMood) => {
    setMoodInput(input);
    setDetectedMood(detectedMood);
    setSearchResults(null);
    setSearchQuery('');
    setSearchError('');
  };

  const handleSearchResults = (results, query, loading, error) => {
    setSearchResults(results);
    setSearchQuery(query);
    setSearchLoading(loading);
    setSearchError(error || '');
    setMoodInput('');
    setDetectedMood('');
  };

  const handleCloseMood = () => {
    setMoodInput('');
    setDetectedMood('');
  };

  const handleCloseSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
    setSearchLoading(false);
    setSearchError('');
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar onMoodSubmit={handleMoodSubmit} onSearchResults={handleSearchResults} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <Home 
                moodInput={moodInput} 
                detectedMood={detectedMood} 
                onCloseMood={handleCloseMood}
                searchResults={searchResults}
                searchQuery={searchQuery}
                onCloseSearch={handleCloseSearch}
                searchLoading={searchLoading}
                searchError={searchError}
              />
            } />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
