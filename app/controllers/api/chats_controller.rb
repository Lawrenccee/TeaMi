class Api::ChatsController < ApplicationController
  def index
    @chats = Chat.all
  end

  def create
    @chat = Chat.new(chat_params)
    # pass param called members with all the people
    # name will be created on frontend and passed through
    @errors = []

    if @chat.save
      params[:members].each do |member|
        @membership = ChatMembership.new(
          member_id: member.id, 
          chat_id: @chat.id
        )

        unless @membership.save
          errors = errors.concat(@membership.errors.full_messages)
        end
      end

      unless errors.empty?
        render json: errors, status: 422
      else
        @chats = Chat.all
        render :index
      end
    else
      render json: @chat.errors.full_messages, status: 422
    end
  end

  def show
    @chat = Chat.find_by(id: params[:id])
    @limit = params[:limit]
    # ^ will be local state in react to pass thru, 
    # we can set to 10 for now
  end

  def update
  end

  private

  def chat_params
    params.require(:chat).permit(:name, :chat_pic_url)
  end
end

# $.ajax({
#   method: 'GET',
#   url: 'api/chats',
#   dataType: 'json'
# }).then((chats) => (console.log(chats)));

# $.ajax({
#   method: 'GET',
#   url: 'api/chats/6',
#   dataType: 'json',
#   data: {
#     limit: 1
#   }
# }).then((chat) => (console.log(chat)));

# $.ajax({
#   method: 'POST',
#   url: 'api/chats/6/messages',
#   dataType: 'json',
#   data: {
#     message: {
#       body: "Testing console return",
#       author_id: 6,
#       chat_id: 6
#     },
#     limit: 2
#   }
# }).then((chat) => (console.log(chat)));