import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchChats } from '../../../actions/chat_actions';
import { selectAllChats } from '../../../reducers/selectors';
import { receiveChatHighlight } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => ({
  chats: selectAllChats(state),
  chatHighlight: state.ui.chatHighlight,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChats: () => dispatch(fetchChats()),
  receiveChatHighlight: (chatId) => dispatch(receiveChatHighlight(chatId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatList)
);