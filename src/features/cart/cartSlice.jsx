import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { _id, name, price, quantity, imageUrl }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const item = state.items.find(item => item._id === _id);
      if (item) item.quantity = quantity;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;