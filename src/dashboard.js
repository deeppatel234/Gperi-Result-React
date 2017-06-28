import React, { Component } from 'react';
import Search from './search.js';
import DBA from './dba.js';
import './css/dashboard.css';
import _ from 'underscore';
import Info from './info.js';
import Loading from './loading.js';
import logo from './img/logo.svg';
import gperi from './img/gperi.jpg';
import batchPhoto from './img/batch.png';
import semPhoto from './img/sem.png';
import studentPhoto from './img/student.png';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.dba = new DBA();
        this.info = new Info();
        this.state = {
        	isLoading : 1,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
    	var self = this;
    	this.dba.studentCount().then(function(res){
    	    var count = {};
    	    _.each(res.data,function(b){
    	    	count[b.branch] = b.count
    	    })
	   	    self.setState({
    	    	isLoading : 0,
    	    	count: count
    	    });
    	});
    }
    render() {

    	if (this.state.isLoading === 1) {
    		return (<Loading />);
    	}

    	var self = this;
    	function BranchCard(props) {
    		return (
    			<div className="col-md-6">
                    <div className="branchCard view overlay hm-white-slight z-depth-2">
                        <h3>{props.branch}</h3>
                        <a>
                            <div className="mask waves-effect waves-light"></div>
                        </a>
                        <div>
                            <div className="batchLogoclassName">
                                <i className={self.info.iconsClass[props.branch]}></i>
                            </div>
                            <div className="studentTotal">
                                {props.count.count[props.branch]}
                            </div>
                            <div className="studentLogo">
                                <h3 style={{display: "inline"}}><i className="fa fa-user" aria-hidden="true"></i>
                                    Students</h3>
                            </div>
                        </div>
                    </div>
                </div>
    		)
    	} 

        return (
	        	  <div className="container mainDiv">
			        <div className="row">
			        	<div className="col-md-12" style={{marginBottom : '10px'}}>
			        	  	<Search />
			        	</div>
			            <div className="col-md-12">
			                <section className="section section-blog-fw">
			                    <div className="row">
			                        <div className="col-md-12">
			                            <div className="view overlay hm-white-slight">
			                                <img src={gperi} alt="gperi"/>
			                                <a>
			                                    <div className=""></div>
			                                </a>
			                            </div>
			                            <div className="jumbotron">
			                                <div className="social-counters ">
			                                    <img className="img-responsive center-block logo" src={logo} alt="logo"/>
			                                </div>
			                            </div>
			                            <div className="excerpt">
			                            </div>
			                        </div>
			                    </div>
			                    <hr className="hr-mobile"/>
			                </section>
			            </div>
			            <div className="col-md-12">
			                <section className="section">
			                    <h1 className="section-heading">Gujarat Power Engineering And Research Institute</h1>
			                    <div className="row">
			                       <BranchCard branch="COMPUTER ENGINEERING" count={this.state}/>
			                       <BranchCard branch="MECHANICAL ENGINEERING" count={this.state}/>
			                       <BranchCard branch="ELECTRICAL ENGINEERING" count={this.state}/>
			                       <BranchCard branch="CIVIL ENGINEERING" count={this.state}/>
			                    </div>
			                </section>
			            </div>
			            <div className="col-md-12">
			                <section className="section feature-box">
			                    <h1 className="section-heading">Why is it so great?</h1>
			                    <p className="section-description lead">GPERI Result is a fast, easy, reliable and automated data analytic platform.drives with advanced technology and robust data engine.</p>
			                    <div className="row features-small">
			                        <div className="col-md-7 mb-r center-on-small-only">
			                            <div id="carousel-example-2" className="carousel slide carousel-fade" data-ride="carousel" data-interval="3000">
			                                <ol className="carousel-indicators">
			                                    <li data-target="#carousel-example-2" data-slide-to="0" className="active"></li>
			                                    <li data-target="#carousel-example-2" data-slide-to="1"></li>
			                                    <li data-target="#carousel-example-2" data-slide-to="2"></li>
			                                </ol>
			                                <div className="carousel-inner" role="listbox">
			                                    <div className="carousel-item active">
			                                        <div className="view hm-black-light">
			                                            <img src={batchPhoto} alt="First slide"/>
			                                        </div>
			                                    </div>
			                                    <div className="carousel-item">
			                                        <div className="view hm-black-strong">
			                                            <img src={semPhoto} alt="Second slide"/>
			                                        </div>
			                                    </div>
			                                    <div className="carousel-item">
			                                        <div className="view hm-black-slight">
			                                            <img src={studentPhoto} alt="Third slide"/>
			                                        </div>
			                                    </div>
			                                </div>
			                                <a className="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
			                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
			                                    <span className="sr-only">Previous</span>
			                                </a>
			                                <a className="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
			                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
			                                    <span className="sr-only">Next</span>
			                                </a>
			                            </div>
			                        </div>
			                        <div className="col-md-5 center-on-small">
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-bank indigo-text"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Safety</h4>
			                                    <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"50px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-code indigo-text"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Technology</h4>
			                                    <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"50px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-bar-chart indigo-text"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Graph Repre</h4>
			                                    <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"50px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-bar-chart indigo-text"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Graph Repre</h4>
			                                    <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit maiores nam, aperiam minima assumenda deleniti hic.</p>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </section>
			            </div>
			            <div className="col-md-12">
			                <section className="section section-blog-fw">
			                    <div className="row">
			                        <div className="col-md-12">
			                            <div className="jumbotron">
			                                <h2>Gujarat Power Engineering And Research Institute</h2>
			                                <div className="social-counters ">
			                                    <div className="social-counters ">
			                                        <a className="btn btn-fb " href="https://www.facebook.com/gperi/">
			                                            <i className="fa fa-facebook left "></i>
			                                            <span className="hidden-md-down ">Facebook</span>
			                                        </a>
			                                        <a className="btn btn-gplus " href="https://www.gperi.ac.in">
			                                            <i className="fa fa-globe left "></i>
			                                            <span className="hidden-md-down ">Website</span>
			                                        </a>
			                                    </div>
			                                </div>
			                            </div>
			                            <div className="excerpt">
			                            </div>
			                        </div>
			                    </div>
			                    <hr className="hr-mobile"/>
			                </section>
			            </div>
			        </div>
			    </div>
        );
    }
}

export default Dashboard;
