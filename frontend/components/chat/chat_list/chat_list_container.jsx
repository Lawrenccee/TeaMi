import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ChatList from './chat_list';
import { fetchChats } from '../../../actions/chat_actions';
import { fetchUsers } from '../../../actions/user_actions';
import { resetState } from '../../../actions/session_actions';
import { selectAllChats } from '../../../reducers/selectors';
import { receiveChatHighlight } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => ({
  chats: selectAllChats(state),
  chatHighlight: state.ui.chatHighlight,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChats: (query) => dispatch(fetchChats(query)),
  fetchUsers: () => dispatch(fetchUsers()),
  receiveChatHighlight: (chatId) => dispatch(receiveChatHighlight(chatId)),
  resetState: () => dispatch(resetState()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatList)
);