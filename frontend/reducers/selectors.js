import values from 'lodash/values';

export const selectAllChats = (state) => {

  let sorted = values(state.entities.chats);

  sorted = sorted.sort(function (a, b) {
    return new Date(b.date_compare) - new Date(a.date_compare);
  });

  return sorted;
};