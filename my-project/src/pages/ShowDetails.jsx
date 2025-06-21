import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import VideoPlayer from '../components/VideoPlayer';
import AddToPlaylistModal from '../components/AddToPlaylistModal';

const TABS = ['Chat', 'Polls', 'React'];
const VIDEO_SRC = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const ShowDetails = ({ playlists, onPlaylistManagement }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [tab, setTab] = useState('Chat');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);

  useEffect(() => {
    fetch('/src/data/shows.json')
      .then(res => res.json())
      .then(data => setShow(data.find(s => s.id === id)));
  }, [id]);

  const handleAgree = () => {
    setShowTermsModal(false);
    setShowConfirmationModal(true);
    setTimeout(() => {
      setShowConfirmationModal(false);
    }, 2000); // Close after 2 seconds
  };

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
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold text-lg shadow-lg transition-all"
              onClick={() => setShowPlayer(true)}
            >
              Play Now
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all"
              onClick={() => setPlaylistModalOpen(true)}
            >
              Add to Playlist
            </button>
            <button 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all"
              onClick={() => setShowTermsModal(true)}
            >
              Watch Privately
            </button>
            <button 
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold text-lg shadow-lg transition-all"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
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

      {showPlayer && <VideoPlayer src={VIDEO_SRC} onClose={() => setShowPlayer(false)} />}

      <AddToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        playlists={playlists}
        show={show}
        onDone={(...args) => {
          onPlaylistManagement(...args);
          setPlaylistModalOpen(false);
        }}
      />

      {/* Terms and Conditions Modal */}
      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
        <h2 className="text-2xl font-bold mb-4">Watching Privately</h2>
        <div className="text-gray-300 mb-6 space-y-4 text-left">
          <p className="text-base">When you watch privately:</p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
            <li>
              <span className="font-semibold text-gray-200">No Sharing:</span> Your activity won't appear on your profile or be shared with friends.
            </li>
            <li>
              <span className="font-semibold text-gray-200">No Influence:</span> Your viewing won't affect your personalized recommendations.
            </li>
            <li>
              <span className="font-semibold text-gray-200">Hidden History:</span> Content you watch will be hidden from your public history.
            </li>
            <li>
              <span className="font-semibold text-gray-200">Socials Disabled:</span> Features like chat and reactions are turned off.
            </li>
          </ul>
          <p className="text-xs text-gray-500 pt-2">
            Note: This mode enhances privacy but does not make you anonymous. Activity may still be logged for internal analytics.
          </p>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-600"
          />
          <label htmlFor="terms" className="ml-2 text-gray-300">
            I have read and understood all the instructions.
          </label>
        </div>
        <button
          onClick={handleAgree}
          disabled={!termsAccepted}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all"
        >
          Agree
        </button>
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Watching Privately</h2>
          <p className="text-gray-300">You are now watching privately.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowDetails; 