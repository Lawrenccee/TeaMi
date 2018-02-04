import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from './chat';
import { fetchChat } from '../../actions/chat_actions';

const mapStateToProps = (state, ownProps) => ({
  chat: state.entities.chats[ownProps.match.params.chatId],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChat: (chatId) => dispatch(fetchChat(chatId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chat)
);