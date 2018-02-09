import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../../actions/user_actions';
import { updateChat, updateChatImage } from '../../../actions/chat_actions';
import { selectAllUsers } from '../../../reducers/selectors';
import ChatInfo from './chat_info';

const mapStateToProps = (state, ownProps) => ({
  users: selectAllUsers(state),
  usersObject: state.entities.users,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  updateChat: ({ chat, members }) => dispatch(updateChat({ chat, members })),
  updateChatImage: ({ formData, chat }) => dispatch(updateChatImage({ formData, chat })),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatInfo)
);