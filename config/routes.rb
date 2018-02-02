Rails.application.routes.draw do
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :update, :show]
    resource :session, only: [:create, :destroy]
    resources :chats, only: [:create, :show, :index, :update] do 
        resources :messages, only: [:create]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
