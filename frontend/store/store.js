import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import logger from 'redux-logger'; // TODO REMOVE FOR PRODUCTION
import thunk from '../thunk/thunk';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer, 
    preloadedState, 
    applyMiddleware(thunk, logger)
  );

  return store;
};

export default configureStore;