import React from 'react';

const MessageList = ({ messages, currentUser }) => {
  const MessageListItems = messages.map((message) => (
    <li key={`message-${message.id}`}> {message.body} </li>
  ));

  return (
    <div>
      <ul>
        {MessageListItems}
      </ul>
    </div>
  );
};

export default MessageList;