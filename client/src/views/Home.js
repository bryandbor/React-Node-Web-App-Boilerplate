import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import {  } from '../strings/strings';

class Home extends Component {
	componentDidMount() {
	}
	render() {
		return (
			<div id="home">
				<h4>
					Home
				</h4>
				<Link to="/counter">
					To Counter
				</Link>
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