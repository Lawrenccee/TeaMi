import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import ChatErrorsReducer from './chat_errors_reducer';

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  chat: ChatErrorsReducer,
});

export default ErrorsReducer;