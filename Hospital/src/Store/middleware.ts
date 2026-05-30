import createSagaMiddleware from 'redux-saga';
import { Middleware } from '@reduxjs/toolkit';

export const sagaMiddleware = createSagaMiddleware();

export const loggerMiddleware: Middleware = () => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching:', action);
  }
  return next(action);
};