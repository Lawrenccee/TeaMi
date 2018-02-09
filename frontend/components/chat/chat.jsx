import React from 'react';
import ChatHeaderContainer from './chat_header/chat_header_container';
import MessageContainer from './message/message_container';
import ChatInfoContainer from './chat_info/chat_info_container';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChat({
      chatId: this.props.match.params.chatId,
      limit: 100,
    }).then(
      () => {}, 
      () => {
        if (this.props.location.pathname !== `/chats/new`) {
          this.props.history.push(`/chats/new`);
        }
      }
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.chatId &&
      newProps.match.params.chatId !== this.props.match.params.chatId) {      
      this.props.fetchChat({
        chatId: newProps.match.params.chatId,
        limit: 100,
      }).then(
        () => {}, 
        () => {
          if (this.props.location.pathname !== `/chats/new`) {
            this.props.history.push(`/chats/new`);
          }
        }
      );
    }
  }

  render() {
    const { chat, messages, toggleChatInfo } = this.props;

    if (chat) {
      return (
        <div className="chat-container">
          <ChatHeaderContainer chat={chat} toggleChatInfo={toggleChatInfo}/>
          <div className='chat-bottom-container'>
            <MessageContainer/>
            { this.props.chatInfo &&
              <ChatInfoContainer chat={chat} />
            }   
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Chat;