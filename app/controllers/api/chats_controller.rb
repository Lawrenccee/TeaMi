class Api::ChatsController < ApplicationController
  def index
    @chats = Chat.all
  end

  def create
    # TODO: How to prevent chat with same memberships?
    # Do I have to do a database search???

    @chat = Chat.new(chat_params)
    # pass param called members with all the people
    # name will be created on frontend and passed through
    @errors = []

    if @chat.save
      params[:members].each do |_, member|
        @membership = ChatMembership.new(
          member_id: member[:id], 
          chat_id: @chat[:id]
        )

        unless @membership.save
          @errors = errors.concat(@membership.errors.full_messages)
        end
      end

      if @errors.empty?
        # @chats = Chat.all
        # render :index
        render :show # just merge the new one
      else
        render json: errors, status: 422        
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
    @chat = Chat.find_by(id: params[:id])
    # pass param called members with all the people
    # name will be created on frontend and passed through
    @errors = []

    # Add new members
    unless params[:members].nil?
      params[:members].each do |_, member|
        @membership = ChatMembership.new(
          member_id: member[:id], 
          chat_id: @chat[:id]
        )

        unless @membership.save
          @errors = @errors.concat(@membership.errors.full_messages)
        end
      end

      @names = []

      params[:members].each do |_, member|
        @names.push(member[:username])
      end

      if @errors.empty?
        # @chats = Chat.all
        # render :index
        @message = Message.new(
          body: "added #{@names.join(', ')} to the group",
          author_id: current_user[:id],
          chat_id: @chat[:id]
        )

        if @message.save
          render :show # just merge edited one
        else
          render json: @message.errors.full_messages, status: 422
        end
      else
        render json: @membership.errors.full_messages, status: 422
      end

    # Change name/pic instead

    else 
      if params[:chat][:name] != @chat[:name]
        @body = "#{current_user[:username]} changed the chat name to #{params[:chat][:name]}" 
      else
        @body = "#{current_user[:username]} updated the chat picture"
      end

      if @chat.update(chat_params)

        @message = Message.new(
          body: @body,
          author_id: current_user[:id],
          chat_id: @chat[:id]
        )

        if @message.save
          render :show
        else
          render json: @membership.errors.full_messages, status: 422
        end
      else
        render json: @chat.errors.full_messages, status: 422
      end
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:name, :chat_pic_url)
  end
end

# $.ajax({
  # method: 'GET',
  # url: 'api/chats',
  # dataType: 'json'
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

# $.ajax({
#   method: 'POST',
#   url: 'api/chats',
#   dataType: 'json',
#   data: {
#     members: {
#       5: {
#         id: 5
#       },
#       6: {
#         id: 6
#       }
#     },
#     chat: {
#       name: "Test making new chat"
#     }
#   }
# }).then((chat) => (console.log(chat)));

# $.ajax({
#   method: 'PATCH',
#   url: 'api/chats/14',
#   dataType: 'json',
#   data: {
#     members: {
#       7: {
#         id: 7
#       },
#     },
#     chat: {
#       name: "Name Change shouldn't happen yet",
#       chat_pic_url: "fake pic url",
#       id: 14
#     }
#   }
# }).then((chat) => (console.log(chat)));