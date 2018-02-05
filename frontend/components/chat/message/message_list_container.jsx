import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageList from './message_list';
import { selectMessagesOfChat } from '../../../reducers/selectors';

const mapStateToProps = (state, ownProps) => ({
  messages: selectMessagesOfChat(state, ownProps.match.params.chatId),
  currentUser: state.session.currentUser,
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MessageList)
);