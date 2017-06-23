import React, { Component } from 'react';
import DBA from './dba.js';

class NoMatch extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();
  	}
   	componentWillMount() {

  	}
  	componentWillReceiveProps (nextProps) {

  	}
  	componentDidMount() {
  	}
	render() {
	    return (
	        <div>
	        	not found
	      	</div>
	    );
	}
}

export default NoMatch;
