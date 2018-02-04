import { RECEIVE_CHATS, RECEIVE_CHAT } from "../actions/chat_actions";
import merge from 'lodash/merge';

const ChatsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CHATS:
      return merge({}, oldState, action.chats);
    case RECEIVE_CHAT:
      return merge({}, oldState, action.chat);
    default: 
      return oldState;
  }
};

export default ChatsReducer;