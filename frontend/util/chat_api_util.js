export const fetchChats = () => (
  $.ajax({
    method: 'GET',
    url: 'api/chats',
    dataType: 'json'
  })
);

export const fetchChat = ({ chatId, limit = 1 }) => (
  $.ajax({
    method: 'GET',
    url: `api/chats/${chatId}`,
    dataType: 'json',
    data: {
      limit: limit
    }
  })
);

export const createChat = ({ chat, members }) => (
  $.ajax({
    method: 'POST',
    url: 'api/chats',
    dataType: 'json',
    data: {
      members,
      chat
    }
  })
);

export const updateChat = ({ chat, members }) => (
  $.ajax({
    method: 'POST',
    url: `api/chats/${chat.id}`,
    dataType: 'json',
    data: {
      members,
      chat
    }
  })
);

export const createMessage = ({ message, limit = 1 }) => (
  $.ajax({
    method: 'POST',
    url: `api/chats/${message.chat_id}/messages`,
    dataType: 'json',
    data: {
      message,
      limit,
    }
  })
);