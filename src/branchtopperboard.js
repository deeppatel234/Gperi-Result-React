import React, { Component } from 'react';
import DBA from './dba.js';
import Info from './info.js';
import Loading from './loading.js';
import _ from 'underscore';
import { Link } from 'react-router-dom';

class BranchTopperBoard extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();
    	this.info = new Info();
    	this.fetchData = this.fetchData.bind(this);

    	this.state = {
    		isLoading : 1
    	}
  	}
   	componentWillMount() {

  	}
  	componentDidMount() {
  		this.fetchData(this.props);
  	}
  	componentWillReceiveProps (nextProps) {
  		this.fetchData(nextProps);
	}
  	fetchData (params) {
  		var self = this;
  		this.dba.branchTop(this.info.branchDetail[params.branch].name).then(function(responce){
  		    console.log("responce", responce);
	  		self.setState({
	  	    	isLoading : 0,
	  	    	branch : params.branch,
	  	    	top : responce.data
	  	    });
  		});
  	}
	render() {

		if (this.state.isLoading === 1) {
			return <Loading />;
		}

	    return (
	    	<div className="card z-depth-1 branchtopper">
                <div className="card-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 left-panel">
                                <div style={{display: 'flex'}}>
                                    <div style={{fontSize: '94px'}}>
                                        <div className="logo"><i className={this.info.branchDetail[this.state.branch].logo} aria-hidden="true"></i></div>
                                    </div>
                                    <div style={{fontSize: '38px' , marginTop : '13px' , margiLeft: '32px'}}>
                                        {this.info.branchDetail[this.state.branch].name.split(" ")[0]} <br/> {this.info.branchDetail[this.state.branch].name.split(" ")[1]}
                                    </div>
                                </div>
                                <div>
                                    <canvas id="mychart1" style={{display: 'block' , width: '500px' , height: '250px'}} width="500" height="250"></canvas>
                                </div>
                            </div>
                            <div className="col-md-6">
                                
                            	{
                            		_.keys(this.state.top).map( (key,index) => {
                            			return (
                            				<table className="table table-sm" key={index}>
			                                	<thead>
			                                        <tr>
			                                            <th colSpan="4">{key.toUpperCase()}</th>
			                                        </tr>
			                                	</thead>
			                                    <tbody>
			                                        {
			                                        	this.state.top[key].map( (student,index) => {
			                                        		return(
			                                        			<tr key={index}>
						                                            <th scope="row">{index+1}</th>
						                                            <td className="enrollment"><Link to={"student/" + student.enrollment} className="tabletd">{student.enrollment}</Link></td>
						                                            <td className="name">{student.name}</td>
						                                            <td className="name">{this.info.round(student[key])}</td>
						                                        </tr>
			                                        		);
			                                        	})
			                                        }
			                                    </tbody>
		                                	</table>
		                                )
                            		})
                            	}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    );
	}
}

export default BranchTopperBoard;
