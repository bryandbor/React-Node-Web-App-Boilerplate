import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import {
	home
} from './constants/pages';

import notifDefaults from './constants/notification_defaults';

class App extends Component {
	static relativePaths = {
		[home]: '/',
	};
	componentDidMount() {
	}
	componentDidUpdate(prevProps, prevState) {
	}
  render() {
  	let contentClasses = [];

    return (
      <div id="App">
        <NotificationsSystem theme={theme} defaultValues={notifDefaults}/>
    		<div id="app-content" className={contentClasses.join(' ')}>
	      	{this.props.children}
      	</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
