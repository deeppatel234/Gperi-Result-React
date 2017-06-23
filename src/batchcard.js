import React, { Component } from 'react';
import _ from 'underscore';
import { Link } from 'react-router-dom'

class BatchCard extends Component {

	constructor(props) {
    	super(props);

        this.state = {
            'batch' : this.props.batch,
            'sem' : _.sortBy(_.map(_.pluck(this.props.data, 'sem'), function(sem){ return sem.replace("BE SEM ","")[0] }),function(num){return num}),
            'branch' : this.props.branch
        }
	}
 	componentWillMount() {

	}
	componentWillReceiveProps (nextProps) {
		this.setState({
            'batch' : nextProps.batch,
            'sem' : _.sortBy(_.map(_.pluck(nextProps.data, 'sem'), function(sem){ return sem.replace("BE SEM ","")[0] }),function(num){return num}),
            'branch' : nextProps.branch
        });
	}
	componentDidMount() {
    
	}
	render() {
	    return (
		        <div className="col-md-6 batchview">
                <div className="card z-depth-1">
                    <div className="card-block">
                        <div className="card-tital">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4" style={{paddingLeft: '0px'}}>
                                        <h4>Batch {this.state.batch}</h4>
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="nav nav-tabs md-pills pills-ins" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#panel11" role="tab"><i className="fa fa-bar-chart"></i> Graph</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#panel12" role="tab"><i className="fa fa-trophy"></i> Topper</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sembuttons">
                            <span className="semtext">Sem </span>
                            {
                                this.state.sem.map((sem,index) => {
                                    return <Link to={"/sem/"+this.state.branch+"/"+this.state.batch+"/"+sem} key={index} className="btn-floating btn-small"><span className="semnumber">{sem}</span></Link>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
	    );
	}
}

export default BatchCard;
