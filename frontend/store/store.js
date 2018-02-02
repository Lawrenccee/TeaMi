import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
// import logger from 'redux-logger'; // TODO REMOVE FOR PRODUCTION
import thunk from '../thunk/thunk';

const configureStore = (preloadedState) => {
  const store = createStore(
    RootReducer, 
    preloadedState, 
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;