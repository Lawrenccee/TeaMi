class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      redirect_to api_user_url(@user)      
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])

    unless @user.id == current_user.id
      render json: ["You are not permitted to do this"], status: 422
    end

    unless @user.is_password?(params[:user][:old_password])
      render json: ["Incorrect Password"], status: 422
    end

    if @user.update(user_params) && @user.save
      redirect_to api_user_url(@user)
    else
      render json: @user.errors.full_messages, status: 422
    end
    
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_pic_url, :email)
  end
end
