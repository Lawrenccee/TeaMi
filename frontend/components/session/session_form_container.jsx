import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SessionForm from './session_form';
import { login, signup, clearSessionErrors, demo } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
  const formType = ownProps.match.path === '/login' ? 
    "login" : 
    "signup";

  return {
    errors: state.errors.session,
    formType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.match.path === '/login' ? login : signup;
  
  return {
    submitUser: (user) => dispatch(action(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    demo: () => dispatch(demo()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SessionForm)
);

