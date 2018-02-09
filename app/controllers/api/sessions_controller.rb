class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render :show
    else
      render json: ["Invalid Credentials"], status: 422
    end
  end

  def destroy
    unless current_user
      render json: ["No user is logged in!"], status: 422
    else
      if current_user.demo
        randomString = current_user.username[5..-1]
        
        members = User.where("email LIKE ? AND demo = ?", "%#{randomString}", true)
        members.destroy_all

        Chat.find_each do |chat|
          if chat.member_ids.length < 2
            chat.destroy
          end
        end

        logout
        render json: {}
      else 
        logout
        render json: {}
      end 
    end
  end
end
