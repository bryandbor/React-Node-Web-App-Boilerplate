import React, { Component } from 'react';
import { Link } from 'react-router';
import FA from 'react-fontawesome';

import { ROOT } from '../routes';

class NoMatch extends Component {
  render() {
    return (
      <div id="NoMatch">
      	<Link to={ROOT}>
      		<FA name="caret-left"/> Back
  			</Link>
      	&nbsp;No match found for path {this.props.location.pathname}
      </div>
    );
  }
}

export default NoMatch;
