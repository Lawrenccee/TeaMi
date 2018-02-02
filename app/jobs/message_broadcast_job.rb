class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    broadcast_to_chat(message)
  end

  def broadcast_to_chat(message)
    ActionCable.server.broadcast(
      "chats-#{message[:chat_id]}",
      message: render_message
    )
  end

  def render_message(message)
    ApplicationController.render(
      partial: 'api/messages/message',
      locals: { message: message}
    )
  end
end
