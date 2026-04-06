import { all } from 'redux-saga/effects';
//import { authSaga } from '../features/auth/store/authSaga';
import {authSaga} from "../Features/Auth/authSaga"

export default function* rootSaga() {
  yield all([
    authSaga(),
    // dashboardSaga(),
  ]);
}