import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearChatHighlight } from '../../actions/ui_actions';
import { updateUser, fetchUser } from '../../actions/session_actions';
import Nav from './nav';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
});

const mapDisptachToProps = (dispatch, ownProps) => ({
  clearChatHighlight: () => dispatch(clearChatHighlight()),
  updateUser: ({ formData, user }) => dispatch(updateUser({ formData, user })),
  fetchUser: (userId) => dispatch(fetchUser(userId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDisptachToProps
  )(Nav)
);