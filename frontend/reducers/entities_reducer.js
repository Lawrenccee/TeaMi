import { combineReducers } from 'redux';
import ChatsReducer from './chats_reducer';
import UsersReducer from './users_reducer';
import GiphysReducer from './giphys_reducer';

const EntitiesReducer = combineReducers({
  chats: ChatsReducer,
  users: UsersReducer,
  giphys: GiphysReducer,
});

export default EntitiesReducer;