class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    if params[:chat_id]
      stream_from "chats-#{params[:chat_id]}"
    end

    if params[:user_id]
      stream_from "users-#{params[:user_id]}"
    end      
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
