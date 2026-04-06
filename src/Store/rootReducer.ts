import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // dashboard: dashboardReducer,
});

export default rootReducer;