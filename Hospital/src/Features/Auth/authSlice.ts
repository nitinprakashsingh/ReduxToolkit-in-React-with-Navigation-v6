import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, LoginPayload } from './auth.types';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  resetMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Saga watches this action to trigger the login flow
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
      state.error = null;
      state.resetMessage = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearAuthMessage(state) {
      state.error = null;
      state.resetMessage = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.resetMessage = null;
      window.localStorage.removeItem('admin_token');
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  clearAuthMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
