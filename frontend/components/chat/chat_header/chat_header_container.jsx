import React from 'react';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';

const ChatHeaderContainer = ({ chat, toggleChatInfo }) => (
  <div className="chat-header">
    <p>{chat.name}</p>
    <button onClick={() => toggleChatInfo()}><FaInfoCircle size={30} color={`#7DCC4D`} /></button>
  </div>
);

export default ChatHeaderContainer;