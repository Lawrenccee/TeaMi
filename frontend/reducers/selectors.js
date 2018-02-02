import values from 'lodash/values';

export const selectAllChats = (state) => (
  values(state.entities.chats)
);