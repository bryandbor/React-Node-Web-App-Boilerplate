import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  } from '../strings/strings';

class Home extends Component {
	componentDidMount() {
	}
	render() {
		return (
			<div id="home">
				Home
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
)(Home);