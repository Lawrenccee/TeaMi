class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chats-#{params[:chat_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end

  def speak(data)
    message_params = {
      body: data["body"],
      giphy_url: data["giphy_url"],
      chat_id: data["chat_id"],
      author_id: data["author_id"]
    }

    message = Message.create(message_params)
  end
end
