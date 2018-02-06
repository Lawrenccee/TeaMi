import React from 'react';

class ChatListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.receiveChatHighlight(this.props.chat.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.chatHighlight !== newProps.chatHighlight) {
      this.props.receiveChatHighlight(newProps.chatHighlight);
    }
  }

  render() {
    const { chat, chatHighlight, receiveChatHighlight } = this.props;
    let profilePicUrl = window.staticImages.profile_pic_url;
    let highlight = "";

    if (chat.id === parseInt(chatHighlight)) {
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
        <div className='chat-list-item-img-container'>
          <div className='chat-list-item-img'>
            <img 
              onError={(e) => { e.target.src = window.staticImages.profile_pic_url;} } 
              src={`${profilePicUrl}`} 
              alt="profile_pic" 
            />
          </div>
        </div> 
        <div className='chat-list-text-container'>
          <div className='chat-list-item-description'>
            <div className='chat-list-item-name'>        
              <div>{chat.name}</div>
            </div>
            <div className='chat-list-item-timestamp'>
              <div>{chat.preview.timestamp}</div>
            </div>
          </div>
          <div className='chat-list-item-body'>
            <div>{chat.preview.body}</div>
          </div>
        </div>
      </li>
    );
  }

}

export default ChatListItem;