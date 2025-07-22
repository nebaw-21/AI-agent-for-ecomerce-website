import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [
    { sender: 'assistant', text: 'Hello! How can I help you today?' }
  ],
  input: '',
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
    },
  },
});

export const { addMessage, setInput, clearChat } = chatSlice.actions;
export default chatSlice.reducer; 