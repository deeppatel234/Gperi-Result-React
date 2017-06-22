import React, { Component } from 'react';
import Search from './search.js';
import DBA from './dba.js';

class Batch extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();

		console.log("this.props", this.props);
    	this.batch = this.props.match ? this.props.match.params.id : undefined;

    	if(!this.batch) {
    		this.batch = this.props.branch ? this.props.branch : "COMPUTER ENGINEERING"
    	}

    	this.state = {
    		'branch' : this.batch
    	}
  	}
   	componentWillMount() {

  	}
  	componentWillReceiveProps (nextProps) {
  	    //console.log("nextProps", nextProps);
  		this.setState({
  			'branch' : nextProps.match.params.id
  		});
  	}
  	componentDidMount() {
  	}
	render() {
	    return (
	        <div>
		        <div className="container batchboard">
	        		<div className="row">
	            		<div className="col-md-12">
	                		<div className="card z-depth-1 semheader">
	                    		<div className="container">
	                        		<div className="row">
	                            		<div className="col-md-1 branchlogo">
	                                		<i className="fa fa-laptop" aria-hidden="true"></i>
	                            		</div>
	                            		<div className="col-md-6" style={{'margin': 'auto','marginLeft' : '0px'}}>
	                                		<div className="name">{this.state.branch}</div>
	                            		</div>
	                            		<div className="col-md-3">
	                            		</div>
	                        		</div>
	                    		</div>
	                		</div>
	            		</div>
	            	</div>
            	</div>
	      	</div>
	    );
	}
}

export default Batch;
