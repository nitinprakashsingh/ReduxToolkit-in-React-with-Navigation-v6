import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice';
import postsReducer from '../Features/Home/screens/dashboardSlice';

const rootReducer = combineReducers({
  auth: authReducer,
   dashboard: postsReducer,
});



export default rootReducer;