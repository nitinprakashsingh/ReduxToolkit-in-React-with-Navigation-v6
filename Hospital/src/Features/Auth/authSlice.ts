import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, LoginPayload, SignUpPayload, ForgotPasswordPayload } from './auth.types';

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
      state.resetMessage = null;
    },
    signupSuccess(state, action: PayloadAction<{ user: User }>) {
      state.isLoading = false;
      state.user = action.payload.user;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest(state, _action: PayloadAction<ForgotPasswordPayload>) {
      state.isLoading = true;
      state.error = null;
      state.resetMessage = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.resetMessage = action.payload;
    },
    forgotPasswordFailure(state, action: PayloadAction<string>) {
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
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearAuthMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
