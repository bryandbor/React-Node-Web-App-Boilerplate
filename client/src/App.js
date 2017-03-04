/*=======================================
=            Library Imports            =
=======================================*/

// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, compose, applyMiddleware } from 'redux';

/*=====  End of Library Imports  ======*/

/*==============================================
=            Initialize Redux Store            =
==============================================*/

const loggerMiddleware = createLogger();

import rootReducer from './redux/reducers';

const createStoreWithMiddleware = compose(
	process.env.NODE_ENV === 'production' || true ?
	applyMiddleware(
		thunk
	) :
	applyMiddleware(
		thunk,
		loggerMiddleware
	)
)(createStore);

let store = createStoreWithMiddleware(rootReducer, {});

/*=====  End of Initialize Redux Store  ======*/

/*====================================
=            View Imports            =
====================================*/

import Root from './Root';

import Home from './views/Home';
import Counter from './views/Counter';

import NoMatch from './views/NoMatch';

/*=====  End of View Imports  ======*/

export default class App extends Component {
	render() {
	  return (
			<Provider store={store}>
			  <Router history={browserHistory}>
			  	<Route path={'/'} component={Root}>
				  	<IndexRedirect to="/home"/>
				  	<Route path="/home" component={Home}/>
				  	<Route path="counter" component={Counter}/>
				  	
				  	<Route path="*" component={NoMatch}/>
			  	</Route>
			  </Router>
		  </Provider>
	  );
	}
}