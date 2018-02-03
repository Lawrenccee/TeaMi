import React from 'react';
// import ChatsSearch from './chats_search';
import ChatListItem from './chat_list_item';

class ChatList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChats()
      .then(() => {
        if (this.props.chats.length > 0) {
          if (this.props.history.location.pathname === `/chats/` || 
            this.props.history.location.pathname === `/chats`) {
            this.props.receiveChatHighlight(this.props.chats[0].id);  
          }        
        } else {
          this.props.history.push(`/chats/new`);
        }
      });

  }

  componentWillReceiveProps(newProps) {
    if (newProps.chatHighlight !== this.props.chatHighlight) {
      this.props.history.push(`/chats/${newProps.chatHighlight}`);
    }
  }

  render() {
    const { chats, chatHighlight, receiveChatHighlight } = this.props;
    const ChatListItems = this.props.chats.map(chat => {     
      return (
        <ChatListItem 
          key={chat.id} 
          chat={chat} 
          chatHighlight={chatHighlight}
          receiveChatHighlight={receiveChatHighlight}
        />
        );
    });

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