import React from 'react';

function Chat({ messages }) {
  return (
    <div className="max-h-96 overflow-y-auto p-4 bg-gray-800 rounded-lg mb-4 flex flex-col gap-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`inline-block px-4 py-3 rounded-2xl max-w-[70%] break-words text-base ${
            msg.sender === 'user'
              ? 'self-end bg-blue-600 text-white'
              : 'self-start bg-gray-200 text-gray-900'
          }`}
        >
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}

export default Chat; 