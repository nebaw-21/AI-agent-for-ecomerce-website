import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [],
  showHistory: false,
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    showHistoryPanel: (state) => {
      state.showHistory = true;
    },
    hideHistoryPanel: (state) => {
      state.showHistory = false;
    },
  },
});

export const { setLogs, showHistoryPanel, hideHistoryPanel } = logsSlice.actions;
export default logsSlice.reducer; 