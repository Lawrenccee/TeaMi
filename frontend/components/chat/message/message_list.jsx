import React from 'react';
import MessageListItem from './message_list_item';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollBottom = this.scrollBottom.bind(this);
  }

  scrollBottom() {
    const messageListContainer =
      document.getElementsByClassName('message-list-container')[0];
    messageListContainer.scrollTop = messageListContainer.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.scrollBottom();
    } 
  }

  render() {
    const { messages, currentUser } = this.props;
    const MessageListItems = messages.map((message) => (
      <MessageListItem 
        message={message}
        currentUser={currentUser}
        key={`message-${message.id}`}
      />
    ));

    return (
      <div className="message-list-container">
        <ul className="message-list">
          {MessageListItems}
        </ul>
      </div>
    );
  }
}




export default MessageList;