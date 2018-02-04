import React from 'react';
import MessageListContainer from './message_list_container';
import values from 'lodash/values';
import MessageFormContainer from './message_form_container';

class MessageContainer extends React.Component {
  render() {
    const {messages} = this.props;
    
    return (
      <div>
        <MessageListContainer messages={messages}/>
        <MessageFormContainer />
      </div>
    );
  }
}

export default MessageContainer;