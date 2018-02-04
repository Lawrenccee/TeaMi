import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      giphy_url: "",
      author_id: this.props.currentUser.id,
      chat_id: this.props.match.params.chatId,
      limit: 10,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.setUpChat(
      this.props.match.params.chatId, 
      () => this.props.fetchChat({
        chatId: this.props.match.params.chatId,
        limit: this.state.limit
      })
    );
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.chatId !== this.props.match.params.chatId) {
      this.setState({
        chat_id: newProps.match.params.chatId,
      });
      App.chat.unsubscribe();
      this.setUpChat(
        newProps.match.params.chatId,
        () => this.props.fetchChat({
          chatId: newProps.match.params.chatId,
          limit: this.state.limit
        })
      );
    }
  }

  setUpChat(chatId, receiveData) {
    App.chat = App.cable.subscriptions.create({ channel: "ChatChannel", chat_id: chatId }, {
      connected: function () {
        // Called when the subscription is ready for use on the server
        setTimeout(this.perform('subscribed'), 1000);
      },

      disconnected: function () {
        // Called when the subscription has been terminated by the server
      },

      received: function (data) {
        // Called when there's incoming data on the websocket for this channel
        // reactReceive is a function set in the react component to handle the data received
        // when the stuff is done.
        receiveData();
      },

      speak: function (message) {
        return this.perform('speak', message);
      }
    });
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13: // ENTER
        App.chat.speak(this.state);
        e.currentTarget.reset();
        break;
      default:
        break;
    }
  }

  update(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  render() {
    return (
      <div>
        <form onKeyDown={this.handleKeyDown}>
          <textarea 
            name="body" 
            cols="30" 
            rows="10" 
            onChange={this.update("body")}
          >
            {this.body}
          </textarea>
        </form>
      </div>
    );
  }
}

export default MessageForm;