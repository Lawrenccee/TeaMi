@chats.each do |chat|
  json.set! chat.id do
    json.partial! 'api/chats/chat', chat: chat
  end
end