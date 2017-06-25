import React, { Component } from 'react';
import DBA from './dba.js';
import ResultPanel from './resultpanel.js';
import Loading from './loading.js'
import _ from 'underscore';
import Info from './info.js';
import { Link } from 'react-router-dom';

class Sem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branch: "",
            batch: "",
            sem: "",
            backlog: { pass: 0, fail: 0 },
            ratio: 0,
            top: {},
            grade: {},
            results: {},
            isLoading : 1,
        }
        this.dba = new DBA();
        this.info = new Info();
        this.fetchData = this.fetchData.bind(this);
        this.backlogGraph = this.backlogGraph.bind(this);
        this.subjectClick = this.subjectClick.bind(this);
        this.drawSubjectGraph = this.drawSubjectGraph.bind(this);
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.sem !== this.state.sem || nextProps.match.params.batch !== this.state.batch || nextProps.match.params.branch !== this.state.branch) {
          this.fetchData(nextProps.match.params);
        }
    }
    componentDidMount() {
        this.fetchData(this.props.match.params);
    }
    fetchData(params) {
        var self = this;
        this.dba.semData(this.info.branchDetail[params.branch].name, params.batch, params.sem).then(function(response) {
            let top = _.last(_.sortBy(response.data, "spi", true), 10).reverse();
            let backlog = { pass: 0, fail: 0, ratio: 0 };
            _.each(response.data, function(value) {
                if (value.currentsemblock !== 0) {
                    backlog["fail"]++;
                } else {
                    backlog["pass"]++;
                }
            });
            let grade = {};
            _.each(response.data, function(value) {
                _.each(value.subject, function(sub) {
                    if (!grade[sub.name]) {
                        grade[sub.name] = { grades: { AA: 0, AB: 0, BB: 0, BC: 0, CC: 0, CD: 0, DD: 0, FF: 0 }, name: sub.name }
                    }
                    grade[sub.name]['grades'][sub.subjectgrade]++;
                });
            });
            self.setState({
                branch: params.branch,
                batch: params.batch,
                sem: params.sem,
                top: top,
                grade: _.values(grade),
                backlog: backlog,
                results: response.data,
                ratio: ((backlog.pass / (backlog.pass + backlog.fail)) * 100).toFixed(2),
                isLoading : 0
            });
            self.backlogGraph();
            self.drawSubjectGraph(0);
        });
    }
    backlogGraph() {
        var self = this;
        if(this.backlogGraphObject) {
            self.backlogGraphObject.destroy();
        }

        var data = {
            labels: [
                "Pass",
                "Fail",
            ],
            datasets: [{
                data: _.values(this.state.backlog),
                backgroundColor: [
                    "#56ff7d",
                    "#FF6384",
                ],
                hoverBackgroundColor: [
                    "#56ff7d",
                    "#FF6384",
                ]
            }]
        };
        this.backlogGraphObject = new window.Chart(document.getElementById("totalbacklogGraph"), {
            type: 'pie',
            data: data,
            options: {
                animation: {
                    animateScale: true
                }
            }
        });
    }
    subjectClick(event) {
        let key = event.currentTarget.getAttribute('data-sub');
        this.drawSubjectGraph(key);
    }
    drawSubjectGraph(key) {
        if (this.subjectGraphObj) {
            this.subjectGraphObj.destroy();
        }
        this.subjectGraphObj = new window.Chart(document.getElementById("subjectGraphViewGraph"), {
            type: 'bar',
            data: {
                labels: ["AA", "AB", "BB", "BC", "CC", "CD", "DD", "FF"],
                datasets: [{
                    label: 'Grades ',
                    data: _.values(this.state.grade[key].grades),
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255,99,132,1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
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

      return (
        <div className="container semesterview">
          <div className="row">
                          <div className="col-md-12">
              <div className="card z-depth-1 semheader">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-1 branchlogo">
                              <i className={this.info.branchDetail[this.state.branch].logo} ></i>
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
            <div className="col-md-12">
                <div className="container" style={{paddingLeft: '0px' , paddingRight: '0px'}}>
                    <div className="row">
                        <div className="col-md-6" style={{paddingRight: '7px'}}>
                            <div className="card z-depth-1 topper">
                                <div className="card-title">
                                    Top 10 Students
                                </div>
                                <div className="container" style={{ paddingRight : '0px' , paddingLeft : '25px'}}>
                                    <div className="row">
                                        {
                                            this.state.top.length > 0 ?
                                              _.range(3).map( (key,index) => {
                                                  return ( 
                                                  <div className="box" key={index}>
                                                      <div className="trophy">
                                                          <i className={"fa fa-trophy " + this.info.trophy[index+1]}></i>
                                                      </div>
                                                      <div style={{paddingTop: '12px'}}>
                                                          <div className="matrix">SPI</div>
                                                          <div className="grade">{this.state.top[index].spi.toFixed(2)}</div>
                                                          <div className="enrollment">{this.state.top[index].enrollment}</div>
                                                      </div>
                                                  </div>)
                                              })
                                            : ""
                                        } 
                                    </div>
                                    <div className="row">
                                        <table className="table table-sm" style={{ maxWidth: '97%'}}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Enrollment</th>
                                                    <th>SPI</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                  this.state.top.length > 0 ?
                                                    _.range(10).map( (key,index) => {
                                                        return ( 
                                                        <tr key={index}>
                                                          <th scope="row">{index+1}</th>
                                                          <td>{this.state.top[index].name}</td>
                                                          <td><Link to={"student/"+this.state.top[index].enrollment} className="tabletd" target="_blank" >{this.state.top[index].enrollment}</Link></td>
                                                          <td>{this.state.top[index].spi.toFixed(2)}</td>
                                                        </tr>)
                                                    })
                                                  : ""
                                                }  
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ paddingLeft : '7px'}}>
                            <div className="card z-depth-1 semgraph">
                                <div className="card-title">
                                    Overall Result Graph
                                </div>
                                <div className="backgraph">
                                    <canvas id="totalbacklogGraph" style={{display: "block", width: "100%" , height: "100%"}} width="700" height="450"></canvas>
                                </div>
                            </div>
                            <div className="card z-depth-1 semratio">
                                <div className="card-title">
                                    <i className="fa fa-check"></i> Pass : {this.state.backlog.pass}
                                    <br/> <i className="fa fa-times"></i> Fail : {this.state.backlog.fail}
                                    <br/> <i className="fa fa-percent" /> Overall Result : {this.state.ratio} %
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="card z-depth-1 subjectgraph">
                    <div className="card-title">
                        Subject Wise Result
                    </div>
                    <div>
                        <ul className="nav nav-tabs md-pills pills-ins" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#panel11" role="tab"><i className="fa fa-bar-chart"></i> Graph</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#panel12" role="tab"><i className="fa fa-table"></i> Table</a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane fade in show active" id="panel11" role="tabpanel">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4">
                                        {
                                          this.state.grade.length > 0 ?
                                            this.state.grade.map( (key,index) => {
                                                return ( 
                                                  <button className="btn subjectname" onClick={this.subjectClick} key={index} data-sub={index}>{key.name}</button>
                                                )
                                            })
                                          : ""
                                        }
                                        </div>
                                        <div className="col-md-8">
                                            <canvas id="subjectGraphViewGraph"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="panel12" role="tabpanel">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Subject Name</th>
                                            <th>AA</th>
                                            <th>AB</th>
                                            <th>BB</th>
                                            <th>BC</th>
                                            <th>CC</th>
                                            <th>CD</th>
                                            <th>DD</th>
                                            <th>FF</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                          this.state.grade.length > 0 ?
                                            this.state.grade.map( (key,index) => {
                                                return ( 
                                                  <tr key={index}>
                                                    <td>{key.name}</td>
                                                      {_.values(key.grades).map( (key,index) => {
                                                          return <td key={index}>{key}</td>
                                                      })}
                                                  </tr>
                                                )
                                            })
                                          : ""
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResultPanel data={this.state.results} type="regular" view="sem" dataTable="true"/>
            <ResultPanel data={this.state.results} type="remedial" view="sem"/>
          </div>
        </div>
      );
    }
}

export default Sem;
