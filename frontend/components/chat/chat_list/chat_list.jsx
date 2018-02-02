import React from 'react';
// import ChatsSearch from './chats_search';
import ChatListItem from './chat_list_item';

class ChatList extends React.Component {
  componentDidMount() {
    this.props.fetchChats();
  }

  render() {
    const { chats } = this.props;
    const ChatListItems = this.props.chats.map(chat => (
      <ChatListItem key={chat.id} chat={chat} />
    ));

    return (
      <div>
        {/* <ChatsSearch/> */}
        <ul className="chat-list">
          {ChatListItems}
        </ul>
      </div>
    );
  }
}

export default ChatList;