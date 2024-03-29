import React, { Component } from 'react';
import _ from 'underscore';
import DBA from './dba.js';
import Loading from './loading.js';
import Info from './info.js';
import ResultPanel from './resultpanel.js';
import NoMatch from './nomatch.js';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment: "",
            isLoading : 1
        }
        this.dba = new DBA();
        this.info = new Info();
        this.renderSpiGraph = this.renderSpiGraph.bind(this);
        this.backlogGraph = this.backlogGraph.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        this.fetchData(nextProps);
    }
    componentDidMount() {
        this.fetchData(this.props);
    }
    fetchData (params) {
        if(params.match.params.id === this.state.enrollment) {
            return;
        }
        var self = this;
        this.dba.studentInformation(params.match.params.id).then(function(response) {
            
            if(response.data.length > 0) {
                let data = _.sortBy(response.data, 'sem').reverse();
                let cgpa = data[0].cgpa ? data[0].cgpa.toFixed(2) : "0.00";
                self.setState({
                    studentData: data,
                    name: data[0].name,
                    enrollment: data[0].enrollment,
                    batch: data[0].batch + " BATCH",
                    cgpa: cgpa,
                    spi: data[0].spi.toFixed(2),
                    cpi: data[0].cpi.toFixed(2),
                    branch: data[0].branch,
                    isLoading : 0,
                    studentNotFound : 0,
                });
                self.regular = [];
                self.remedial = [];
                self.backlogData = {};
                self.spiData = {};
                _.each(data, function(data) {
                    if (data.sem.indexOf("Remedial") !== -1) {
                        self.remedial.push(data);
                    } else {
                        self.regular.push(data);
                        self.spiData[data.sem[7]] = data.spi;
                        self.backlogData[data.sem[7]] = data.currentsemblock;
                    }
                });
                self.renderSpiGraph();
                self.backlogGraph();
            } else {
                self.setState({
                    studentNotFound : 1,
                    isLoading : 0,
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    renderSpiGraph() {
        var self = this;
        _.each(_.range(8), function(i) {
            if (!self.spiData[i + 1]) {
                self.spiData[i + 1] = 0;
            }
        });

        if(this.spiGraphsObject) {
            self.spiGraphsObject.destroy();
        }

        this.spiGraphsObject = new window.Chart(document.getElementById("spiGraphs"), {
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
    backlogGraph() {
        var self = this;
        _.each(_.range(8), function(i) {
            if (!self.backlogData[i + 1]) {
                self.backlogData[i + 1] = 0;
            }
        });

        if(this.backlogGraphsObject) {
            self.backlogGraphsObject.destroy();
        }
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

        this.backlogGraphsObject = new window.Chart(document.getElementById("backlogGraphs"), {
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

        if (this.state.isLoading === 1) {
            return <Loading />
        }

        if(this.state.studentNotFound === 1) {
            return <NoMatch extraInfo={this.props.match.params.id} errorMessage="student not found"/>
        }

        return (
            <div className="container studentinfo">
              <div className="row">
                <div className="col-md-12 card z-depth-1 studentheader">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-1 branchlogo">
                              <i className={this.info.iconsClass[this.state.branch]} aria-hidden="true"></i>
                          </div>
                          <div className="col-md-6">
                              <div className="enrollment">{this.state.enrollment}</div>
                              <div className="name">{this.state.name}</div>
                          </div>
                          <div className="col-md-5">
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
                <ResultPanel data={this.state.studentData} type="regular" view="student"/>
                <ResultPanel data={this.state.studentData} type="remedial" view="student"/>
                </div>
            </div>
        );
    }
}

export default Student;
