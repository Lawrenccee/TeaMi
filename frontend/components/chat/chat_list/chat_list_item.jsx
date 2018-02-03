import React from 'react';

const ChatListItem = ({ chat }) => {
  let profilePicUrl = window.staticImages.profile_pic_url;
  
  if (chat.chat_pic_url) {
    profilePicUrl = chat.chat_pic_url;
  }

  return (
    <li className="chat-list-item">
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
};

export default ChatListItem;