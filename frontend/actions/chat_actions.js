import * as ChatApi from '../util/chat_api_util';

export const RECEIVE_CHATS = "RECEIVE_CHATS";
export const RECEIVE_CHAT = " RECEIVE_CHAT";
export const RECEIVE_CHAT_ERRORS = "RECEIVE_CHAT_ERRORS"; // might not use, change chat error render to {}

export const receiveChats = (chats) => ({
  action: RECEIVE_CHATS,
  chats
});

export const receiveChat = (chat) => ({
  action: RECEIVE_CHAT,
  chat
});

export const receiveChatErrors = (errors) => ({
  action: RECEIVE_CHAT_ERRORS,
  errors
});

export const fetchChats = () => dispatch => (
  ChatApi.fetchChats()
    .then(
      (chats) => dispatch(receiveChats(chats)),
      (errors) => dispatch(receiveChatErrors(errors))
    )
);

export const fetchChat = ({ chatId, limit = 1 }) => dispatch => (
  ChatApi.fetchChat({ chatId, limit })
    .then(
      (chat) => dispatch(receiveChats(chat)),
      (errors) => dispatch(receiveChatErrors(errors))
    )
);

// then change the url to the url of this new chat (id)
export const createChat = ({ chat, members }) => dispatch => (
  ChatApi.createChat({ chat, members })
    .then(
      (newChat) => dispatch(receiveChat(newChat)),
      (errors) => dispatch(receiveChatErrors(errors))
    )
);

export const updateChat = ({ chat, members }) => dispatch => (
  ChatApi.updateChat({ chat, members })
    .then(
      (updatedChat) => dispatch(receiveChat(updatedChat)),
      (errors) => dispatch(receiveChatErrors(errors))
    )
);

export const createMessage = ({ message, limit = 1 }) => dispatch => (
  ChatApi.createMessage({ message, limit })
    .then(
      (updatedChat) => dispatch(receiveChat(updatedChat)),
      (errors) => dispatch(receiveChatErrors(errors))
    )
);
