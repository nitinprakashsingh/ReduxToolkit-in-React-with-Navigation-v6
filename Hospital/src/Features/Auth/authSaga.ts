import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { loginApi } from './authApi';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from './authSlice';
import type { LoginPayload, LoginResponse } from './auth.types';

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const response: LoginResponse = yield call(loginApi, action.payload);
    window.localStorage.setItem('admin_token', response.token);
    yield put(loginSuccess({ user: response.data, token: response.token }));
  } catch (error: any) {
    yield put(loginFailure(error.response?.data?.message ?? error.message ?? 'Login failed'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
