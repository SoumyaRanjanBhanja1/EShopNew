// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
//   const res = await fetch('http://localhost:10000/api/admin/orders', {
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data;
// });

// const orderSlice = createSlice({
//   name: 'orders',
//   initialState: {
//     items: [],
//     loading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchOrders.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default orderSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:10000";

// ------------------ ASYNC THUNKS ------------------

// Fetch all orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/orders`, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);

// Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/orders`, order, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create order");
    }
  }
);

// Update order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/api/orders/${id}`, data, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update order");
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/api/orders/${id}`, { withCredentials: true });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete order");
    }
  }
);

// ------------------ SLICE ------------------

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetOrders: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.items.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((o) => o._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;