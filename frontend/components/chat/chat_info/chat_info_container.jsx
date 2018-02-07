import React from 'react';
// import UsersSearch from '../../users_search/users_search';
import { Link } from 'react-router-dom';

class ChatInfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { chat } = this.props;

    return (
      <div className='chat-info-container'>
        <div className='chat-info'>
          { chat.chat_pic_url  &&
            <img src={`${chat.chat_pic_url}`} height="50" width="50" />            
          }
          { chat.chat_pic_url === "" || chat.chat_pic_url === null &&
            <img src={window.staticImages.profile_pic_url} height="50" width="50" />                        
          }
          {chat.name}
        </div>
        <div className='my-info'>
          <Link to='https://github.com/Lawrenccee'>{`TeaMí Profile`}</Link>
          <Link to='https://www.linkedin.com/in/lawrence-guintu-96a81a101/'>{`Favorite Tea`}</Link>
        </div>
        {/* <UsersSearch 
        
        /> */}
      </div>
    );
  }
}

export default ChatInfoContainer;