import { TOGGLE_CHAT_INFO } from '../actions/ui_actions';

const ChatInfoReducer = (oldState = false, action) => {
  switch(action.type) {
    case TOGGLE_CHAT_INFO:
      return !oldState;
    default:
      return oldState;
  }
};

export default ChatInfoReducer;