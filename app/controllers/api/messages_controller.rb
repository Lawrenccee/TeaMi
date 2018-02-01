class Api::MessagesController < ApplicationController
  def create
    @message = new Message.new(message_params)

    @message.chat_id = params[:chat_id]
    @message.author_id = current_user.id

    @chat = Chat.find_by(id: params[:chat_id])

    if @message.save
      # render how to do with render?
      # redirect_to api_chat(params[:chat_id])
      render 'api/chats/show'
    else
      render json: {}
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :giphy_url)
  end
end
