import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './dashboard.js';
import Batch from './batch.js';
import Student from './student.js';
import NoMatch from './nomatch.js';
import Sem from './sem.js';
import Header from './header.js';
import Footer from './footer.js';
import { Route, HashRouter, Switch} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
   		<div>
   			<Header />
			<Switch>
				<Route exact path="/" component={Dashboard}/>
				<Route path="/batch/:id" component={Batch}/>
				<Route path="/student/:id" component={Student}/>
				<Route path="/sem/:branch/:batch/:sem" component={Sem}/>
				<Route path="*" component={NoMatch}/>
			</Switch>
	    	<Footer />
      	</div>
    </HashRouter>
	, document.getElementById('root'));
registerServiceWorker();
