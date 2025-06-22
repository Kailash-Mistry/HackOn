import React, { useState } from 'react';

const TABS = ['Chat', 'Polls'];

const ChatPollsPanel = ({ onCollapse }) => {
  const [activeTab, setActiveTab] = useState('Chat');

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl flex flex-col h-full relative">
      {/* Collapse Button */}
      <button 
        onClick={onCollapse}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg z-10"
        title="Collapse Panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Tabs */}
      <div className="flex-shrink-0 p-2 border-b border-gray-800">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'Chat' && (
          <div>
            <p className="text-gray-400">Live chat coming soon!</p>
            {/* Placeholder for future chat messages */}
          </div>
        )}
        {activeTab === 'Polls' && (
          <div>
            <p className="text-gray-400">Polls coming soon!</p>
            {/* Placeholder for future polls */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPollsPanel; 