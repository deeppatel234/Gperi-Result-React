import React, { Component } from 'react';
import DBA from './dba.js';
import _ from 'underscore';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

class ResultPanel extends Component {

    constructor(props) {
        super(props);
        this.dba = new DBA();
 
        this.printPoint = this.printPoint.bind(this);
        this.renderDataTable = this.renderDataTable.bind(this);
        this.round = this.round.bind(this);
 
        var type = this.props.type;
        var resultData = _.filter(this.props.data, function(res) {return res.sem.toLowerCase().indexOf(type) !== -1 });
        this.state = {
            results: resultData,
            type: type,
            view: this.props.view,
            dataTable: this.props.dataTable ? this.props.dataTable : false
        }
        this.typeConfig = {
            'regular': {
                name: "Regular Exam"
            },
            'remedial': {
                name: "Remedial Exam"
            }
        }
    }
    componentWillMount() {

    }
    renderDataTable (results) {
      var dataTable = $('#resultDataTable');
      $('.dataTableHeader').append("<tr></tr>");
      var dataTableHeader = $('.dataTableHeader tr');
      var dataTableBody = $('.dataTableBody');

      dataTableHeader.append('<th>Rank</th>');
      dataTableHeader.append('<th>Enrollment</th>');
      dataTableHeader.append('<th>Name</th>');
      _.each(results[0].subject,function(subjects){
          dataTableHeader.append('<th>'+subjects.name+'</th>');
      });
      var subjectsLength = results[0].subject.length;
      dataTableHeader.append('<th>SPI</th>');
      dataTableHeader.append('<th>CPI</th>');
      var raw;
      var self = this;
      var sortedResult = _.sortBy(results, function(student){ return student.spi }).reverse();
      _.each(sortedResult,function(student,index){
          if(student.subject.length === subjectsLength) {
            raw = $("<tr></tr>");
            raw.append('<td>'+(index+1)+'</td>');
            raw.append('<td>'+student.enrollment+'</td>');
            raw.append('<td>'+student.name+'</td>');
              _.each(student.subject,function(subject){
                
                  raw.append('<td>'+subject.subjectgrade+'</td>');
              });
            raw.append('<td>'+self.round(student.spi)+'</td>');
            raw.append('<td>'+self.round(student.cpi)+'</td>');
            dataTableBody.append(raw);
          }
      });
      this.dataTableObject = dataTable.DataTable();
    }
    componentWillReceiveProps(nextProps) {
        var type = nextProps.type;
        var resultData = _.filter(nextProps.data, function(res) {return res.sem.toLowerCase().indexOf(type) !== -1 });
        this.setState({
            results: resultData,
            type: type,
            view: nextProps.view,
            dataTable: nextProps.dataTable ? nextProps.dataTable : false
        });
        if(this.state.dataTable && this.dataTableObject) {
          this.dataTableObject.destroy();
          $('#resultDataTable').empty();
          $('#resultDataTable').append($("<thead></thead>").addClass('dataTableHeader'));
          $('#resultDataTable').append($("<tbody></tbody>").addClass('dataTableBody'));
          this.renderDataTable(resultData);
        }
    }
    componentDidMount() {
      if(this.state.dataTable) {
        this.renderDataTable(this.state.results);
      }
    }
    printPoint(text, point) {
        if (text === "CGPA") {
            text = " | " + text;
        }
        if (point) {
            return text + " : " + point.toFixed(2);
        } else {
            return text + " : 0.00";
        }
    }
    round (point) {
      if(point) {
        return point.toFixed(2);
      } else {
        return "0.00";
      }
    }
    render() {
        if (this.state.results.length === 0) {
            return <div></div>
        }

        function ResultTemplate(props) {
            return (
                <div className="regularresult">
                    <div className="accordion" id={"accordion" + props.type} role="tablist" aria-multiselectable="true">
                        {
                          props.results.map( (key,index) => {
                              return (
                                <div className="card" key={index}>
                                    <div className="card-header" role="tab" id={"heading" + props.type + index}>
                                        <a data-toggle="collapse" data-parent={"#accordion" + props.type} href={"#collapse"+ props.type + index} aria-expanded="false" aria-controls="collapseOne">
                                            <h5 className="mb-0">
                                                {
                                                  props.view === "sem" ? <div>{key.enrollment} | {key.name} <div style={{display: 'inline' , float: 'right'}}><span style={{paddingRight : '10px'}}>{props.printPoint("SPI",key.spi)}</span>   <i className="fa fa-angle-down  rotate-icon"></i></div></div> :
                                                  <div>{key.sem} <div style={{display: 'inline' , float: 'right'}}><span style={{paddingRight : '10px'}}>{props.printPoint("SPI",key.spi)}</span> <i className="fa fa-angle-down  rotate-icon"></i></div></div>
                                                }
                                                
                                            </h5>
                                        </a>
                                    </div>
                                    <div id={"collapse"+ props.type + index} className="collapse" role="tabpanel" aria-labelledby={"heading" + props.type + index}>
                                        <div className="card-block" style={{overflow: 'auto'}}>
                                            {
                                              props.view === "sem" ? <Link to={"student/"+key.enrollment} target="_blank" className="brandTextColor"><i className="fa fa-user-o"></i> Get Details</Link> : ""
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
                                                  <div className="alert alert-success" style={{overflow: 'auto'}}>Current Sem Backlog : {key.currentsemblock}<div style={{display: 'inline',float : 'right'}}>{props.printPoint("SPI",key.spi)} | {props.printPoint("CPI",key.cpi)} {props.printPoint("CGPA",key.cgpa)}</div></div> :
                                                  <div className="alert alert-danger" style={{overflow: 'auto'}}>Current Sem Backlog : {key.currentsemblock}<div style={{display: 'inline',float : 'right'}}>{props.printPoint("SPI",key.spi)} | {props.printPoint("CPI",key.cpi)} {props.printPoint("CGPA",key.cgpa)}</div></div>
                                              }
                                        </div>
                                    </div>
                                </div>
                              )
                          })
                        }
                    </div>
                </div>
            );
        }

        return (
          <div className="col-md-12 regular">
            <div className="container" style={{paddingLeft: '0px' , paddingRight: '0px'}}>
              <div className="row">
                  <div className="col-md-12">
                      <div className="card z-depth-1">
                          <div className="card-title">{this.typeConfig[this.state.type].name}</div>
                          {
                            this.state.dataTable ? 
                              <div>
                                <ul className="nav nav-tabs md-pills pills-ins" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#listView" role="tab"><i className="fa fa-list"></i> List</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#dataTableView" role="tab"><i className="fa fa-table"></i> Table</a>
                                    </li>
                                </ul>
                                <div className="tab-content" style={{ padding: '8px 0 0 0'}}>
                                    <div className="tab-pane fade in show active" style={{overflow: 'auto'}} id="listView" role="tabpanel">
                                        <ResultTemplate type={this.state.type} results={this.state.results} view={this.props.view} printPoint={this.printPoint}/>
                                    </div>
                                    <div className="tab-pane fade" id="dataTableView" role="tabpanel" style={{overflow: 'auto'}}>
                                        <table id="resultDataTable" className="table table-striped table-bordered">
                                          <thead className="dataTableHeader">

                                          </thead>
                                          <tbody className="dataTableBody">
                                            
                                          </tbody>
                                        </table>
                                    </div>
                                </div>                        
                              </div>
                            : 
                            <ResultTemplate type={this.state.type} results={this.state.results} view={this.props.view} printPoint={this.printPoint}/>
                          }
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ResultPanel;
