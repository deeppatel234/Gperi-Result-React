import React, { Component } from 'react';
import Search from './search.js';
import TopperBoard from './topperboard.js';
import DBA from './dba.js';
import BranchTopperBoard from './branchtopperboard.js';

class Dashboard extends Component {

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
				        <BranchTopperBoard branch="computer"/>
				        <BranchTopperBoard branch="civil"/>
				        <BranchTopperBoard branch="electrical"/>
				        <BranchTopperBoard branch="mechanical"/>
	        		</div>
	        	</div>
	      	</div>
	    );
	}
}

export default Dashboard;
