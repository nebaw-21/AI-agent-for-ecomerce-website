import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setInput } from './store/slices/chatSlice';
import { setProduct, clearProduct } from './store/slices/productSlice';
import { setLogs, showHistoryPanel, hideHistoryPanel } from './store/slices/logsSlice';
import Chat from './components/Chat';
import VoiceInput from './components/VoiceInput';
import ProductCard from './components/ProductCard';
import HistoryPanel from './components/HistoryPanel';

function App() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);
  const input = useSelector(state => state.chat.input);
  const product = useSelector(state => state.product.product);
  const logs = useSelector(state => state.logs.logs);
  const showHistory = useSelector(state => state.logs.showHistory);

  const API_BASE = 'http://localhost:5000';

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    dispatch(addMessage({ sender: 'user', text }));
    dispatch(setInput(''));
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
      dispatch(addMessage({ sender: 'assistant', text: 'Sorry, I can only check product availability in this demo.' }));
    }
  };

  const handleVoice = (transcript) => {
    sendMessage(transcript);
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
    <div className="max-w-lg mx-auto bg-gray-900 rounded-2xl shadow-lg p-8 relative mt-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">AI E-Commerce Assistant</h1>
      <Chat messages={messages} />
      <form
        onSubmit={e => { e.preventDefault(); sendMessage(input); }}
        className="flex gap-2 mb-4"
      >
        <input
          value={input}
          onChange={e => dispatch(setInput(e.target.value))}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Send</button>
      </form>
      <VoiceInput onTranscript={handleVoice} />
      {product && <ProductCard product={product} />}
      <button
        onClick={fetchLogs}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
      >
        View Chat History
      </button>
      {showHistory && <HistoryPanel logs={logs} onClose={() => dispatch(hideHistoryPanel())} />}
    </div>
  );
}

export default App;
