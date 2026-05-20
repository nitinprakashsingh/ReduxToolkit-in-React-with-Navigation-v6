import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, LoginPayload, SignUpPayload } from './auth.types';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Saga watches this action to trigger the login flow
    loginRequest(state, _action: PayloadAction<LoginPayload>) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User }>) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signupRequest(state, _action: PayloadAction<SignUpPayload>) {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<{ user: User }>) {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;