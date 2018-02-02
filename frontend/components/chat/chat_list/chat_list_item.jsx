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
          <li>
            <img 
              onError={(e) => { e.target.src = window.staticImages.profile_pic_url;} } 
              src={`${profilePicUrl}`} 
              alt="profile_pic" 
            />
          </li>
        </div>
        <div>
          <li>        
            {chat.name}
          </li>
          <li>
            {chat.preview.timestamp}
          </li>
          <li>
            {chat.preview.body}
          </li>
        </div>
      </ul>
    </li>
  );
};

export default ChatListItem;