import React from 'react';

const MessageListItem = ({ message, currentUser }) => {
  if (message.id === currentUser.id) {
    return (
      <li className='my-message'> {message.body} </li>
    );
  }
  else {
    return (
      <li className='their-message'> {message.body} </li>
    );
  }  
};

export default MessageListItem;