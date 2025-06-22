import React, { useState, useCallback } from 'react';

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const StreamModal = ({ onClose, onCreateRoom }) => {
  const [roomCode, setRoomCode] = useState(generateRoomCode());

  const handleCreateRoom = useCallback(() => {
    onCreateRoom(roomCode);
    onClose();
  }, [roomCode, onClose, onCreateRoom]);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(roomCode);
    // Optional: Add a visual indicator that the code has been copied
  }, [roomCode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stream Now</h2>
        <p className="text-gray-400 mb-6">Share this code with your friends to start a watch party.</p>
        
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="bg-gray-800 border border-dashed border-gray-600 rounded-lg px-6 py-4 text-3xl font-mono tracking-widest text-orange-400">
            {roomCode}
          </div>
          <button
            onClick={handleCopyToClipboard}
            className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            title="Copy to Clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleCreateRoom}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all text-lg"
          >
            Create Room
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamModal; 