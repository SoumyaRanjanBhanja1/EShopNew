import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await fetch('http://localhost:10000/api/admin/orders', {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;