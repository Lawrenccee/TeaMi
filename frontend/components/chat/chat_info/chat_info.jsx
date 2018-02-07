import React from 'react';
import UsersSearch from '../../users_search/users_search';
import values from 'lodash/values';
import merge from 'lodash/merge';

class ChatInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      members: {},
    });

    this.members = {};
    this.memberOrder = [];
    
    this.handleUser = this.handleUser.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleDeleteMember = this.handleDeleteMember.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleEnter(e) {
    e.preventDefault();
    let members = merge({}, this.state.members);

    if (values(members).length !== 0) {
      this.props.updateChat({ members: members, chat: this.props.chat });
    }
  }

  handleUser(user) {
    if (user.id !== this.props.currentUser.id && 
      !this.props.chat.member_ids.includes(user.id)) {

      this.members[user.id] = user;
      if (!this.memberOrder.includes(user.id)) {
        this.memberOrder.push(user.id);
      }

      this.setState({
        members: this.members,
      });
    }
  }

  handleDeleteMember(e, id) {
    switch (e.keyCode) {
      case 8:
        const index = this.memberOrder.indexOf(id);
        this.memberOrder.splice(index, 1);

        delete this.members[id];
        break;
    }
  }

  render() {
    if (this.props.users.length === 0) {
      return null;
    }

    const { chat, users, currentUser, usersObject } = this.props;

    let chatMembers = chat.member_ids;

    if (!chatMembers) {
      chatMembers = [];
    }

    return (
      <div className='chat-info-container'>
        <div className='chat-info'>
          {chat.chat_pic_url &&
            <img src={`${chat.chat_pic_url}`} height="50" width="50" />
          }
          {chat.chat_pic_url === "" || chat.chat_pic_url === null &&
            <img src={window.staticImages.profile_pic_url} height="50" width="50" />
          }
          <p>{chat.name}</p>
        </div>
        <div className='my-info'>
          <a href='https://github.com/Lawrenccee'>
            {`TeaMí Profile`}
          </a>
          <br />
          <a href='https://www.linkedin.com/in/lawrence-guintu-96a81a101/'>
            {`Favorite Milk Tea`}
          </a>
        </div>
        <div className="chat-info-users-search">      
          <UsersSearch
            users={users}
            currentUser={currentUser}
            handleEnter={this.handleEnter}
            placeholder={"Add a member to this chat..."}
            handleKeyDown={() => {}}
            className={"new-chat-users-search"}
            handleUser={this.handleUser}
            chatMembers={chatMembers}
          />
          <ul className='new-chat-members'>
            {
              this.memberOrder.map(index =>
                <li 
                onKeyDown={(e) => this.handleDeleteMember(e, index)}
                key={`chat-member-${this.members[index].id}`}
                tabIndex={0}
              >
                  {this.members[index].username}
                </li>
              )
            }
          </ul>  
        </div>
        <div className='chat-info-members'>
          <p>Current Members:</p>
          <ul className='chat-info-members-list'>
            {
              chatMembers.map(id =>
                <li key={`current-member-${id}`}>
                  {usersObject[id].profile_pic_url &&
                    <img src={`${usersObject[id].profile_pic_url}`} height="50" width="50" />
                  }
                  {usersObject[id].profile_pic_url === "" || usersObject[id].profile_pic_url === null &&
                    <img src={window.staticImages.profile_pic_url} height="50" width="50" />
                  }
                  {usersObject[id].username}
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatInfo;