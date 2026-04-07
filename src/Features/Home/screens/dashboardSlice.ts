import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PostsState, Post } from './dashboard.types';

const initialState: PostsState = {
  data: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPostsRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;
export default postsSlice.reducer;