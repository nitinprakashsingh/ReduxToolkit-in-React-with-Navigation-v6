import { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching:', action);
  }
  return next(action);
};