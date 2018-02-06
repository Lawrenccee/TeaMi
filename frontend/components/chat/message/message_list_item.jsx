import React from 'react';

class MessageListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTimeStampClass: "message-timestamp-hide",
      theirTimeStampClass: "message-timestamp-hide"
    };

    this.handleMyHover = this.handleMyHover.bind(this);
    this.handleTheirHover = this.handleTheirHover.bind(this);
    this.handleMyUnHover = this.handleMyUnHover.bind(this);
    this.handleTheirUnHover = this.handleTheirUnHover.bind(this);
  }

  handleMyHover() {
    this.setState({
      myTimeStampClass: "message-timestamp-show"
    });
  }

  handleTheirHover() {
    this.setState({
      theirTimeStampClass: "message-timestamp-show"
    });
  }

  handleMyUnHover() {
    this.setState({
      myTimeStampClass: "message-timestamp-hide"
    });
  }

  handleTheirUnHover() {
    this.setState({
      theirTimeStampClass: "message-timestamp-hide"
    });
  }

  render() {
    const { message, currentUser } = this.props;
    let messageClass = "message their-message";

    if (message.author_id === currentUser.id) {
      messageClass = "message my-message";
    }

    if (message.giphy_url !== "") {
      messageClass += " giphy-message";

      if (message.author_id === currentUser.id) {
        return (
          <li className={messageClass}> 
            <span className={this.state.myTimeStampClass}>
              {message.timestamp}
            </span>
            <div
              onMouseEnter={this.handleMyHover}
              onMouseLeave={this.handleMyUnHover}
            >
              <img src={`${message.giphy_url}`} />
            </div>
          </li>
        );
      } else {
        return (
          <li className={messageClass}> 
            <div
              onMouseEnter={this.handleTheirHover}
              onMouseLeave={this.handleTheirUnHover}
            >
              <img src={`${message.giphy_url}`} />
            </div>
            <span className={this.state.theirTimeStampClass}>
              {message.timestamp}
            </span>
          </li>
        );
      }
    }

    if (message.author_id === currentUser.id) {
      return (
        <li className={messageClass}> 
          <span className={this.state.myTimeStampClass}>
            {message.timestamp}
          </span>
          <div
            onMouseEnter={this.handleMyHover}
            onMouseLeave={this.handleMyUnHover}
          >
            {message.body}
          </div>
        </li>
      );
    } else {
      return (
        <li className={messageClass}>
          <div
            onMouseEnter={this.handleTheirHover}
            onMouseLeave={this.handleTheirUnHover}
          >
            {message.body}
          </div>
          <span className={this.state.theirTimeStampClass}>
            {message.timestamp}
          </span>
        </li>
      );
    }
  }
}
export default MessageListItem;