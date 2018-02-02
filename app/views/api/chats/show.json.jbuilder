json.partial! 'api/chats/chat', chat: @chat

json.set! :member_ids, @chat.members.pluck(:id)

json.set! :messages do
  @chat.messages.order("created_at DESC").limit(@limit).each do |message|
    # created_at = message.created_at

    # timestamp = created_at.strftime("%a %b %d %I:%M%P")

    # json.set! message.id do 
    #   json.extract! message, 
    #     :id, :body, :giphy_url, :author_id, :chat_id

    #   json.set! :timestamp, timestamp
    # end
    json.partial! 'api/messages/message', message: message
  end
end