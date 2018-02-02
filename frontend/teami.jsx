import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as sessionActions from './actions/session_actions';
import * as chatApi from './util/chat_api_util';

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

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.sessionActions = sessionActions;
  window.chatApi = chatApi;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});


// $.ajax({
//   method: 'POST',
//   url: '/api/users',
//   dataType: 'json',
//   data: { 
//     user: {
//       email: 'test',
//       username: 'test',
//       password: 'password',
//     }
//   }
// }).then((user) => console.log(user));

// $.ajax({
//   method: 'POST',
//   url: '/api/session',
//   dataType: 'json',
//   data: { 
//     user: {
//       email: 'test',
//       password: 'password',
//     }
//   }
// }).then((user) => console.log(user));

// $.ajax({
//   method: 'DELETE',
//   url: '/api/session',
//   dataType: 'json'
// }).then((user) => console.log(user));

// sessionActions.signup({
//   email: 'test3',
//   username: 'test3',
//   password: 'password',
// })(dispatch)