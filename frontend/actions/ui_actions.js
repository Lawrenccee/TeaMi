export const RECEIVE_CHAT_HIGHLIGHT = "RECEIVE_CHAT_HIGHLIGHT";
export const CLEAR_CHAT_HIGHLIGHT = "CLEAR_CHAT_HIGHLIGHT";
export const RECEIVE_LISTEN_FUNCTION_ID = "RECEIVE_LISTEN_FUNCTION_ID";

export const receiveChatHighlight = (chatId) => ({
  type: RECEIVE_CHAT_HIGHLIGHT,
  chatId
});

export const clearChatHighlight = () => ({
  type: CLEAR_CHAT_HIGHLIGHT
});

export const receiveListenFunctionId = (id) => ({
  type: RECEIVE_LISTEN_FUNCTION_ID,
  id
});