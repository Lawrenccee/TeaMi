import { combineReducers } from 'redux';
import RessionReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';
import EntitiesReducer from './entities_reducer';
import UiReducer from './ui_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: RessionReducer,
  errors: ErrorsReducer,
  ui: UiReducer,
});

export default RootReducer;