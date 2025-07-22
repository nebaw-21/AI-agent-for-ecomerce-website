import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { setProduct, clearProduct, setProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer; 