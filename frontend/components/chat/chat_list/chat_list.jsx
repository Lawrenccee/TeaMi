import React from 'react';
import ChatListItem from './chat_list_item';
import ReactSearch from 'react-icons/lib/fa/search';

class ChatList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
  }

  componentWillMount() {
    this.listen = true;

    const listen = () => {
      if (this.listen) {
        this.props.fetchChats().then(() => (
          setTimeout(listen, 1000)
        ));
        this.props.fetchUsers().then(() => (
          setTimeout(listen, 1000)
        ));
      }
    };

    listen();
  }

  componentDidMount() {
    this.props.fetchChats()
      .then(() => {
        if (this.props.chats.length > 0) {
          if (this.props.match.params.chatId) {
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
    if (newProps.chatHighlight &&
      this.props.history.location.pathname !== 
      `/chats/${newProps.chatHighlight}`) {
      this.props.history.push(`/chats/${newProps.chatHighlight}`);
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
    const { chats, chatHighlight, receiveChatHighlight } = this.props;    
    if (chats.length === 0) {
      return null;
    }

    const ChatListItems = [];
    
    this.props.chats.forEach(chat => {     
      if (chat.name.toUpperCase().includes(this.state.query.toUpperCase())) {
        ChatListItems.push(
          <ChatListItem 
            key={`chat-${chat.id}`} 
            chat={chat} 
            chatHighlight={chatHighlight}
            receiveChatHighlight={receiveChatHighlight}
          />
        );
      }
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