import React from 'react';
import ChatListItem from './chat_list_item';
import ReactSearch from 'react-icons/lib/fa/search';
import { selectAllChats } from '../../../reducers/selectors';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      queryChats: this.props.chats,
    };
  }

  componentDidMount() {
    this.setUpChat(
      null,
      () => {
        this.props.fetchChats();
        this.props.fetchUsers();
      },
      this.props.currentUser.id
    );

    this.props.fetchChats()
      .then(() => {
        this.setState({ queryChats: this.props.chats }, () => {
          this.props.chats.forEach((chat) => {
            this.setUpChat(
              chat.id,
              () => {
                this.props.fetchChat({
                  chatId: chat.id,
                  limit: 100,
                });
                this.props.fetchChats();
                this.props.fetchUsers();
              }
            );
          });
        });

        if (this.props.chats.length > 0) {
          if (this.props.match.params.chatId !== undefined) {
            this.props.receiveChatHighlight(this.props.match.params.chatId);  
          } else {
            this.props.receiveChatHighlight(this.props.chats[0].id);
          }
        } else {
          this.props.history.push(`/chats/new`);
        }
      });
  }

  setUpChat(chatId, receiveData, userId) {
    App.chat = App.cable.subscriptions.create({ channel: "ChatChannel", chat_id: chatId, user_id: userId }, {
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

      logout: function () {
        // this.perform('unsubscribed');
      },

      speak: function (message) {
        return this.perform('speak', message);
      }
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.chats[0]) { 
      if (this.props.chats[0] && this.props.chats[0].preview.id 
        !== newProps.chats[0].preview.id) {
        this.props.fetchChats(this.state.query)
          .then((payload) => {
            this.setState({ queryChats: selectAllChats({ entities: { chats: payload.chats } }) });
          });
      }
    }
    if (newProps.chatHighlight !== this.props.chatHighlight) {
      this.props.history.push(`/chats/${newProps.chatHighlight}`);
      this.props.receiveChatHighlight(newProps.chatHighlight);            
    }
  }

  update(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      }, () => {
        this.props.fetchChats(this.state.query)
          .then((payload) => {
            this.setState({ queryChats: selectAllChats({ entities: { chats: payload.chats}}) });
          });
      });
    };
  }

  render() {
    const { chats, chatHighlight, receiveChatHighlight, currentUser } = this.props;    
    if (chats.length === 0) {
      return null;
    }

    const ChatListItems = [];
    
    this.state.queryChats.forEach(chat => {       
      ChatListItems.push(
        <ChatListItem 
          key={`chat-${chat.id}`} 
          currentUser={currentUser}
          chat={chat} 
          chatHighlight={chatHighlight}
          receiveChatHighlight={receiveChatHighlight}
        />
      );
    });

    return (
      <div className='chat-sidebar'>
        <form className='chats-search'>
          <div>
            <ReactSearch size={15} color={`#a3a3a3`} />
            <input
              type="text"
              value={this.state.query}
              onChange={this.update("query")}
              placeholder={"Search for a TeaMí..."}
            />
          </div>
        </form>
        <ul className="chat-list">
          {ChatListItems}
        </ul>
      </div>
    );
  }
}

export default ChatList;