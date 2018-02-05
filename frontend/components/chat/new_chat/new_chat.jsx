import React from 'react';
import UsersSearch from '../../users_search/users_search';
import values from 'lodash/values';
import merge from 'lodash/merge';

class NewChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      members: {},
    });

    this.members = {};
    this.memberOrder= [];

    this.handleUser = this.handleUser.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleKeyDown(e) {
    switch(e.keyCode) {
      case 8:
        if (this.memberOrder.length > 0 && e.target.value === "") {
          delete this.members[this.memberOrder.pop()];
          this.setState({
            members: this.members,
          });
        }
      break;
    }
  }

  handleEnter(e) {
    e.preventDefault();
    let members = merge({}, this.state.members);

    if (values(members).length !== 0) {
      members[this.props.currentUser.id] = this.props.currentUser;

      this.props.createChat({members: members}).then(() => {
        this.members = {};
        this.memberOrder = [];
        this.setState({
          members: this.members,
        });
      });
    }
  }

  handleUser(user) {
    this.members[user.id] = user;
    if (!this.memberOrder.includes(user.id)) {
      this.memberOrder.push(user.id);
    }

    this.setState({
      members: this.members,
    });
  }

  render() {
    const { users, currentUser } = this.props;
    let placeholder = 
      "Press Enter in here to create a new chat or type to add more members";

    if (this.memberOrder.length === 0) {
      placeholder = "Type the name of a person or group";
    }

    return (
      <div className='new-chat-container'>
        <div className ='new-chat-input'>
          <p>To:</p>
          <div className='new-chat-input-list'>
            <ul className='new-chat-members'>
              {
                this.memberOrder.map(index =>
                  <li key={`member-${this.members[index].id}`}>
                    {this.members[index].username}
                  </li>
                )
              }
            </ul>
            <UsersSearch
              handleUser={this.handleUser}
              users={users}
              currentUser={currentUser}
              handleEnter={this.handleEnter}
              placeholder={placeholder}
              handleKeyDown={this.handleKeyDown}
              className={"new-chat-users-search"}
            />
          </div>
        </div>
        <div className='new-chat-main' />
      </div>
    );
  }
}

export default NewChat;
