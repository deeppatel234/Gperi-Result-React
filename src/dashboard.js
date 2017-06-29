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
import { Link } from 'react-router-dom'

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
                        <h3>{self.info.branchDetail[props.branch].name}</h3>
                        <Link to={"batch/"+props.branch}>
                        	<div className="mask waves-effect waves-light"></div>
                        </Link>
                        <div>
                            <div className="batchLogoclassName">
                                <i className={self.info.branchDetail[props.branch].logo}></i>
                            </div>
                            <div className="studentTotal">
                                {props.count.count[self.info.branchDetail[props.branch].name]}
                            </div>
                            <div className="studentLogo">
                                <h3 style={{display: "inline"}}><i className="fa fa-user" aria-hidden="true"></i>
                                    <span className="studentIcon">Students</span></h3>
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
			                <section className="section section-blog-fw" style={{marginBottom: '0px'}}>
			                    <div className="row">
			                        <div className="col-md-12">
			                            <div className="view overlay hm-white-slight">
			                                <img src={gperi} alt="gperi"/>
			                                <a>
			                                    <div className=""></div>
			                                </a>
			                            </div>
			                            <div className="jumbotron" style={{marginBottom: '10px'}}>
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
			                    <h1 className="section-heading" style={{margin : '30px 0'}}>Gujarat Power Engineering And Research Institute</h1>
			                    <div className="row">
			                       <BranchCard branch="computer" count={this.state}/>
			                       <BranchCard branch="civil" count={this.state}/>
			                       <BranchCard branch="electrical" count={this.state}/>
			                       <BranchCard branch="mechanical" count={this.state}/>
			                    </div>
			                </section>
			            </div>
			            <div className="col-md-12">
			                <section className="section feature-box">
			                    <h1 className="section-heading" style={{margin : '30px 0'}}>Why is it so great?</h1>
			                    <p className="section-description lead" style={{marginBottom : '3rem'}}>GPERI Result is a fast, easy, reliable and automated data analytic platform.drives with advanced technology and robust data engine.</p>
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
			                            </div>
			                        </div>
			                        <div className="col-md-5 center-on-small">
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-mobile brandText"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Responsive</h4>
			                                    <p className="grey-text">Reach us through any devices we will show you best of us.Website is compatible through all mobile, tablet and desktop.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"40px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-code brandText"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Technology</h4>
			                                    <p className="grey-text">this platform is runs on powerfull JavaScript engine and datastorage provide by efficient MongoDB. Combination of this get us tremendous amount of data in just a one moment.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"40px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-bar-chart brandText"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Graphs</h4>
			                                    <p className="grey-text">Using our powerfull data analytic engine we will show you your precise data using various representations like graphs.</p>
			                                </div>
			                            </div>
			                            <div style={{height:"40px"}}></div>
			                            <div className="row">
			                                <div className="col-1">
			                                    <i className="fa fa-fighter-jet brandText"></i>
			                                </div>
			                                <div className="col-10">
			                                    <h4 className="feature-title">Fast and Autonomous</h4>
			                                    <p className="grey-text">Our intelligent data driven process will show you accurate data within blink of your eye.You can bring all your data within same day of announcements of result.</p>
			                                </div>
			                            </div>
			                        </div>
			                    </div>
			                </section>
			            </div>
			            <div className="col-md-12">
			                <section className="section section-blog-fw" style={{marginBottom : '1rem' , marginTop : '2rem'}}>
			                    <div className="row">
			                        <div className="col-md-12">
			                            <div className="jumbotron" style={{marginBottom : '0'}}>
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
