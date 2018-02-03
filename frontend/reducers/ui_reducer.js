import { combineReducers } from 'redux';
import ChatHighlightReducer from './chat_highlight_reducer';

const UiReducer = combineReducers({
  chatHighlight: ChatHighlightReducer,
});

export default UiReducer;