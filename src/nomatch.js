import React, { Component } from 'react';
import DBA from './dba.js';
import image from './img/notfound.png';
import './css/nomatch.css';


class NoMatch extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();
  	}
	render() {
	    return (
			<div>
				<div className="mainNotFoundDiv">
					<div className="div-content">
						<img className="logo-404" src={image} alt=""/>
						<h2 className="title-404">I am Sorry</h2>
					</div>
				</div>
			</div>
	    );
	}
}

export default NoMatch;
