import React from 'react';
import NewChat from './new_chat';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createChat } from '../../../actions/chat_actions';
import { fetchUsers } from '../../../actions/user_actions';
import { selectAllUsers } from '../../../reducers/selectors';
import { receiveChatHighlight } from '../../../actions/ui_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    users: selectAllUsers(state),
    currentUser: state.session.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createChat: (members) => dispatch(createChat(members)),
    fetchUsers: () => dispatch(fetchUsers()),
    receiveChatHighlight: (chatId) => dispatch(receiveChatHighlight(chatId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewChat)
);
