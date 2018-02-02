// Might never even reach these errors... because of validations
import { 
  RECEIVE_CHAT_ERRORS, 
  RECEIVE_CHATS, 
  RECEIVE_CHAT 
} from './chats_reducer';

const ChatErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CHAT_ERRORS:
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
    case RECEIVE_CHATS:
      return [];
    case RECEIVE_CHAT:
      return [];
    default:
      return oldState;
  }
};

export default ChatErrorsReducer;