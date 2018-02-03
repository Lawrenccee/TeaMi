export const RECEIVE_CHAT_HIGHLIGHT = "RECEIVE_CHAT_HIGHLIGHT";
export const CLEAR_CHAT_HIGHLIGHT = "CLEAR_CHAT_HIGHLIGHT";

export const receiveChatHighlight = (chatId) => ({
  type: RECEIVE_CHAT_HIGHLIGHT,
  chatId
});

export const clearChatHighlight = () => ({
  type: CLEAR_CHAT_HIGHLIGHT
});