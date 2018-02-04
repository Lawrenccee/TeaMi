import React from 'react';
// import ChatHeaderContainer from './chat_header/chat_header_container';
import MessageContainer from './message/message_container';
// import ChatInfoContainer from './chat_info/chat_info_container;

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChat({
      chatId: this.props.match.params.chatId,
      limit: 100,
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.chatId &&
      newProps.match.params.chatId !== this.props.match.params.chatId) {      
      this.props.fetchChat({
        chatId: newProps.match.params.chatId,
        limit: 100,
      });
    }
  }

  render() {
    const { chat, messages } = this.props;

    if (chat) {
      return (
        <div>
          {/* <ChatHeaderContainer /> */}
          <MessageContainer/>
          {/* <ChatInfoContainer /> */}
        </div>
      );
    }
    return null;
  }
}

export default Chat;