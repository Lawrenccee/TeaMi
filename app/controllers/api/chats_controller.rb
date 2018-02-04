class Api::ChatsController < ApplicationController
  def index
    if current_user
      @chats = current_user.chats
    else
      render json: {}
    end
  end

  def create
    # TODO: How to prevent chat with same memberships?
    # Do I have to do a database search???

    @names = []

    params[:members].each do |_, member|
       @names.push(member[:username])
    end

    @chat = Chat.new(name: @names.join(", "))

    @errors = []
    
    # pass param called members with all the people
    # name will be created on frontend and passed through

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
    p params
    @chat = Chat.find_by(id: params[:id])
    @limit = params[:limit]
    # ^ will be local state in react to pass thru, 
    # we can set to 10 for now
  end

  def update
    @chat = Chat.find_by(id: params[:id])
    @limit = params[:limit]
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