import React from 'react';
import MessageListItem from './message_list_item';
import { ClipLoader } from 'react-spinners';

class MessageList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollBottom = this.scrollBottom.bind(this);
  }

  scrollBottom() {
    const messageListContainer =
    document.getElementsByClassName('message-list-container')[0];

    if (messageListContainer) {
      messageListContainer.scrollTop = messageListContainer.scrollHeight;
    }
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages[0] && this.props.messages[0] && 
      this.props.messages[this.props.messages.length-1].id !== 
      prevProps.messages[prevProps.messages.length-1].id) {
      this.scrollBottom();
    } 
  }

  render() {
    const { messages, currentUser, users } = this.props;

    if (messages[0] === "loading") {
      return (
        <div className="message-loader">
          <ClipLoader
            color={'#7DCC4D'}
          />
        </div>
      );
    }

    const MessageListItems = messages.map((message) => (
      <MessageListItem
        message={message}
        currentUser={currentUser}
        users={users}
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