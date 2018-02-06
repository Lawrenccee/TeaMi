import { RECEIVE_GIPHYS, CLEAR_GIPHYS } from '../actions/giphy_actions';

const GiphysReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_GIPHYS:
      return oldState.concat(action.giphys);
    case CLEAR_GIPHYS:
      return [];
    default:
      return oldState;
  }
};

export default GiphysReducer;