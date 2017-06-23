import React, { Component } from 'react';
import DBA from './dba.js';
import _ from 'underscore';

class Sem extends Component {

	constructor(props) {
    	super(props);
      this.state = {
          branch : this.props.match.params.branch,
          batch : this.props.match.params.batch,
          sem : this.props.match.params.sem,
      }
    	this.dba = new DBA();

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
  	}
   	componentWillMount() {

  	}
  	componentWillReceiveProps (nextProps) {
      console.log("nextProps", nextProps);
      this.setState({
          branch : nextProps.match.params.branch,
          batch : nextProps.match.params.batch,
          sem : nextProps.match.params.sem,
      });
  	}
  	componentDidMount() {
  	}
	render() {
	    return (
	        <div className="container semesterview">
            <div className="row">
              <div className="col-md-12">
                <div className="card z-depth-1 semheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1 branchlogo">
                                <i className={this.branchDetail[this.state.branch].logo} ></i>
                            </div>
                            <div className="col-md-6">
                                <div className="sem">SEM {this.state.sem}</div>
                                <div className="batch">{this.state.batch} BATCH</div>
                            </div>
                            <div className="col-md-3">
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

export default Sem;
