import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageForm from './message_form';
import { createMessage, fetchChat } from '../../../actions/chat_actions';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (message) => dispatch(createMessage(message)),
  fetchChat: (chatId) => dispatch(fetchChat(chatId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageForm)
);