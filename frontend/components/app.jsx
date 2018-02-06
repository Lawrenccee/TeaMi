import React from 'react';
import SessionFormContainer from './session/session_form_container';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import ChatListContainer from './chat/chat_list/chat_list_container';
import ChatContainer from './chat/chat_container';
import NewChatContainer from './chat/new_chat/new_chat_container';
import NavContainer from './nav/nav_container';

const App = () => (
  <div>
      <AuthRoute path='/login' component={SessionFormContainer} />
      <AuthRoute path='/signup' component={SessionFormContainer} />
      <Route exact path="/" render={() => (<Redirect to='/login' />)} />

      <div className="chats-main">
        <div className="chats-left-sidebar">
          <ProtectedRoute path="/chats" component={NavContainer} />
          <ProtectedRoute path="/chats/:chatId?" component={ChatListContainer} />
        </div>
        
        <Switch>
          <ProtectedRoute path="/chats/new" component={NewChatContainer} />
          <ProtectedRoute path="/chats/:chatId" component={ChatContainer} />
        </Switch>
      </div>
  </div>
);

export default App;