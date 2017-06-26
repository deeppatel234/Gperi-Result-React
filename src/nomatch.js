import React, { Component } from 'react';
import DBA from './dba.js';
import image from './img/notfound.png';
import './css/nomatch.css';


class NoMatch extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();

    	this.state = {
    		errorMessage : this.props.errorMessage ? this.props.errorMessage : "i am sorry",
    		extraInfo : this.props.extraInfo ? this.props.extraInfo : ""
    	}
  	}
	render() {
	    return (
			<div>
				<div className="mainNotFoundDiv">
					<div className="div-content">
						<img className="logo-404" src={image} alt=""/>
						<h2 className="title-404">{this.state.errorMessage}</h2>
						<h4 className="extraInfo">{this.state.extraInfo}</h4>
					</div>
				</div>
			</div>
	    );
	}
}

export default NoMatch;
