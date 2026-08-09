import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser as loginUserApi } from '../../services/authService';

const authStorageKey = 'patient-app-demo-authenticated';

const initialState = {
  user: null,
  isAuthenticated: Boolean(window.localStorage.getItem(authStorageKey) === 'true'),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await loginUserApi({ email, password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Unable to sign in right now.');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      window.localStorage.removeItem(authStorageKey);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.data || action.payload;
        state.isAuthenticated = true;
        window.localStorage.setItem(authStorageKey, 'true');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to sign in right now.';
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
