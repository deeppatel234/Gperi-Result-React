import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

    render() {
        return (
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
        );
    }
}

export default Header;
