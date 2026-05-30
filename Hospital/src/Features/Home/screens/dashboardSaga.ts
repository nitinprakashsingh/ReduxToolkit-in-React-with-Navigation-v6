import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from './dashboardSlice';
import { fetchPostsApi } from './dashboardapi';
import type { Post } from './dashboard.types';

// Worker saga — does the actual API call
function* handleFetchPosts() {
  try {
    const data: Post[] = yield call(fetchPostsApi);  // ✅ call API
    yield put(fetchPostsSuccess(data));               // ✅ store in Redux
  } catch (error: any) {
    yield put(fetchPostsFailure(error.message));      // ✅ store error
  }
}

// Watcher saga
export function* postsSaga() {
  yield takeLatest(fetchPostsRequest.type, handleFetchPosts);
}