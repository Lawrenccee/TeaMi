import React from 'react';
// import UsersSearchItem from './users_search_item';

class UsersSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  update(property) {
    return e => {
      this.setState({
        [property]: e.target.value,
      });
    };
  }

  handleClick(e) {
    const userIndex = e.currentTarget.dataset.userIndex;
    this.props.handleUser(this.props.users[userIndex]);
    
    this.setState({
      name: ""
    }, () => document.getElementById("users-search").focus());
  }

  render() {
    const { 
      users, 
      currentUser, 
      handleEnter,
      placeholder,
      handleKeyDown,
      className
    } = this.props;

    const UsersSearchItems = [];

    users.forEach((user, index) => {
      if (user.id !== currentUser.id && 
        user.username.toUpperCase().includes(this.state.name.toUpperCase()) &&
        this.state.name) {
          UsersSearchItems.push(
            <li 
              onClick={(e) => this.handleClick(e)}
              data-user-index={index}
              key={`users-search-${user.id}`}
            >
              {user.username}
            </li>
          );
        }
    });

    return (
      <div className={className}>
        <form onSubmit={(e) => handleEnter(e)}>
          <input type="text"
            id="users-search"
            value={this.state.name}
            onChange={this.update("name")}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder={placeholder}
          />
        </form>
        <ul>
          {UsersSearchItems}
        </ul>
      </div>
    );
  }
}

export default UsersSearch;