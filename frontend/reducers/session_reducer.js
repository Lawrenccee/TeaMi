import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _null = {
  currentUser: null,
};

const SessionReducer = (oldState = _null, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.user) {
        return merge({}, { currentUser: action.user });
      } else {
        return merge({}, { currentUser: action.user });
      }
    default: 
      return oldState;
  }
};

export default SessionReducer;