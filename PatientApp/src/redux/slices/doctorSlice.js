import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDoctors as fetchDoctorsApi } from '../../services/doctorService';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchDoctorsApi();
    return response.data?.data || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to load doctors.');
  }
});

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to load doctors.';
      });
  },
});

export default doctorSlice.reducer;
