import React, { Component } from 'react';
import _ from 'underscore';
import DBA from './dba.js';
import Info from './info.js';
import {withRouter} from 'react-router-dom'

class Search extends Component {
   	constructor(props) {
    	super(props);
	    this.onChangeSearch = this.onChangeSearch.bind(this);
	    this.autoComplateSelect = this.autoComplateSelect.bind(this);
	    this.state = {
      		studentSearchText: '',
      		studentLink : '',
    	};
    	this.data = [''];
    	this.dba = new DBA();
    	this.info = new Info();
  	}
  	componentDidMount() {
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
  	onChangeSearch (event) {
  		this.setState({
      		studentSearchText: event.target.value
    	});
    	
    	if (event.target.value.length >= 3) {

	  		var self = this;
	    	this.dba.studentSearch(event.target.value).then(function (response) {
				_.each(response.data,function(data){
					var line = self.info.icons[data['branch']] + data['enrollment'] + " | " +data['name'];
					if(self.data.indexOf(line) === -1)
		   				self.data.push(line);
		    	});
		    	window.$('.mdb-autocomplete').trigger("keyup");
			})
			.catch(function (error) {
			    console.log(error);
			});
    	} 
  	}
  	render() {
	    return (
		    <div className="container">
		        <div className="row">
		            <div className="card searchcomponent z-depth-1">
		                <div className="card-block" style={{padding : '15px 0 15px 0'}}>
		                    <div className="container dashboard">
		                        <div className="row">
		                            <div className="col-md-12">
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
