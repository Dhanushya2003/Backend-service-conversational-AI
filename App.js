import React from 'react';
import Chatbox from './Chatbox';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100">
      <div className="w-full max-w-2xl p-4 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4 text-purple-700">🛍️ E-commerce Support Chat</h1>
        <Chatbox />
      </div>
    </div>
  );
}

export default App;
