// eslint-disable-next-line
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { increment, clear } from '../redux/counter/actions';

class Counter extends Component {
	static propTypes = {

	};

	render() {
	  return (
			<div>
				<p>
					<Link to="/">Back</Link>
				</p>
				<button onClick={this.props.increment}>Increment</button>
				<button onClick={this.props.clear}>Clear</button>
				Count: {this.props.counter}
			</div>
	  );
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter.count
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => {
			dispatch(increment());
		},
		clear: () => {
			dispatch(clear());
		},
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Counter);