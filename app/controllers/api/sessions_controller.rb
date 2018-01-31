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
      logout
      render json: {}
    end
  end
end
