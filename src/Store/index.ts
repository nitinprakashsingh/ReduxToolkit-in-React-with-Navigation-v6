import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { sagaMiddleware, loggerMiddleware } from './middleware';
import rootSaga from './rootSaga';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })   // ← disable thunk
      .concat(sagaMiddleware)
      .concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);  // ← must be AFTER configureStore

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;