import React from 'react';
import SessionFormContainer from './session/session_form_container';
import LogoutContainer from './logout/logout_container';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ChatListContainer from './chat/chat_list/chat_list_container';
// import ChatContainer from './chat/chat_container';
// import NewChatContainer from './new_chat/new_chat_container';

const App = () => (
  <div>
      <AuthRoute path='/login' component={SessionFormContainer} />
      <AuthRoute path='/signup' component={SessionFormContainer} />
      <Route exact path="/" render={() => (<Redirect to='/login' />)} />

      <ProtectedRoute path="/chats" component={LogoutContainer/*Change to NavContainer later*/} />
      <ProtectedRoute path="/chats" component={ChatListContainer} />
      
      {/* <Switch>
        <ProtectedRoute path="/chats/:chatId" component={ChatContainer} />
        <ProtectedRoute path="/chats/new" component={NewChatContainer} />
      </Switch> */}
  </div>
);

export default App;