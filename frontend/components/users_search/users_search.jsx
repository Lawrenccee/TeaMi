import React from 'react';

class UsersSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  update(property) {
    return e => {
      this.setState({
        [property]: e.target.value,
      });
    };
  }

  handleMouseUp(e) {
    console.log('hello');
    this.setState({
      name: ""
    }, () => document.getElementById("users-search").focus());
  }

  handleMouseDown(e) {
    e.preventDefault();

    const userIndex = e.currentTarget.dataset.userIndex;
    this.props.handleUser(this.props.users[userIndex]);
  }

  handleBlur(e) {
    const results = document.getElementById("users-search-results");
    if (results) {
      document.getElementById("users-search-results").classList.add('hidden');
    }
  }

  handleFocus() {
    const results = document.getElementById("users-search-results");
    if (results) {
      document.getElementById("users-search-results").classList.remove('hidden');
    }
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
              onMouseDown={(e) => this.handleMouseDown(e)}
              onMouseUp={(e) => this.handleMouseUp((e))}
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
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
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