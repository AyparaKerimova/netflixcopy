import React, { useState } from "react";
import { Send } from "lucide-react";
import { useSocket } from "../../hooks/useSocket";

function App() {
  const { messages, sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id;

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-lg shadow-xl overflow-hidden">
        <div className="bg-[#E50914] p-4">
          <h2 className="text-white text-xl font-bold">Netflix Support</h2>
          <p className="text-white/80 text-sm">Logged in as: {user?.email}</p>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex ${msg.sender === userId ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[80%] rounded-lg p-3 ${
        msg.sender === userId
          ? "bg-[#E50914] text-white"
          : "bg-[#2a2a2a] text-gray-200"
      }`}
    >
      <p className="text-xs text-white/80 mb-1">
        {msg.nickname} 
      </p>
      <p className="text-sm">{msg.text}</p>
    </div>
  </div>
))}

        </div>
        <div className="p-4 bg-[#1a1a1a] border-t border-[#2a2a2a]">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-[#2a2a2a] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E50914] placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              className="bg-[#E50914] text-white p-2 rounded-lg hover:bg-[#f40612] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;