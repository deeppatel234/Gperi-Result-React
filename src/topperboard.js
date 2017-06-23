import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DBA from './dba.js';
import logo from './img/logo.svg';
import _ from 'underscore';

class TopperBoard extends Component {

	constructor(props) {
    	super(props);
	    
	    this.state = {
      		goldStudents: [],
      		silverStudents: [],
      		bronzStudents: [],
    	};
    	this.icons = {
    		"COMPUTER ENGINEERING" : 'fa fa-laptop',
    		"MECHANICAL ENGINEERING" : 'fa fa-cog',
    		"ELECTRICAL ENGINEERING" :'fa fa-bolt',
    		"CIVIL ENGINEERING" : 'fa fa-building-o',
    	};
    	
    	this.dba = new DBA();
  	}
  	componentDidMount() {
   		var self = this;
   		this.dba.topStudentsDashboard().then(function (response) { 
   			let goldStudents = [];
      		let silverStudents = [];
      		let bronzStudents = [];
      		_.each(response.data,function(grade,key){
      			grade = _.uniq(grade,function(i){ return i.enrollment});
      		    grade[0]['grade'] = key.toUpperCase();
      		    grade[1]['grade'] = key.toUpperCase();
      		    grade[2]['grade'] = key.toUpperCase();
      		    grade[0]['point'] = grade[0][key].toFixed(2);
      		    grade[1]['point'] = grade[1][key].toFixed(2);
      		    grade[2]['point'] = grade[2][key].toFixed(2);
      			goldStudents.push(grade[0]);
      			silverStudents.push(grade[1]);
      			bronzStudents.push(grade[2]);
      		});
   			self.setState({
   				goldStudents: goldStudents,
      			silverStudents: silverStudents,
      			bronzStudents: bronzStudents
   			}); 
   		})
   		.catch(function (error) {
		    console.log(error);
		});
  	}
	render() {

	    return (
    			<div className="card z-depth-1 topperboard">
	                <div className="card-block">
	                    <div className="container" style={{ marginTop : '0'}}>
	                        <div className="row">
	                            <div className="logoheader">
	                                <div>
	                                    <img src={logo} alt="logo"/>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                    <div className="container">
	                    	<div className="row">
	                    		<div className="col-md-3 box">
	                                <div className="trophy">
	                                    <i className="fa fa-trophy gold"></i>
	                                </div>
	                            </div>
			                    {this.state.goldStudents.map(items => 
	                            	<div className="col-md-3 verticalLine box" key={"gold"+items.grade}>
		                                <div>
		                                	<Link to={"student/"+items.enrollment}>
		                                    <i className={this.icons[items.branch]}></i>
		                                    </Link>
		                                </div>
		                                <div>
		                                	<Link to={"student/"+items.enrollment}>
		                                    <div className="matrix">{items.grade}</div>
		                                    <div className="grade">{items.point}</div>
		                                    <div className="enrollment">{items.enrollment}</div>
		                                    </Link>
		                                </div>
	                            	</div>
			                    )}
			                </div>
	                    </div>
	                    <div className="container">
	                    	<div className="row">
	                    		<div className="col-md-3 box">
	                                <div className="trophy">
	                                    <i className="fa fa-trophy silver"></i>
	                                </div>
	                            </div>
			                    {this.state.silverStudents.map(items => 
	                            	<div className="col-md-3 verticalLine box" key={"silver"+items.grade}>
		                                <div>
		                                    <Link to={"student/"+items.enrollment}>
		                                    <i className={this.icons[items.branch]}></i>
		                                    </Link>
		                                </div>
		                                <div>
		                                    <Link to={"student/"+items.enrollment}>
		                                    <div className="matrix">{items.grade}</div>
		                                    <div className="grade">{items.point}</div>
		                                    <div className="enrollment">{items.enrollment}</div>
		                                    </Link>
		                                </div>
	                            	</div>
			                    )}
			                </div>
	                    </div>
	                    <div className="container">
	                    	<div className="row">
	                    		<div className="col-md-3 box">
	                                <div className="trophy">
	                                    <i className="fa fa-trophy bronz"></i>
	                                </div>
	                            </div>
			                    {this.state.bronzStudents.map(items => 
	                            	<div className="col-md-3 verticalLine box" key={"bronz"+items.grade}>
		                                <div>
		                                    <Link to={"student/"+items.enrollment}>
		                                    <i className={this.icons[items.branch]}></i>
		                                    </Link>
		                                </div>
		                                <div>
		                                    <Link to={"student/"+items.enrollment}>
		                                    <div className="matrix">{items.grade}</div>
		                                    <div className="grade">{items.point}</div>
		                                    <div className="enrollment">{items.enrollment}</div>
		                                    </Link>
		                                </div>
	                            	</div>
			                    )}
			                </div>
	                    </div>
            	</div>
			</div>

	    );
	}
}

export default TopperBoard;
