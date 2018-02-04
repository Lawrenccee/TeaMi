import React from 'react';

const MessageListItem = ({ message, currentUser }) => {
  if (message.author_id === currentUser.id) {
    return (
      <li className='message my-message'> 
        <div>
          {message.body} 
        </div>
      </li>
    );
  }
  else {
    return (
      <li className='message their-message'> 
        <div>
          {message.body}
        </div>
      </li>
    );
  }  
};

export default MessageListItem;