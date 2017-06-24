import React, { Component } from 'react';
import DBA from './dba.js';
import _ from 'underscore';
import { Link } from 'react-router-dom'

class ResultPanel extends Component {

    constructor(props) {
        super(props);
        this.dba = new DBA();
        var type = this.props.type;
        var resultData = _.filter(this.props.data,function(res) { return res.sem.toLowerCase().indexOf(type) != -1});
        this.state = {
           results : resultData,
           type : type,
           view : this.props.view
        }

        this.typeConfig = {
          'regular' : {
            name : "Regular Exam"
          },
          'remedial' : {
            name : "Remedial Exam"
          }
        }

      this.printPoint = this.printPoint.bind(this);
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        var type = nextProps.type;
        var resultData = _.filter(nextProps.data,function(res) { return res.sem.toLowerCase().indexOf(type) != -1});
        this.setState({
           results : resultData,
           type : type,
           view : nextProps.view
        });
    }
    componentDidMount() {}
    printPoint (text, point) {
      if (text === "CGPA") {
        text = " | " + text;
      }
      if ( point ) {
        return text + " : " + point.toFixed(2);
      } else {
        return text + " : 0.00";
      }
    }
    render() {
        if (this.state.results.length == 0) {
          return <div></div>
        }
        return (
          <div className="col-md-12 regular">
            <div className="container" style={{paddingLeft: '0px' , paddingRight: '0px'}}>
              <div className="row">
                  <div className="col-md-12">
                    <div className="card z-depth-1">
                        <div className="card-title">{this.typeConfig[this.state.type].name}</div>
                        <div className="regularresult">
                            <div className="accordion" id={"accordion" + this.state.type} role="tablist" aria-multiselectable="true">
                                {
                                  this.state.results.map( (key,index) => {
                                      return (
                                        <div className="card" key={index}>
                                            <div className="card-header" role="tab" id={"heading" + this.state.type + index}>
                                                <a data-toggle="collapse" data-parent={"#accordion" + this.state.type} href={"#collapse"+ this.state.type + index} aria-expanded="false" aria-controls="collapseOne">
                                                    <h5 className="mb-0">
                                                        {
                                                          this.props.view === "sem" ? <div>{key.enrollment} | {key.name} <div style={{display: 'inline' , float: 'right'}}><span style={{paddingRight : '10px'}}>{this.printPoint("SPI",key.spi)}</span>   <i className="fa fa-angle-down  rotate-icon"></i></div></div> :
                                                          <div>{key.sem} <div style={{display: 'inline' , float: 'right'}}><span style={{paddingRight : '10px'}}>{this.printPoint("SPI",key.spi)}</span> <i className="fa fa-angle-down  rotate-icon"></i></div></div>
                                                        }
                                                        
                                                    </h5>
                                                </a>
                                            </div>
                                            <div id={"collapse"+ this.state.type + index} className="collapse" role="tabpanel" aria-labelledby={"heading" + this.state.type + index}>
                                                <div className="card-block">
                                                    {
                                                      this.props.view === "sem" ? <Link to={"student/"+key.enrollment} target="_blank" className="brandTextColor"><i className="fa fa-user-o"></i> Get Details</Link> : ""
                                                    }
                                                    <table className="table table-bordered table-hover">
                                                        <thead>
                                                          <tr>
                                                            <th rowSpan="2">Subject Code</th>
                                                            <th rowSpan="2">Subject Name</th>
                                                            <th colSpan="3">Theory Grade</th>
                                                            <th colSpan="3">Practical Grade</th>
                                                            <th rowSpan="2">Subject Grade</th>
                                                          </tr>
                                                          <tr>
                                                            <th>ESE</th>
                                                            <th>PA</th>
                                                            <th>TOTAL</th>
                                                            <th>ESE</th>
                                                            <th>PA</th>
                                                            <th>TOTAL</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {
                                                            key.subject.map( (sub,index) => {
                                                                return (<tr key={index}>
                                                                    <td>{sub.code}</td>
                                                                    <td>{sub.name}</td>
                                                                    <td>{sub.theoryese}</td>
                                                                    <td>{sub.theorypa}</td>
                                                                    <td>{sub.theorytotal}</td>
                                                                    <td>{sub.practicalese}</td>
                                                                    <td>{sub.practicalpa}</td>
                                                                    <td>{sub.practicaltotal}</td>
                                                                    <td>{sub.subjectgrade}</td>
                                                                </tr> )
                                                            })
                                                          }
                                                        </tbody>
                                                      </table>
                                                      {
                                                        key.currentsemblock === 0 ?
                                                          <div className="alert alert-success">Current Sem Backlog : {key.currentsemblock}<div style={{display: 'inline',float : 'right'}}>{this.printPoint("SPI",key.spi)} | {this.printPoint("CPI",key.cpi)} {this.printPoint("CGPA",key.cgpa)}</div></div> :
                                                          <div className="alert alert-danger">Current Sem Backlog : {key.currentsemblock}<div style={{display: 'inline',float : 'right'}}>{this.printPoint("SPI",key.spi)} | {this.printPoint("CPI",key.cpi)} {this.printPoint("CGPA",key.cgpa)}</div></div>
                                                      }
                                                </div>
                                            </div>
                                        </div>
                                      )
                                  })
                                }
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

export default ResultPanel;
