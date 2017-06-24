import React, { Component } from 'react';
import DBA from './dba.js';

class Loading extends Component {

	constructor(props) {
    	super(props);
    	this.dba = new DBA();
	}
 	componentWillMount() {

	}
	componentWillReceiveProps (nextProps) {

	}
	componentDidMount() {
	}
	render() {
	    return (
        <div style={{width : '100%' , height : '400px'}}>
	        <div className="preloader-wrapper big active" style={{top : '150px' , left : '45%'}}>
                <div className="spinner-layer spinner-blue">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-red">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-yellow">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>

                <div className="spinner-layer spinner-green">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
          </div>   
        </div> 
	    );
	}
}

export default Loading;
