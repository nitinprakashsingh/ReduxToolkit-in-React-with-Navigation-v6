import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export const loggerMiddleware = () => (next) => (action) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Dispatching:', action);
  }
  return next(action);
};
