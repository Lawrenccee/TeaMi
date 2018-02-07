import { combineReducers } from 'redux';
import ChatHighlightReducer from './chat_highlight_reducer';
import ChatInfoReducer from './chat_info_reducer';

const UiReducer = combineReducers({
  chatHighlight: ChatHighlightReducer,
  chatInfo: ChatInfoReducer,
});

export default UiReducer;