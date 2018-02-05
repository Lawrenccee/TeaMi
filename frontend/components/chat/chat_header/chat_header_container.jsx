import React from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from  'react-redux';
// import ChatHeader from './chat_header';

// const mapStateToProps = (state, ownProps) => ({
  
// });

// const mapDispatchToProps = (state, ownProps) => ({

// });

// export default withRouter(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ChatHeader)
// );

const ChatHeaderContainer = ({ chat }) => (
  <div className="chat-header">
    <p>{chat.name}</p>
    <button>Hide right sidebar</button>
  </div>
);

export default ChatHeaderContainer;