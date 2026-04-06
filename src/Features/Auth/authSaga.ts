import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { loginApi } from './utils/authHelpers';
import type { LoginPayload } from './auth.types';
import type { PayloadAction } from '@reduxjs/toolkit';

// Worker saga — runs on each loginRequest
// function* handleLogin(action: PayloadAction<LoginPayload>) {
//   try {
//     const data: { user: any; token: string } = yield call(loginApi, action.payload);
//     yield put(loginSuccess(data));
//   } catch (error: any) {
//     yield put(loginFailure(error.message));
//   }
// }

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    // No API call — just store the credentials directly
    yield put(
      loginSuccess({
        user: {
          id: '0',
          name: action.payload.email,
          role: 'user',
          email: action.payload.email,
          password: action.payload.password
        },
        token: '',
      }),
    );
    //Hello testing branch is created
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

// Watcher saga — listens for loginRequest action
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}