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

    if params[:user_image] != "" && params[:user_image] != nil
      file = params[:user_image]
      if @user.update(user_image: file)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    elsif params[:username] != "" && params[:username] != nil
      if @user.update(username: params[:user_image])
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render :show
    end
  end

  def demo
    randomString = SecureRandom.urlsafe_base64(5)

    @user = User.create(
      username: "Guest#{randomString}",
      email: "Guest#{randomString}",
      password: "password",
      demo: true
    )

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
      },
      {
        username: "Spammer",
        email: "Spammer#{randomString}",
        password: "password",
        demo: true
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
      },
      {
        name: "Change this chat picture!"
      },
      {
        name: "SpamChat"
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
      },
      {
        chat_id: @chats[3].id,
        member_id: @user.id
      },
      {
        chat_id: @chats[3].id,
        member_id: @users[4].id,
      },
      {
        chat_id: @chats[4].id,
        member_id: @user.id
      },
      {
        chat_id: @chats[4].id,
        member_id: @users[5].id,
      }
    ])

    @messages = Message.create([
      {
        body: "Hey! >:]",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "This is an example of a larger chat with multiple messages",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Why don't I just spam a bunch of cool gifs to you?",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Spammer sent you a GIF",
        giphy_url: "https://media.giphy.com/media/Gue1HInww5M6Q/giphy.gif",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Spammer sent you a GIF",
        giphy_url: "https://media.giphy.com/media/jnEbIEVqWxY1W/giphy.gif",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Spammer sent you a GIF",
        giphy_url: "https://media.giphy.com/media/ym6PmLonLGfv2/giphy.gif",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Spammer sent you a GIF",
        giphy_url: "https://media.giphy.com/media/3oKIPv4pMwu3NQtKhO/giphy.gif",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "I hope that was enough GIFs for you!",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "They're all related to stuff I like :)",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Why don't you try sending some GIFs as well?",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Okay, okay, I'll stop spamming you now...",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: ":b",
        giphy_url: "",
        author_id: @users[5].id,
        chat_id: @chats[4].id
      },
      {
        body: "Me again~",
        giphy_url: "",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
      {
        body: "For the demo accounts with static pictures the chat images can't be changed",
        giphy_url: "",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
      {
        body: "But you can try changing the chat picture of this chat as well as your profile picture!",
        giphy_url: "",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
      {
        body: "Currently, only jpeg type files and pngs can be uploaded",
        giphy_url: "",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
      {
        body: "Have fun!",
        giphy_url: "",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
      {
        body: "Lawrence sent you a GIF",
        giphy_url: "https://media.giphy.com/media/10LKovKon8DENq/giphy.gif",
        author_id: @users[4].id,
        chat_id: @chats[3].id
      },
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
        body: "I hope you enjoy what you see here, and have fun playing around with my application!",
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
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_pic_url, :email)
  end
end
