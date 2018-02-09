# TeaMí

[Live Demo](https://tea-mi.herokuapp.com)

TeaMí was inspired by Facebook Messenger, which is a real-time messenger. TeaMí is able to deliver instant messaging through technologies like Rails and ActionCable, PostgreSQL, React.js, Redux, and AWS S3 storage along with paperclip. This project was given a timeframe of 10 days. Knowing this, features are limited, but I plan on expanding and making the application better overall.


## Features
  * User Authentication, backend and frontend, utilizaing BCrypt
  * Creating Chats with any other user that has an account
  * Messages or sent in real-time, thanks to Rails' ActionCable, a helper for websockets
  * Sending Gifs thanks to the Giphy API
  * Adding more members to a chat
  * Changing your profile picture, chat picture, or chat name


### Messages and Chat

When creating a new user account, the default new chat page is shown. Users can be searched through the search bar of the chat.
<img src="https://raw.githubusercontent.com/Lawrenccee/TeaMi/master/readme/new_chat.gif">

If there already exists a chat with that user or group then that specific chat will be opened instead.
<img src="https://raw.githubusercontent.com/Lawrenccee/TeaMi/master/readme/existing_chat.gif">

This is done with a query of the chats that the current user belongs to. Then by going through each chats members to see if this specific group of users already exists. If they do then the existing chat is sent back and opened. It is done like so:

```ruby
...
@ids = []

@user_chats = current_user.chats.includes(:members)
    @user_chats.find_each do |chat|
      @member_ids = chat.members.pluck(:id)

      if (@member_ids.size == @ids.size) && ((@member_ids & @ids) == @member_ids)
        @exists = true
        @chat = chat
        break
      end
    end

    if @exists 
      render :show
...
```

An includes is used to fetch the data for all the members of the chats when the first query to sets @user_chats is done. So when it loops through all of the chats their members already exist, preventing another query, and overall an N+1 query.

## Design

TeaMí was designed with trying to make a close, but different, clone of Messenger. I mostly tried to copy the main features of Messenger within the 10 day timeframe we had. Sometimes, features were a main priority over clean code. Now that the application works with basic functionalities, I plan on refactoring my code before moving on to make everything more clean and crisp. I hope that this will serve as a good reference to myself in the future.

## Technologies

Rails was used because it's convention over configuration, so you can get a basic site up and running in a short amount of time. ActiveRecord and ActionCable served as great tools for my app to work.

Redux was used with React in order to have easier state management. It's much easier to have a global state object, so you can keep track of what slice of state is being passed around where.

AWS was used for image storage along with the paperclip gem to help with uploading and image validations.

## Future Improvements

More things on my list to add to the application include:
  * Being able to edit the user's username
  * A chatbot
  * Notifications
  * Milk Tea styling
  * Making it mobile friendly