import { RECEIVE_USERS } from '../actions/user_actions';
import merge from 'lodash/merge';

const UsersReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, oldState, action.users);
    default:
      return oldState;
  }
};

export default UsersReducer;