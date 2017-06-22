import React, { Component } from 'react';
import _ from 'underscore';
import DBA from './dba.js';
import Search from './search.js';
import { Route, Link } from 'react-router-dom'

class Student extends Component {
   	constructor(props) {
    	super(props);
      this.state = {
          studentData : [],
          name :[],
          enrollment : [],
          batch : [],
          cgpa : [],
          spi : [],
          cpi : [],
          branch : []
      }
      this.icons = {
        "COMPUTER ENGINEERING" : 'fa fa-laptop',
        "MECHANICAL ENGINEERING" : 'fa fa-cog',
        "ELECTRICAL ENGINEERING" :'fa fa-bolt',
        "CIVIL ENGINEERING" : 'fa fa-building-o',
      };
    	this.dba = new DBA();
      this.enrollment = this.props.match.params.id;
      this.renderSpiGraph = this.renderSpiGraph.bind(this);
      this.backlogGraph = this.backlogGraph.bind(this);
  	}
   	componentWillMount() {
  	}
  	componentDidMount() {
        var self = this;
        this.dba.studentInformation(this.enrollment).then(function (response) {
            let data = _.sortBy(response.data, 'sem').reverse();
            console.log("data", data);
            let cgpa = data[0].cgpa ? data[0].cgpa.toFixed(2) : "0.00";
            self.setState({
                studentData : data,
                name : data[0].name,
                enrollment : data[0].enrollment,
                batch : data[0].batch + " BATCH",
                cgpa : cgpa,
                spi : data[0].spi.toFixed(2),
                cpi : data[0].cpi.toFixed(2),
                branch : data[0].branch
            });
            self.regular = [];
            self.remedial = [];
            self.backlogData = {};
            self.spiData = {};
            _.each(data,function(data){
                if (data.sem.indexOf("Remedial") != -1) {
                   self.remedial.push(data);
                } else {
                   self.regular.push(data);
                   self.spiData[data.sem[7]] = data.spi;
                   self.backlogData[data.sem[7]] = data.currentsemblock;
                }
            });
            self.renderSpiGraph();
            self.backlogGraph();
        })
        .catch(function (error) {
            console.log(error);
        });
  	}
    renderSpiGraph () {
        var self = this;
        _.each(_.range(8),function(i){
            if(!self.spiData[i+1]) {
                self.spiData[i+1] = 0;
            }
        });
        let ctx = window.$("#spiGraphs");
        let myChart = new window.Chart(ctx, {
           type: 'bar',
           data: {
               labels: ["SEM 1", "SEM 2", "SEM 3", "SEM 4", "SEM 5", "SEM 6", "SEM 7", "SEM 8"],
               datasets: [{
                   label: 'SPI ',
                   data: _.values(self.spiData),
                   backgroundColor: [
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                       'rgba(255, 206, 86, 0.2)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)',
                       'rgba(255, 99, 132, 0.2)',
                       'rgba(54, 162, 235, 0.2)',
                   ],
                   borderColor: [
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                       'rgba(255, 206, 86, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)',
                       'rgba(255,99,132,1)',
                       'rgba(54, 162, 235, 1)',
                   ],
                   borderWidth: 1
               }]
           },
           options: {
               scales: {
                   yAxes: [{
                       ticks: {
                           beginAtZero: true,
                           max: 10
                       }
                   }]
               }
           }
       });
    }
    backlogGraph () {
        var self = this;
        _.each(_.range(8),function(i){
            if(!self.backlogData[i+1]) {
                self.backlogData[i+1] = 0;
            }
        });
        let backlogGraph = window.$('#backlogGraphs');
        let data = {
            labels: ["SEM 1", "SEM 2", "SEM 3", "SEM 4", "SEM 5", "SEM 6", "SEM 7", "SEM 8"],
            datasets: [{
                label: "Backlog",
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',

                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: _.values(self.backlogData),
                spanGaps: false,
            }]
        };

        let myLineChart = new window.Chart(backlogGraph, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value) {
                                if (value % 1 === 0) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            }
        });
    }
  	render() {
	    return (
		    <div>
           {/* <Search/>*/}
		        <div className="container studentinfo">
              <div className="row">
                <div className="col-md-12 card z-depth-1 studentheader">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-1 branchlogo">
                              <i className={this.icons[this.state.branch]} aria-hidden="true"></i>
                          </div>
                          <div className="col-md-6">
                              <div className="enrollment">{this.state.enrollment}</div>
                              <div className="name">{this.state.name}</div>
                          </div>
                          <div className="col-md-5" style={{position: 'relative'}}>
                              <div className="details">{this.state.batch} | CGPA : {this.state.cgpa} | SPI : {this.state.spi} | CPI : {this.state.cpi}</div>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="col-md-12 graphs">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-6 spigraph">
                              <div className="card z-depth-1">
                                  <h4 className="card-title">SPI Graph</h4>
                                  <div className="card-text">
                                      <canvas id="spiGraphs" width="500" height="250"></canvas>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-6 backloggraph">
                              <div className="card z-depth-1">
                                  <h4 className="card-title">Backlog Graph</h4>
                                  <div className="card-text">
                                      <canvas id="backlogGraphs" width="500" height="250"></canvas>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="col-md-12 regular">
                <div className="card z-depth-1">
                    <div className="card-title">Regular Exams</div>
                    <div className="regularresult">
                        <div className="accordion" id="accordion" role="tablist" aria-multiselectable="true">
                            <div className="card">
                                <div className="card-header" role="tab" id="headingOne">
                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <h5 className="mb-0">
                                            Collapsible Group Item #1 <i className="fa fa-angle-down rotate-icon"></i>
                                        </h5>
                                    </a>
                                </div>
                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                    <div className="card-block">
                                        aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" role="tab" id="headingTwo">
                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <h5 className="mb-0">
                                            Collapsible Group Item #2 <i className="fa fa-angle-down rotate-icon"></i>
                                        </h5>
                                    </a>
                                </div>
                                <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div className="card-block">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life 
                                    </div>
                                </div>
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

export default Student;
