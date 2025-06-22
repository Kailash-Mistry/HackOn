import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import EmbeddedVideoPlayer from '../components/EmbeddedVideoPlayer';
import ChatPollsPanel from '../components/ChatPollsPanel';

const VIDEO_SRC = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const WatchParty = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = location.state || {};
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Room link copied to clipboard!');
    });
  };

  if (!show) {
    // Redirect or show an error if show data is not available
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <h2 className="text-2xl font-bold mb-4">Error: Show information is missing.</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white p-4 lg:p-8 gap-8">
      {/* Left Column: Player and Room Info */}
      <div className={`flex-1 flex flex-col gap-6 transition-all duration-500 ${isPanelCollapsed ? 'w-full' : 'lg:w-[calc(100%-412px)]'}`}>
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          <EmbeddedVideoPlayer src={VIDEO_SRC} />
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Room ID</h2>
            <p className="text-2xl font-mono text-orange-400 tracking-wider">{roomId}</p>
          </div>
          <button
            onClick={handleShare}
            className="w-full md:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Right Column: Chat and Polls */}
      <div className={`transition-all duration-500 ${isPanelCollapsed ? 'w-0' : 'w-full lg:w-[380px]'}`}>
        {!isPanelCollapsed && (
          <ChatPollsPanel onCollapse={() => setIsPanelCollapsed(true)} />
        )}
      </div>

      {isPanelCollapsed && (
        <button
          onClick={() => setIsPanelCollapsed(false)}
          className="fixed top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 hover:bg-orange-500 text-white p-3 rounded-l-lg shadow-lg z-20"
          title="Show Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default WatchParty; 