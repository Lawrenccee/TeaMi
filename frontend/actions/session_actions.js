import * as SessionApi from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const login = (formUser) => (dispatch) => (
  SessionApi.login(formUser)
    .then(
      (user) => dispatch(receiveCurrentUser(user)),
      (errors) => dispatch(receiveSessionErrors(errors))
    )
);

export const signup = (formUser) => (dispatch) => (
  SessionApi.signup(formUser)
    .then(
      (user) => dispatch(receiveCurrentUser(user)),
      (errors) => dispatch(receiveSessionErrors(errors))
    )
);

export const logout = () => (dispatch) => (
  SessionApi.logout()
    .then(
      () => dispatch(receiveCurrentUser(null)),
      (errors) => dispatch(receiveSessionErrors(errors))
    )
);

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