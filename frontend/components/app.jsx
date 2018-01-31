import React from 'react';
import SessionFormContainer from './session/session_form_container';
import LogoutContainer from './logout/logout_container';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <h1>Welcome to Teami!</h1>
    <Switch>
      <Redirect exact from='/' to='/chats' />
      <ProtectedRoute path="/chats" component={LogoutContainer} />
      <AuthRoute path='/login' component={SessionFormContainer} />
      <AuthRoute path='/signup' component={SessionFormContainer} />
    </Switch>
  </div>
);

export default App;