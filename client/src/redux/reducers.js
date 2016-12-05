import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';

/*----------  Organization Global Results  ----------*/
// eslint-disable-next-line
import example from './reducers/example';

const rootReducer = combineReducers({
  notifications: notificationsReducer
});

export default rootReducer;