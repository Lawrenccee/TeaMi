import { combineReducers } from 'redux';
import ChatsReducer from './chats_reducer';
// import UsersReducer from './user_reducer';

const EntitiesReducer = combineReducers({
  chats: ChatsReducer,
  // users: UsersReducer,
});

export default EntitiesReducer;