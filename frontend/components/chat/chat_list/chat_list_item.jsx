import React from 'react';

class ChatListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.receiveChatHighlight(this.props.chat.id);
  }

  render() {
    const { chat, chatHighlight, receiveChatHighlight } = this.props;
    let profilePicUrl = window.staticImages.profile_pic_url;
    let highlight = "";

    if (chat.id === chatHighlight ) {
      highlight = "highlight";
    }
    
    if (chat.chat_pic_url) {
      profilePicUrl = chat.chat_pic_url;
    }

    return (
      <li 
        className={`chat-list-item ${highlight}`} 
        onClick={this.handleClick}
      >
        <ul>
          <div>
            <li className='chat-list-item-img'>
              <img 
                onError={(e) => { e.target.src = window.staticImages.profile_pic_url;} } 
                src={`${profilePicUrl}`} 
                alt="profile_pic" 
              />
            </li>
          </div>
          <div className='chat-list-text-container'>
            <div className='chat-list-item-description'>
              <li className='chat-list-item-name'>        
                <p>{chat.name}</p>
              </li>
              <li className='chat-list-item-timestamp'>
                <p>{chat.preview.timestamp}</p>
              </li>
            </div>
            <li className='chat-list-item-body'>
              <p>{chat.preview.body}</p>
            </li>
          </div>
        </ul>
      </li>
    );
  }

}

export default ChatListItem;