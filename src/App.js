import React, { Component } from 'react';
import Search from './search.js';
import TopperBoard from './topperboard.js';
import DBA from './dba.js';
import './css/App.css';

class App extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();
  	}
   	componentWillMount() {

  	}
  	componentDidMount() {
  	}
	render() {

	    return (
	        <div>
		        <Search/>
		        <div className="container dashboard">
	        		<div className="row">
				        <TopperBoard/>
	        		</div>
	        	</div>
	      	</div>
	    );
	}
}

export default App;
