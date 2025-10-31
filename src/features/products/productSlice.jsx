import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from "../config"; 

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('/api/products');
  return res.data;
});

export const fetchProductsByName = createAsyncThunk(
  'products/search',
  async (name) => {
    const res = await axios.get(`${ API_BASE_URL } /api/products/search?name=${name}`);
    return await res.json();
  }
);

export const createProduct = createAsyncThunk('products/create', async (formData) => {
  const res = await axios.post('/api/products', formData);
  return res.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await axios.put(`/api/products/${id}`, data);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`/api/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
