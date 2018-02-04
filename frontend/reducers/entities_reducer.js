import { combineReducers } from 'redux';
import ChatsReducer from './chats_reducer';
import UsersReducer from './users_reducer';

const EntitiesReducer = combineReducers({
  chats: ChatsReducer,
  users: UsersReducer,
});

export default EntitiesReducer;