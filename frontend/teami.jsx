import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import * as sessionActions from './actions/session_actions';
// import * as chatActions from './actions/chat_actions';
// import * as userActions from './actions/user_actions';
// import * as Giphy from './util/giphy_api_util';

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (window.currentUser) {
    const preloadedState = { 
      session: { 
        currentUser: window.currentUser 
      } 
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.sessionActions = sessionActions;
  // window.chatActions = chatActions;
  // window.userActions = userActions;
  // window.giphy = Giphy;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
