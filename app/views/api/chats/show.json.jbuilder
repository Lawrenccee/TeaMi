json.partial! 'api/chats/chat', chat: @chat

json.set! :member_ids, @chat.members.pluck(:id)

json.set! :messages do
  @chat.messages.order("created_at DESC").limit(@limit).each do |message|
    json.partial! 'api/messages/message', message: message
  end
end