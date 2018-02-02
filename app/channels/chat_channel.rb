class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # passed from App.chat method in chat.js
    stream_from "chats-#{chat_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def speak(data)
    p data[:message]
    message_params = data[:message]

    Message.create(message_params)
    
    # ActionCable.server.broadcast(
    #   "chats-#{data[:message][:chat_id]}",
    #   message: message_params
    # )
  end
end
