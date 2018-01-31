import { 
  RECEIVE_SESSION_ERRORS, 
  RECEIVE_CURRENT_USER, 
  CLEAR_SESSION_ERRORS
} from '../actions/session_actions'; 

const sessionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      let newState = []; //oldState.slice();

      if (action.errors.responseJSON) {
        action.errors.responseJSON.forEach((response) => {
          if (newState.indexOf(response) < 0) {
            newState.push(response);
          }
        });
      } else {
        action.errors.forEach(error => {
          if (newState.indexOf(error.responseText) < 0) {
            newState.push(error.responseText);
          }
        });
      }

      return newState;
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_SESSION_ERRORS:
      return [];
    default: 
      return oldState;
  }
};

export default sessionErrorsReducer;