import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    { sender: 'assistant', text: 'Hello! How can I help you today?' }
  ],
  input: '',
  loading: false,
  error: null,
};

export const sendChatMessage = (user_id, message) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  dispatch(addMessage({ sender: 'user', text: message }));
  dispatch(setInput(''));
  try {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, message }),
    });
    if (!res.ok) throw new Error('Failed to get response from backend');
    const data = await res.json();
    dispatch(addMessage({ sender: 'assistant', text: data.response }));
  } catch (err) {
    dispatch(addMessage({ sender: 'assistant', text: 'Sorry, there was an error contacting the assistant.' }));
    dispatch(setError('Chat error'));
  } finally {
    dispatch(setLoading(false));
  }
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    clearChat: (state) => {
      state.messages = initialState.messages;
      state.input = '';
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addMessage, setInput, clearChat, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;