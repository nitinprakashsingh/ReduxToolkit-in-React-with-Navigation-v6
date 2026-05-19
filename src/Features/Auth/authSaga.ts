import { call, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from './authSlice';
import { loginApi, signupApi } from './authApi';
import type { LoginPayload, SignUpPayload } from './auth.types';
import type { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const data: { user: any; token: string } = yield call(loginApi, action.payload);
    yield put(loginSuccess(data));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message ?? error.message ?? 'Login failed'));
  }
}

function* handleSignup(action: PayloadAction<SignUpPayload>) {
  try {
    const data = yield call(signupApi, action.payload);
    yield put(signupSuccess({ user: data.data }));
  } catch (error: any) {
    yield put(signupFailure(error.response?.data?.message ?? error.message ?? 'Signup failed'));
  }
}

// Watcher saga — listens for loginRequest and signupRequest actions
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}
