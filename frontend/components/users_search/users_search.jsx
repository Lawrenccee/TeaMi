import React from 'react';

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
    let { 
      users, 
      currentUser, 
      handleEnter,
      placeholder,
      handleKeyDown,
      className,
      handleUser,
      chatMembers = []
    } = this.props;

    const UsersSearchItems = [];

    users.forEach((user, index) => {
      if (user.id !== currentUser.id && !chatMembers.includes(user.id) &&
        user.username.toUpperCase().includes(this.state.name.toUpperCase()) &&
        this.state.name) {
          const imgUrl = user.profile_pic_url === null ? 
            window.staticImages.profile_pic_url : user.profile_pic_url;

          UsersSearchItems.push(
            <li 
              onClick={(e) => this.handleClick(e)}
              data-user-index={index}
              key={`users-search-${user.id}`}
            > 
              <div>
                <img src={`${imgUrl}`} />
                {user.username}
              </div>
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
            autoComplete="off"
          />
        </form>
        { UsersSearchItems.length > 0 &&
          <ul id="users-search-results">
            {UsersSearchItems}
          </ul>
        }
      </div>
    );
  }
}

export default UsersSearch;