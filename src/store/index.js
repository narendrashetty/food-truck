import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      loggerMiddleware,
      thunkMiddleware
    )
  );

  return store;
}