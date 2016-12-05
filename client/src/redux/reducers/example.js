import { combineReducers } from 'redux';

import { 
	CONTACT_SEARCH_VALUE_CHANGED,
	INVALIDATE_CONTACTS,// eslint-disable-next-line
	INVALIDATE_SINGLE_CONTACT,
	CLEAR_CONTACT_UPDATES,
	SET_CONTACT_UPDATE_CHECK,
	CHECKING_FOR_CONTACT_UPDATES,
	FETCHING_CONTACTS,
	CONTACTS_FETCHED,
	CONTACTS_FETCHED_WITH_ERROR,
	CONTACTS_SET_SORTING,
	SET_FILTERS,
	TOGGLE_SELECTED_CONTACT,
	CLEAR_SELECTED_CONTACT
} from '../actions/example';

const initialState = {
	search: '',
	invalidated: true,
	fetching: false,
	contacts: [],
	count: 0,
	lastFetch: null,
	sorting: {
		order: 0,
		inverse: false
	},
	filters: {},
	selectedContacts: [],
	updateCheck: null,
};

function search (state = initialState.search, action) {
	switch (action.type) {
		case CONTACT_SEARCH_VALUE_CHANGED:
			return action.newValue;

		default:
			return state;
	}
}

function invalidated (state = initialState.invalidated, action) {
	switch (action.type) {
		case INVALIDATE_CONTACTS:
			return true;

		case CONTACTS_FETCHED:
			return false;

		default:
			return state;
	}
}

function fetching (state = initialState.fetching, action) {
	switch (action.type) {
		case FETCHING_CONTACTS:
			return true;

		case CONTACTS_FETCHED:
		case CONTACTS_FETCHED_WITH_ERROR:
			return false;

		default:
			return state;
	}
}

function contacts (state = initialState.contacts, action) {
	switch (action.type) {
		case CONTACTS_FETCHED:
			return action.contacts.map((contact) => {
				contact.created_at = new Date(contact.created_at);
				contact.updated_at = new Date(contact.updated_at);

				return contact;
			});

		default:
			return state;
	}
}

function count (state = initialState.count, action) {
	switch (action.type) {
		case CONTACTS_FETCHED:
			return action.count;

		default:
			return state;
	}
}

function lastFetch (state = initialState.lastFetch, action) {
	switch (action.type) {
		case CONTACTS_FETCHED:
			return new Date();

		default:
			return state;
	}
}

function sorting (state = initialState.sorting, action) {
	switch (action.type) {
		case CONTACTS_SET_SORTING:
			if (action.sortingOrder.label === state.order.label)
				return Object.assign({}, state, {
					inverse: ! state.inverse
				});

			else
				return Object.assign({}, state, {
					order: action.sortingOrder,
					inverse: false
				});

		default:
			return state;
	}
}

function filters (state = initialState.filters, action) {
	switch (action.type) {
		case SET_FILTERS:
			return action.newFilters;

		default:
			return state;
	}
}

function selectedContacts (state = initialState.selectedContacts, action) {
	switch (action.type) {
		case TOGGLE_SELECTED_CONTACT:
			let selectedContactIndex = state.findIndex((contact) => { return(contact._id === action.selectedContact._id); });
			if (selectedContactIndex === -1)
				return [...state, action.selectedContact];

			else
				return state.filter((contact) => { return(contact._id !== action.selectedContact._id); });

		case CLEAR_SELECTED_CONTACT:
			return [];

		default:
			return state;
	}
}

function updateCheck (state = initialState.updateCheck, action) {
	switch (action.type) {
		case SET_CONTACT_UPDATE_CHECK:
			return action.updateCheck;

		case CLEAR_CONTACT_UPDATES:
		case CHECKING_FOR_CONTACT_UPDATES:
			if (state)
				clearTimeout(state);
			return null;

		default:
			return state;
	}
}

const rootReducer = combineReducers({
	search,
	invalidated,
	fetching,
	contacts,
	count,
	lastFetch,
	sorting,
	filters,
	selectedContacts,
	updateCheck,
});

export default rootReducer;

