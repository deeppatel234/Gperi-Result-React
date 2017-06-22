import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Batch from './batch.js';
import Student from './student.js';
import NoMatch from './nomatch.js';
import { BrowserRouter as Router, Route, Link, HashRouter} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import './css/index.css';

ReactDOM.render(
    <HashRouter>
   		<div>
	        <nav className="navbar navbar-fixed-top navbar-dark bg-app">
	          <div className="container bg-font">
	              <div className="row">
	                  <div className="col-md-2 logos"><Link to="/">GPERI RESULT</Link></div>
	              </div>
	              <div className="row" style={{marginTop : '10px'}}>
	                  <div className="col-md-3">
	                  	<Link to="/batch/computer"><i className="fa fa-laptop"></i>COMUTER ENGINEERING</Link>
	                  </div>
	                  <div className="col-md-3">
	                  	<Link to="/batch/civil"><i className="fa fa-building-o"></i>CIVIL ENGINEERING</Link>
	                  </div>
	                  <div className="col-md-3">
	                  	<Link to="/batch/electrical"><i className="fa fa-bolt"></i>ELECTRICAL ENGINEERING</Link>
	                  </div>
	                  <div className="col-md-3">
	                  	<Link to="/batch/mechanical"><i className="fa fa-cog"></i>MECHANICAL ENGINEERING</Link>
	                  </div>
	              </div>
	          </div>
	        </nav>
	    	<Route exact path="/" component={App}/>
	    	<Route path="/batch/:id" component={Batch}/>
	    	<Route path="/student/:id" component={Student}/>
	    	<Route path="*" component={NoMatch}/>
    	    <footer className="page-footer bg-app center-on-small-only">
		        <div className="container-fluid">
		            <div className="row">
		                <div className="col-md-6">
		                    <h5 className="title">Footer Content</h5>
		                    <p>Here you can use rows and columns here to organize your footer content.</p>
		                </div>
		                <div className="col-md-6">
		                    <h5 className="title">Links</h5>
		                    <ul>
		                        <li><a href="#!">Link 1</a></li>
		                        <li><a href="#!">Link 2</a></li>
		                    </ul>
		                </div>
		            </div>
		        </div>
		        <div className="footer-copyright">
		            <div className="container-fluid">
		                <i className="fa fa-copyright" aria-hidden="true"></i> 2017 Copyright: <a href="https://www.MDBootstrap.com"> Deep Patel </a>
		            </div>
		        </div>
		    </footer>
      	</div>
    </HashRouter>
	, document.getElementById('root'));
registerServiceWorker();
