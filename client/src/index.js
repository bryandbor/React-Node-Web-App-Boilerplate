/*=======================================
=            Library Imports            =
=======================================*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

/*=====  End of Library Imports  ======*/

/*==============================
=            Routes            =
==============================*/

import { ROOT } from './routes';

/*=====  End of Routes  ======*/


/*===============================================
=            Route Component Imports            =
===============================================*/

import App from './App';
import Home from './views/Home';

import NoMatch from './views/NoMatch';

/*=====  End of Route Component Imports  ======*/

/*===================================
=            Redux State            =
===================================*/

const loggerMiddleware = createLogger();

import rootReducer from './redux/reducers';

let store = createStore(rootReducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);

/*=====  End of Redux State  ======*/

/*=====================================
=            Style Imports            =
=====================================*/

import './index.css';

/*=====  End of Style Imports  ======*/

ReactDOM.render(
	<Provider store={store}>
	  <Router history={browserHistory}>
	  	<Route path={ROOT} component={App}>
		  	<IndexRoute component={Home}/>
		  	<Route path="*" component={NoMatch}/>
	  	</Route>
	  </Router>
  </Provider>,
  document.getElementById('root')
);
