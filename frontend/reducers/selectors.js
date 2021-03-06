import values from 'lodash/values';

export const selectAllChats = (state) => {

  let sorted = values(state.entities.chats);

  sorted = sorted.sort(function (a, b) {
    return new Date(b.date_compare) - new Date(a.date_compare);
  });

  return sorted;
};

export const selectMessagesOfChat = (state, chatId) => {
  if (state.entities.chats[chatId]) {
    if (state.entities.chats[chatId].messages || 
      state.entities.chats[chatId].preview.body === "") {
      return values(state.entities.chats[chatId].messages);
    } else {
      return ["loading"];
    }
  }
};

export const selectAllUsers = (state) => {
  return values(state.entities.users);
};