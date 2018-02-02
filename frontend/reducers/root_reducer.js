import { combineReducers } from 'redux';
import RessionReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';
import EntitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session: RessionReducer,
  errors: ErrorsReducer,
});

export default RootReducer;