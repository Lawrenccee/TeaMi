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
    if(newProps.match.params.chatId !== this.props.match.params.chatId) {      
      // this.props.fetchChat(newProps.match.params.chatId);
    }
  }

  render() {
    const { chat, messages } = this.props;

    if (chat) {
      return (
        <div>
          {/* <ChatHeaderContainer /> */}
          <MessageContainer messages={messages} />
          {/* <ChatInfoContainer /> */}
        </div>
      );
    }
    return null;
  }
}

export default Chat;