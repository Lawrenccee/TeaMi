import React from 'react';
import GiphysSearchContainer from '../message/giphys_search_container';
import FaMagic from 'react-icons/lib/fa/magic';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      giphy_url: "",
      author_id: this.props.currentUser.id,
      chat_id: this.props.match.params.chatId,
      limit: 10,
      searchGiphy: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleGiphy = this.toggleGiphy.bind(this);
  }

  componentDidMount() {
    this.setUpChat(
      this.props.match.params.chatId, 
      () => this.props.fetchChat({
        chatId: this.props.match.params.chatId,
        limit: this.state.limit
      })
    );

    const messageForm = document.getElementById("message-form");
    messageForm.focus();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.match.params.chatId !== this.props.match.params.chatId) {
      this.setState({
        chat_id: newProps.match.params.chatId,
      }, () => {
        const messageForm = document.getElementById("message-form");
        messageForm.focus();
      });
      this.setUpChat(
        newProps.match.params.chatId,
        () => this.props.fetchChat({
          chatId: newProps.match.params.chatId,
          limit: this.state.limit
        })
      );
    }
  }

  componentWillUnmount() {
    if (App.chat) {
      App.chat.logout();
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

      logout: function() {
        // this.perform('unsubscribed');
      },

      speak: function (message) {
        return this.perform('speak', message);
      }
    });
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13: // ENTER
        e.preventDefault();
        App.chat.speak(this.state);
        e.currentTarget.reset();
        this.setState({
          body: "",
        });
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

  toggleGiphy(e) {
    if(e) {
      e.preventDefault();
    }

    this.setState({
      searchGiphy: !this.state.searchGiphy
    });
  }

  render() {
    return (
      <div className='message-form-container'>
        { this.state.searchGiphy &&
          <div className='giphy-search-container'>
            <GiphysSearchContainer App={App} close={this.toggleGiphy}/>
          </div>
        }
        <form className='message-form' onKeyDown={this.handleKeyDown}>
          <textarea 
            id="message-form"
            name="body" 
            rows="1" 
            onChange={this.update("body")}
            placeholder={"Type a message..."}
          >
            {this.body}
          </textarea>
          <button 
            className="giphy-button" 
            onClick={this.toggleGiphy}
          >
            <FaMagic size={30} color={`#7DCC4D`}/>
          </button>          
        </form>
      </div>
    );
  }
}

export default MessageForm;