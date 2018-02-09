import React from 'react';
import ChatListItem from './chat_list_item';
import ReactSearch from 'react-icons/lib/fa/search';
import values from 'lodash/values';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      queryChats: this.props.chats,
    };
  }

  componentWillMount() {
    this.listen = true;

    const listenChats = () => {
      if (this.listen) {
        this.props.fetchChats().then(() => (
          setTimeout(listenChats, 1000)
        ));
      }
    };

    const listenUsers = () => {
      if (this.listen) {
        this.props.fetchUsers().then(() => (
          setTimeout(listenUsers, 10000)
        ));
      }
    };

    listenChats();
    listenUsers();
  }

  componentDidMount() {
    this.props.fetchChats()
      .then(() => {
        this.setState({ queryChats: this.props.chats });
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

  componentWillUnmount() {
    this.listen = false; // stop requesting chat info
    this.props.resetState();
  }

  componentWillReceiveProps(newProps) {
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
            this.setState({ queryChats: values(payload.chats) });
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