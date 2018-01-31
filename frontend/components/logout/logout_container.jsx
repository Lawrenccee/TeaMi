// import React from 'react';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './logout';

// const mapStateToProps = (state, ownProps) => {
//   return {
//     errors: state.errors.session,
//   };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(
  connect(
    null, // shouldnt even show button if user is not logged in
    mapDispatchToProps
  )(Logout)
);