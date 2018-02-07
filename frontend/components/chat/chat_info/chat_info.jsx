import React from 'react';
// import UsersSearch from '../../users_search/users_search';

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chat } = this.props;

    return (
      <div className='chat-info-container'>
        <div className='chat-info'>
          {chat.chat_pic_url &&
            <img src={`${chat.chat_pic_url}`} height="50" width="50" />
          }
          {chat.chat_pic_url === "" || chat.chat_pic_url === null &&
            <img src={window.staticImages.profile_pic_url} height="50" width="50" />
          }
          {chat.name}
        </div>
        <div className='my-info'>
          <a href='https://github.com/Lawrenccee'>{`TeaMí Profile`}</a>
          <br />
          <a href='https://www.linkedin.com/in/lawrence-guintu-96a81a101/'>{`Favorite Milk Tea`}</a>
        </div>
        {/* <UsersSearch 
        
        /> */}
      </div>
    );
  }
}

export default ChatInfo;