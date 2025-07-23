import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setInput, sendChatMessage } from './store/slices/chatSlice';
import { setProduct, clearProduct } from './store/slices/productSlice';
import { setLogs, showHistoryPanel, hideHistoryPanel } from './store/slices/logsSlice';
import Chat from './components/Chat';
import ProductCard from './components/ProductCard';
import HistoryPanel from './components/HistoryPanel';
import ProductDisplay from './components/ProductDisplay';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderPage from './components/OrderPage';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const input = useSelector(state => state.chat.input);
  const product = useSelector(state => state.product.product);
  const logs = useSelector(state => state.logs.logs);
  const showHistory = useSelector(state => state.logs.showHistory);
  const [chatOpen, setChatOpen] = useState(false);
  const [listening, setListening] = useState(false);

  const API_BASE = 'http://localhost:5000';

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    if (text.toLowerCase().startsWith('check product')) {
      const name = text.split('check product')[1]?.trim();
      if (name) {
        const res = await fetch(`${API_BASE}/product/name/${encodeURIComponent(name)}`);
        if (res.ok) {
          const data = await res.json();
          dispatch(setProduct({ product_name: name, ...data }));
          dispatch(addMessage({ sender: 'assistant', text: `Product "${name}": ${data.available ? 'Available' : 'Out of Stock'}, Stock: ${data.stock}` }));
        } else {
          dispatch(clearProduct());
          dispatch(addMessage({ sender: 'assistant', text: `Product "${name}" not found.` }));
        }
      }
    } else {
      dispatch(clearProduct());
      dispatch(sendChatMessage('USER1', text));
    }
  };

  // Voice input logic moved here for integration with Chat input
  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      dispatch(setInput(text));
      sendMessage(text);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const fetchLogs = async () => {
    const userId = 'USER1';
    const res = await fetch(`${API_BASE}/log/${userId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(setLogs(data.logs));
    }
    dispatch(showHistoryPanel());
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header with navigation */}
        <header className="bg-white shadow flex items-center justify-between px-8 py-4 mb-8">
          <h1 className="text-2xl font-bold text-blue-700">AI E-Commerce Assistant</h1>
          <nav className="flex gap-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Products</a>
            <a href="/order" className="text-gray-700 hover:text-blue-600 font-medium">Orders</a>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<ProductDisplay />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </main>
        {/* Floating Chatbot Button */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setChatOpen(true)}
          style={{ fontSize: '2rem' }}
          aria-label="Open Chatbot"
        >
          💬
        </button>
        {/* Chat Modal */}
        {chatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 rounded-2xl shadow-lg p-8 relative w-full max-w-lg mx-auto">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
                onClick={() => setChatOpen(false)}
                aria-label="Close Chatbot"
              >
                ×
              </button>
              <Chat
                messages={messages}
                input={input}
                onInputChange={val => dispatch(setInput(val))}
                onSend={() => sendMessage(input)}
                onVoice={handleVoice}
                listening={listening}
              />
              {product && <ProductCard product={product} />}
              <button
                onClick={fetchLogs}
                className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                View Chat History
              </button>
              {showHistory && <HistoryPanel logs={logs} onClose={() => dispatch(hideHistoryPanel())} />}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
