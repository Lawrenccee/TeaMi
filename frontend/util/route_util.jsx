import React from 'react';
import { Redirect, withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ loggedIn, exact, path, component: Component }) => (
  <Route 
    path={path}
    exact={exact}
    render={(props) => (
      loggedIn ? (
        <Redirect to="/chats" />
      ) : (
        <Component {...props} />
      )
    )}
  />
);

const Protected = ({ loggedIn, exact, path, component: Component }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    )}
  />
);

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.session.currentUser
  };
};

export const AuthRoute = withRouter(
  connect(
    mapStateToProps,
    null
  )(Auth)
);

export const ProtectedRoute = withRouter(
  connect(
    mapStateToProps,
    null
  )(Protected)
);