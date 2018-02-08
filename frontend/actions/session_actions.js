import * as SessionApi from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const STATE_RESET = 'STATE_RESET';

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

export const resetState = () => ({
  type: STATE_RESET,
});

export const login = (formUser) => (dispatch) => (
  SessionApi.login(formUser)
    .then(
      (user) => {dispatch(resetState()); dispatch(receiveCurrentUser(user));},
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
      () => dispatch(resetState()),
      (errors) => dispatch(receiveSessionErrors(errors))
    )
);

export const demo = () => (dispatch) => (
  SessionApi.demo()
    .then((demoUser) => dispatch(receiveCurrentUser(demoUser)))
);