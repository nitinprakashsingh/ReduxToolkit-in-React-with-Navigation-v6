import { all } from 'redux-saga/effects';
//import { authSaga } from '../features/auth/store/authSaga';
import {authSaga} from "../Features/Auth/authSaga"
import { postsSaga } from '../Features/Home/screens/dashboardSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    postsSaga(),
  ]);
}

// rootReducer.ts
