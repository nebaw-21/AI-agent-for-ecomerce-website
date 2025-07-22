import React from 'react';

function HistoryPanel({ logs, onClose }) {
  return (
    <div className="fixed top-16 right-8 w-80 max-h-[70vh] bg-gray-900 text-white rounded-xl shadow-2xl z-50 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chat History</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
      </div>
      <div className="flex flex-col gap-3">
        {logs.length === 0 ? (
          <div className="text-gray-400 text-center">No history found.</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-3">
              <div className="font-semibold text-blue-300">User: {log.query}</div>
              <div className="mt-1 text-white">Assistant: {log.response}</div>
              <div className="mt-2 text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPanel; 