import React, { Component } from 'react';
import _ from 'underscore';
import DBA from './dba.js';
import {withRouter} from 'react-router-dom'

class Search extends Component {
   	constructor(props) {
    	super(props);
	    //this.searchStudent = this.searchStudent.bind(this);
	    this.onChangeSearch = this.onChangeSearch.bind(this);
	    this.autoComplateSelect = this.autoComplateSelect.bind(this);
	    this.state = {
      		studentSearchText: '',
      		studentLink : '',
    	};
    	this.icons = {
    		"COMPUTER ENGINEERING" : '<i class="fa fa-laptop"></i>',
    		"MECHANICAL ENGINEERING" : '<i class="fa fa-cog"></i>',
    		"ELECTRICAL ENGINEERING" :'<i class="fa fa-bolt"></i>',
    		"CIVIL ENGINEERING" : '<i class="fa fa-building-o"></i>',
    	};
    	this.data = ['abc'];
    	this.dba = new DBA();
  	}
   	componentWillMount() {
  	}
  	componentDidMount() {
    	window.$('.chips-initial').material_chip({
	        data: [{
	            tag: 'COMPUTER',
	        }, {
	            tag: 'ELECTRICAL',
	        }, {
	            tag: 'MECHENICAL',
	        }, {
	            tag: 'CIVIL',
	        }],
    	});
    	window.$('.mdb-autocomplete').mdb_autocomplete({
    		data: this.data
		});
		window.$('.mdb-autocomplete-wrap').on( "click",this.autoComplateSelect);
  	}
  	autoComplateSelect (event) {
  	    this.setState({
      		studentSearchText: window.$('#form-autocomplete').val()
    	});
    	let string = this.state.studentSearchText;
		string = "student/" + string.substr(0,string.indexOf('|'));
		this.props.history.push(string);
  	}
/*  	searchStudent () {
  		if (this.state.studentSearchText) {
  		    let string = "student/" + this.state.studentSearchText;
  		    console.log("string", string);
  		    this.props.history.push(string);
  		}
  	}*/
  	onChangeSearch (event) {
  		this.setState({
  			isLoading: true,
      		studentSearchText: event.target.value
    	});
  		var self = this;
    	this.dba.studentSearch(event.target.value).then(function (response) {
			_.each(response.data,function(data){
				var line = self.icons[data['branch']] + data['enrollment'] + " | " +data['name'];
				if(self.data.indexOf(line) == -1)
	   				self.data.push(line);
	    	});

	    	this.setState({
	    		isLoading: false
	    	})
		})
		.catch(function (error) {
		    console.log(error);
		});
  	}
  	render() {
	    return (
		    <div className="container">
		        <div className="row">
		            <div className="card searchcomponent z-depth-1">
		                <div className="card-block">
		                    <div className="container dashboard">
		                        <div className="row">
		                            <div className="col-md-11">
										<div className="md-form">
										    <input type="search" id="form-autocomplete" className="form-control mdb-autocomplete" value={this.state.studentSearchText} onChange={this.onChangeSearch}/>
										    <button className="mdb-autocomplete-clear">
										        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg">
										            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
										            <path d="M0 0h24v24H0z" fill="none" />
										        </svg>
										    </button>
										    <label className="active">Search</label>
										</div>
		                            </div>
		                            <div className="col-md-1">
		                                <button type="button" className="btn btn-default searchbtn"><i className="fa fa-search"></i></button>
		                            </div>
		                            <div className="col-md-12">
		                                <div className="chips chips-initial">
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

export default  withRouter(Search);
