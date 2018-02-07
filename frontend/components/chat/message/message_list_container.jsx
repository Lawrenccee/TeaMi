import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageList from './message_list';
import { selectMessagesOfChat } from '../../../reducers/selectors';
import { receiveChatHighlight } from '../../../actions/ui_actions';
import { fetchUsers } from '../../../actions/user_actions';

const mapStateToProps = (state, ownProps) => ({
  messages: selectMessagesOfChat(state, ownProps.match.params.chatId),
  currentUser: state.session.currentUser,
  users: state.entities.users,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageList)
);