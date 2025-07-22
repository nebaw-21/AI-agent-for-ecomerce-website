import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import productReducer from './slices/productSlice';
import logsReducer from './slices/logsSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    product: productReducer,
    logs: logsReducer,
  },
});

export default store; 