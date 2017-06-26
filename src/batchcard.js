import React, { Component } from 'react';
import _ from 'underscore';
import DBA from './dba.js';
import Info from './info.js';
import { Link } from 'react-router-dom';
import Loading from './loading.js';

class BatchCard extends Component {

	constructor(props) {
    	super(props);
        this.dba = new DBA();
        this.info = new Info();
        this.fetchData = this.fetchData.bind(this);
        this.renderGraph = this.renderGraph.bind(this);
        this.state = {
            isLoading : 1
        }
	}
 	componentWillMount() {

	}
	componentWillReceiveProps (nextProps) {
        this.fetchData(nextProps);
	}
	componentDidMount() {
        this.fetchData(this.props);
	}
    fetchData (params) {
        var maxSem = _.max(params.data, function(d){ return d.sem.replace("BE SEM ","")[0]; }).sem.replace("BE SEM ","")[0];
        var self  = this;
        self.dba.batchTop(this.info.branchDetail[params.branch].name,params.batch,maxSem).then(function(response) {
            if (response.data.cgpa[0].cgpa === undefined) {
                response.data.cgpa = [];
            }
            self.setState({
                'batch' : params.batch,
                'sem' : _.sortBy(_.map(_.pluck(params.data, 'sem'), function(sem){ return sem.replace("BE SEM ","")[0] }),function(num){return num}),
                'branch' : params.branch,
                 top : response.data,
                 isLoading : 0
            });
            self.renderGraph(params);
        });
    }
    renderGraph (params) {
        var self = this;
        if(this.batchGraphObject) {
            self.batchGraphObject.destroy();
        }

        var passData = {};
        _.each(params.pass,function(p){
            passData[p._id.sem.replace("BE SEM ","")[0]] = p.pass;
        });
        var failData = {};
        _.each(params.fail,function(f){
            failData[f._id.sem.replace("BE SEM ","")[0]] = f.fail;
        });

        _.each(_.range(8),function(i){
            if(!passData[i+1]) {
                passData[i+1] = 0;
            }
            if(!failData[i+1]) {
                failData[i+1] = 0;
            }
        });

        var options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                    }
                }]
            }
        }

        var data = 
            {
              labels: ["SEM 1", "SEM 2", "SEM 3", "SEM 4", "SEM 5", "SEM 6", "SEM 7", "SEM 8"],
              datasets: [
                {
                  label: "Pass",
                  backgroundColor: '#81C784',
                  data: _.values(passData)
                }, {
                  label: "Fail",
                  backgroundColor: "#E57373",
                  data: _.values(failData)
                }
              ]
            };
        
        this.batchGraphObject = new window.Chart(document.getElementById("batchGraph" + this.state.batch), {
            type: 'bar',
            data: data,
            options: options
        });
    }
	render() {

        if (this.state.isLoading === 1) {
            return <Loading />
        }

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
                                                <a className="nav-link active" data-toggle="tab" href={"#batchgraph"+this.state.batch} role="tab"><i className="fa fa-bar-chart"></i> Graph</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href={"#batchtopper"+this.state.batch} role="tab"><i className="fa fa-trophy"></i> Topper</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade in show active" id={"batchgraph"+this.state.batch} role="tabpanel" style={{height: '250px'}}>
                                <div className="batchgraph">
                                    <canvas id={"batchGraph" + this.state.batch} style={{display: 'block' , width: '500px' , height: '250px'}} width="500" height="250"></canvas>
                                </div>
                            </div>
                            <div className="tab-pane fade in show " id={"batchtopper"+this.state.batch} role="tabpanel" style={{minHeight: '215px'}}>
                                <div className="container">
                                    <div className="row" style={{marginTop: '35px'}}>
                                        {
                                            this.state.top.cgpa.map( (key,index) => {
                                                return (
                                                    <div className="box" key={index}>
                                                        <div className="trophy">
                                                            <Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" ><i className={"fa fa-trophy " + this.info.trophy[index+1]} aria-hidden="true"></i></Link>
                                                        </div>
                                                        <div>
                                                            <div className="matrix"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >CGPA</Link></div>
                                                            <div className="grade"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >{this.info.round(key.cgpa)}</Link></div>
                                                            <div className="enrollment"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >{key.enrollment}</Link></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="row" style={{marginTop: '35px'}}>
                                        {
                                            this.state.top.cpi.map( (key,index) => {
                                                return (
                                                    <div className="box" key={index}>
                                                        <div className="trophy">
                                                            <Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" ><i className={"fa fa-trophy " + this.info.trophy[index+1]} aria-hidden="true"></i></Link>
                                                        </div>
                                                        <div>
                                                            <div className="matrix"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >CPI</Link></div>
                                                            <div className="grade"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >{this.info.round(key.cpi)}</Link></div>
                                                            <div className="enrollment"><Link to={"student/"+key.enrollment} className="brandColorfont" target="_blank" >{key.enrollment}</Link></div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
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
