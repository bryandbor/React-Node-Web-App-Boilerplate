import fetch from 'isomorphic-fetch';
import { http, host, port, UPDATE_CHECK_DELAY } from '../../connection';

export const CONTACT_SEARCH_VALUE_CHANGED = 'CONTACT_SEARCH_VALUE_CHANGED';
export function changeSearchValue (newValue) {
	return {
		type: CONTACT_SEARCH_VALUE_CHANGED,
		newValue
	};
}

export const INVALIDATE_CONTACTS = 'INVALIDATE_CONTACTS';
export const INVALIDATE_SINGLE_CONTACT = 'INVALIDATE_SINGLE_CONTACT';
export const SET_CONTACT_UPDATE_CHECK = 'SET_CONTACT_UPDATE_CHECK';
export const CLEAR_CONTACT_UPDATES = 'CLEAR_CONTACT_UPDATES';
export const CHECKING_FOR_CONTACT_UPDATES = 'CHECKING_FOR_CONTACT_UPDATES';

export const FETCHING_CONTACTS = 'FETCHING_CONTACTS';

function checkForContactUpdates () {
	return function (dispatch, getState) {
		dispatch({
			type: CHECKING_FOR_CONTACT_UPDATES
		});

		return fetch(`${http}://${host}:${port}/updates/contacts`)
			.then(response => response.json())
			.then(json => {
				if (json.success) {
					let lastUpdate = getState().contacts.lastFetch;

					// check if the latest updated row in the database is after the last fetch
					if (json.latest !== null && lastUpdate.getTime() < new Date(json.latest).getTime()) {
						dispatch({
							type: INVALIDATE_CONTACTS
						});

						dispatch(fetchContactsIfNeeded());
					} else {
						dispatch({
							type: SET_CONTACT_UPDATE_CHECK,
							updateCheck: setTimeout(() => { dispatch(checkForContactUpdates()); }, UPDATE_CHECK_DELAY)
						});
					}
				} else {
					// handle update check error
				}
			});
	}
}

function shouldFetchContacts (state) {
	if (state.invalidated && ! state.fetching)
		return true;

	else
		return false;
}

export function fetchContactsIfNeeded () {
	return function(dispatch, getState) {
		if (! shouldFetchContacts(getState().contacts)) 
			return Promise.resolve();

		dispatch({
			type: CLEAR_CONTACT_UPDATES
		});

		dispatch({
			type: FETCHING_CONTACTS
		});

		return fetch(`${http}://${host}:${port}/contacts`)
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: SET_CONTACT_UPDATE_CHECK,
					updateCheck: setTimeout(() => { dispatch(checkForContactUpdates()); }, UPDATE_CHECK_DELAY)
				});

				return dispatch(handleContactsFetched(json))
			});
	};
}

export const CONTACTS_FETCHED = 'CONTACTS_FETCHED';
export const CONTACTS_FETCHED_WITH_ERROR = 'CONTACTS_FETCHED_WITH_ERROR';
function handleContactsFetched (json) {
	if (json.success) 
		return {
			type: CONTACTS_FETCHED,
			contacts: json.contacts,
			count: json.count
		};

	else
		return {
			type: CONTACTS_FETCHED_WITH_ERROR
		};
}

export const CONTACTS_SET_SORTING = 'CONTACTS_SET_SORTING';
export function setContactSorting (sortingOrder) {
	return {
		type: CONTACTS_SET_SORTING,
		sortingOrder
	};
}

export const SET_FILTERS = 'SET_FILTERS';
export function setFilters (newFilters) {
	return {
		type: SET_FILTERS,
		newFilters
	};
}

export const TOGGLE_SELECTED_CONTACT = 'TOGGLE_SELECTED_CONTACT';
export const CLEAR_SELECTED_CONTACT = 'CLEAR_SELECTED_CONTACT';
export function toggleSelectedContact (selectedContact) {
	return {
		type: TOGGLE_SELECTED_CONTACT,
		selectedContact
	};
}

export const TOGGLE_CONTACT_COL = 'TOGGLE_CONTACT_COL';
export const RESET_CONTACT_COLS = 'RESET_CONTACT_COLS';
export function toggleContactCol (colToToggle) {
	return {
		type: TOGGLE_CONTACT_COL,
		colToToggle
	};
}

export const CHANGE_CONTACT_COL_WIDTH = 'CHANGE_CONTACT_COL_WIDTH';
export function changeContactColWidth ({ colKey, newWidth }) {
	return {
		type: CHANGE_CONTACT_COL_WIDTH,
		colKey,
		newWidth
	};
}