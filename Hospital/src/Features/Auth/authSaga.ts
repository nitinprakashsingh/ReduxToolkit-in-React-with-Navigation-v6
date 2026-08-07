import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { forgotPasswordApi, loginApi } from './authApi';
import {
  forgotPasswordFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
} from './authSlice';
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginPayload,
  LoginResponse,
} from './auth.types';

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response: LoginResponse = yield call(loginApi, action.payload);
    yield put(loginSuccess({ user: response.data }));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message ?? error.message ?? 'Login failed'));
  }
}

function* handleForgotPassword(action: PayloadAction<ForgotPasswordPayload>) {
  try {
    const data: ForgotPasswordResponse = yield call(forgotPasswordApi, action.payload);
    yield put(forgotPasswordSuccess(data.message));
  } catch (error: any) {
    yield put(forgotPasswordFailure(error.response?.data?.message ?? error.message ?? 'Password reset failed'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(forgotPasswordRequest.type, handleForgotPassword);
}
