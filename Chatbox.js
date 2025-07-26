// src/Chatbox.jsx
import React, { useState } from 'react';

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);

    setInput('');

    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { text: data.reply, sender: "bot" };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div>
      <div className="h-80 overflow-y-auto p-4 border rounded-md bg-gray-50 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === "user" ? "bg-purple-200" : "bg-pink-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-4 py-2 border rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
