import {
  RECEIVE_CHAT_HIGHLIGHT,
  CLEAR_CHAT_HIGHLIGHT
} from '../actions/ui_actions';

const ChatHighlightReducer = (oldState = null, action) => {
  Object.freeze(null);

  switch(action.type) {
    case RECEIVE_CHAT_HIGHLIGHT:
      return action.chatId;
    case CLEAR_CHAT_HIGHLIGHT:
      return null;
    default:
      return oldState;
  }
};

export default ChatHighlightReducer;