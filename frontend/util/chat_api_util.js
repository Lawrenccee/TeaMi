export const fetchChats = (query = "") => (
  $.ajax({
    method: 'GET',
    url: 'api/chats',
    dataType: 'json',
    data: {
      query: query
    }
  })
);

export const fetchChat = ({ chatId, limit = 1 }) => (
  $.ajax({
    method: 'GET',
    url: `api/chats/${chatId}`,
    dataType: 'json',
    data: {
      limit: limit // how many messages to fetch
    }
  })
);

export const createChat = ({ members }) => (
  $.ajax({
    method: 'POST',
    url: 'api/chats',
    dataType: 'json',
    data: {
      members
    }
  })
);

export const updateChat = ({ chat, members }) => (
  $.ajax({
    method: 'PATCH',
    url: `api/chats/${chat.id}`,
    dataType: 'json',
    data: {
      members,
      chat,
      limit: 1 // to merge update message to current ones
    },
  })
);

export const createMessage = ({ message }) => (
  $.ajax({
    method: 'POST',
    url: `api/chats/${message.chat_id}/messages`,
    dataType: 'json',
    data: {
      message,
      limit: 1, // to merge this message to current ones
    }
  })
);

export const updateChatImage = ({ formData, chat }) => {
  return $.ajax({
    type: 'PATCH',
    url: `api/chats/${chat}`,
    processData: false,
    contentType: false,
    dataType: 'json',
    data: formData
  });
};