import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';

/*----------  Organization Global Results  ----------*/

import counter from './counter/reducers';

const rootReducer = combineReducers({
  notifications: notificationsReducer(),

  counter,
});

export default rootReducer;