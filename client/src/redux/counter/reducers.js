import { combineReducers } from 'redux';

import { INCREMENT, CLEAR } from './actions';

const initialState = {
	count: 0
};

function count (state = initialState.count, action) {
	switch ( action.type ) {
		case INCREMENT:
			return state + 1;
		case CLEAR:
			return initialState.count;
		default:
			return state;
	}
}

export default combineReducers({
	count
});