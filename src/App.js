import React, { Component } from 'react';
import Search from './search.js';
import TopperBoard from './topperboard.js';
import Student from './student.js'
import DBA from './dba.js';
import './css/App.css';
import Batch from './batch.js'

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
				        {/*<Batch />*/}
	        		</div>
	        	</div>
	      	</div>
	    );
	}
}

export default App;
