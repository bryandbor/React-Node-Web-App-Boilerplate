// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

class Root extends Component {
	static propTypes = {

	};

	render() {
	  return (
			<div id="root">
				<NotificationsSystem theme={theme}/>
				{this.props.children}
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
)(Root);