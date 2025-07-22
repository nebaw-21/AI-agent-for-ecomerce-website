import React, { useEffect, useRef } from 'react';

function formatTime(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getAvatar(sender) {
  if (sender === 'user') return <span className="bg-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">U</span>;
  return <span className="bg-gray-700 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold">A</span>;
}

function Chat({ messages, input, onInputChange, onSend, onVoice, listening }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[32rem] bg-[#232329] rounded-2xl shadow-lg p-0">
      <div className="flex items-center px-6 pt-5 pb-3 border-b border-gray-800">
        <span className="text-lg font-semibold text-white">Chat</span>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col max-w-[70%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.sender !== 'user' && getAvatar(msg.sender)}
                <span className="text-xs text-gray-400">
                  {msg.sender === 'user' ? 'You' : 'Assistant'} • {formatTime(msg.timestamp)}
                </span>
                {msg.sender === 'user' && getAvatar(msg.sender)}
              </div>
              <div
                className={`px-4 py-2 rounded-2xl text-sm break-words shadow
                  ${msg.sender === 'user'
                    ? 'bg-[#a259f7] text-white rounded-br-none'
                    : 'bg-[#232329] text-gray-100 border border-gray-700 rounded-bl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-gray-800 px-4 py-3">
        <form
          className="flex items-center gap-2 bg-[#232329] rounded-xl px-3 py-2 border border-gray-700"
          onSubmit={e => { e.preventDefault(); onSend && onSend(); }}
        >
          <button
            type="button"
            onClick={onVoice}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors
              ${listening ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
            `}
            title="Voice Input"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v3m0 0h3m-3 0H9m6-3a6 6 0 10-12 0 6 6 0 0012 0zm-6 0V6a3 3 0 016 0v6a3 3 0 01-6 0z" />
            </svg>
          </button>
          <input
            value={input}
            onChange={e => onInputChange && onInputChange(e.target.value)}
            placeholder="Add a message..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-2"
            autoFocus
          />
          <button
            type="submit"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            title="Send"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;