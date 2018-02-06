import React from 'react';

const MessageListItem = ({ message, currentUser }) => {
  let messageClass = "message their-message";

  if (message.author_id === currentUser.id) {
    messageClass = "message my-message";
  }

  if (message.giphy_url !== "") {
    messageClass += " giphy-message";

    return (
      <li className={messageClass}> 
        <div>
          <img src={`${message.giphy_url}`} />
        </div>
      </li>
    );
  }

  return (
    <li className={messageClass}> 
      <div>
        {message.body}
      </div>
    </li>
  );
};

export default MessageListItem;