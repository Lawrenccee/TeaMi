class Api::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    @user[:demo] = false

    if @user.save
      login(@user)
      render :show   
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
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
    
  end

  def demo
    p "HELLO YOU ARE IN THE CONTROLLER FOR DEMO"
    randomString = SecureRandom.urlsafe_base64(5)

    p "This is my random string"
    p randomString

    @user = User.create(
      username: "Guest#{randomString}",
      email: "Guest#{randomString}",
      password: "password",
      demo: true
    )

    p "This is my demo user"
    p @user

    @users = User.create([
      {
        username: "Welcome!",
        email: "Welcome!#{randomString}",
        password: "password",
        demo: true
      },
      {
        username: "HappyLemon",
        email: "HappyLemon#{randomString}",
        password: "password",
        demo: true,
        profile_pic_url: 'http://www.manillenials.com/wp-content/uploads/2014/07/happy-lemon-logo.png'
      },
      {
        username: "GreenBubble",
        email: "Greenbubble#{randomString}",
        password: "password",
        demo: true,
        profile_pic_url: 'https://cdn.doordash.com/media/restaurant/cover/MrGreenBubble_4299_Oakland_CA.png'
      },
      {
        username: "iTea",
        email: "iTea#{randomString}",
        password: "password",
        demo: true,
        profile_pic_url: 'https://cdn.doordash.com/media/restaurant/cover/iTeaWalnutCreek_1245_Walnut_Creek_CA.png'
      },
      {
        username: "Kung Fu Tea",
        email: "Kung Fu Tea#{randomString}",
        password: "password",
        demo: true,
        profile_pic_url: 'https://lh3.googleusercontent.com/SUl4XjMnZ7AoG394N20DpStiI4e1jynSSVDsh6V6h4PzFBPn8UhZ2Sa9ZybBz5rWwEQ=w300'
      }
    ])

    @chats = Chat.create([
      {
        name: "Guest#{randomString}, Welcome!",
        chat_pic_url: 'https://st2.depositphotos.com/3591429/5245/i/450/depositphotos_52453715-stock-photo-hands-holding-word-welcome.jpg'
      },
      {
        name: "Guest#{randomString}, HappyLemon",
        chat_pic_url: 'https://previews.123rf.com/images/charnsitr/charnsitr1111/charnsitr111100070/11245464-isolated-thai-ice-milk-tea.jpg'
      },
      {
        name: "Milk Tea Group",
        chat_pic_url: 'https://cdn.xl.thumbs.canstockphoto.com/boba-bubble-tea-homemade-various-milk-tea-with-pearls-on-wooden-table-stock-image_csp46514561.jpg'
      }
    ])

    @chat_memberships = ChatMembership.create([
      {
        chat_id: @chats[0].id,
        member_id: @user.id,
      },
      {
        chat_id: @chats[0].id,
        member_id: @users[0].id
      },
      {
        chat_id: @chats[1].id,
        member_id: @user.id,
      },
      {
        chat_id: @chats[1].id,
        member_id: @users[1].id
      },
      {
        chat_id: @chats[2].id,
        member_id: @user.id,
      },
      {
        chat_id: @chats[2].id,
        member_id: @users[2].id
      },
      {
        chat_id: @chats[2].id,
        member_id: @users[3].id,
      }
    ])

    @messages = Message.create([
      {
        body: "Hey there!",
        giphy_url: "",
        author_id: @users[2].id,
        chat_id: @chats[2].id
      },
      {
        body: "Just wanted to let you know you can make group chats too!",
        giphy_url: "",
        author_id: @users[3].id,
        chat_id: @chats[2].id
      },
      {
        body: "Try clicking the top right 'info' button to see some more cool actions!",
        giphy_url: "",
        author_id: @users[2].id,
        chat_id: @chats[2].id
      },
      {
        body: "Try adding the user Kung Fu Tea. They have some pretty good milk tea too",
        giphy_url: "",
        author_id: @users[3].id,
        chat_id: @chats[2].id
      },
      {
        body: "Happy Lemon has delicious salted cheese for your milk tea",
        giphy_url: "",
        author_id: @users[1].id,
        chat_id: @chats[1].id
      },
      {
        body: "By the way, did you know you can make a new chat by clicking on the writing button in the top left navbar?",
        giphy_url: "",
        author_id: @users[1].id,
        chat_id: @chats[1].id
      },
      {
        body: "You can also send GIFs thanks to Giphy!",
        giphy_url: "",
        author_id: @users[1].id,
        chat_id: @chats[1].id
      },
      {
        body: "Happy Lemon sent you a GIF",
        giphy_url: "https://media0.giphy.com/media/2ObMRv4QwO5XO/200.gif?cid=e1bb72ff5a7a559a71374241457a5bcc",
        author_id: @users[1].id,
        chat_id: @chats[1].id
      },
      {
        body: "Welcome to TeaMí!",
        giphy_url: "",
        author_id: @users[0].id,
        chat_id: @chats[0].id
      },
      {
        body: "TeaMí is a real-time messaging app similar to Facebook Messenger",
        giphy_url: "",
        author_id: @users[0].id,
        chat_id: @chats[0].id
      },
      {
        body: "I hope you enjoy what you see here and have fun playing around with my application!",
        giphy_url: "",
        author_id: @users[0].id,
        chat_id: @chats[0].id
      },
      {
        body: "Lawrence sent you a GIF",
        giphy_url: "https://media1.giphy.com/media/Wj7lNjMNDxSmc/200.gif?cid=e1bb72ff5a7b35cb5770457a55db7401",
        author_id: @users[0].id,
        chat_id: @chats[0].id
      }
    ])

    login(@user)
    render :show

    # on logout go through all of the demo users chats, delete the chats and
    # the joins table stuff check users in that chat delete them if theyre demo
    # then delete any joins with that chat id
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_pic_url, :email)
  end
end
