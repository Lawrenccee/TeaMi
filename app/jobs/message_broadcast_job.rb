class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    broadcast_to_chat(message)
  end

  def broadcast_to_chat(message)
    message.chat.member_ids.each do |user_id|
      ActionCable.server.broadcast(
        "users-#{user_id}",
        message: JSON.parse(render_message(message))
      )
    end

    ActionCable.server.broadcast(
      "chats-#{message[:chat_id]}",
      message: JSON.parse(render_message(message))
    )
  end

  def render_message(message)
    ApplicationController.render(
      partial: 'api/messages/message',
      locals: { message: message}
    )
  end
end
