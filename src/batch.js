import React, { Component } from 'react';
import DBA from './dba.js';
import BatchCard from './batchcard.js';
import Loading from './loading.js';
import _ from 'underscore'

class Batch extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();

    	this.branch = this.props.match ? this.props.match.params.id : undefined;

    	this.state = {
    		'branch' : "",
            'data' : {},
            'isLoading' : 1
    	}

    	this.branchDetail = {
    		'computer' : {
    			name : "COMPUTER ENGINEERING",
    			logo : "fa fa-laptop"
    		},
    		'civil' : {
    			name : "CIVIL ENGINEERING",
    			logo : "fa fa-building-o"
    		},
    		'electrical' : {
    			name : "ELECTRICAL ENGINEERING",
    			logo : "fa fa-bolt"
    		},
    		'mechanical' : {
    			name : "MECHANICAL ENGINEERING",
    			logo : "fa fa-cog"
    		}
    	};

      this.fatchData = this.fatchData.bind(this);
	}
 	componentWillMount() {

	}
	componentWillReceiveProps (nextProps) {
        this.fatchData(nextProps.match.params.id);
	}
	componentDidMount() {
        this.fatchData(this.branch);
	}
    fatchData (branch) {
        console.log("branch", branch);
        var self = this;
        this.dba.batchImformation(this.branchDetail[branch].name).then(function (response) {
            self.setState({
              'branch' : branch, 
              'data' : response.data,
              'isLoading' : 0
            });
        });
    }
	render() {

        if (this.state.isLoading === 1) {
            return <Loading />
        }

	    return (
	        <div>
		        <div className="container batchboard">
	        		<div className="row">
	            		<div className="col-md-12">
	                		<div className="card z-depth-1 semheader">
	                    		<div className="container">
	                        		<div className="row">
	                            		<div className="col-md-1 branchlogo">
	                                		<i className={this.branchDetail[this.state.branch].logo}></i>
	                            		</div>
	                            		<div className="col-md-6" style={{'margin': 'auto','marginLeft' : '0px','paddingLeft': '0px'}}>
	                                	     <div className="name">{this.branchDetail[this.state.branch].name}</div>
	                            		</div>
	                            		<div className="col-md-3">
	                            		</div>
	                        		</div>
	                    		</div>
	                		</div>
	            		</div>
                          {
                            _.keys(this.state.data).sort().reverse().map( ( key, index ) => {
                                  return <BatchCard key={index} data={this.state.data[key]} batch={key} branch={this.state.branch}/>
                            } )
                          }
	           	   </div>
                </div>
	      	</div>
	    );
	}
}

export default Batch;
