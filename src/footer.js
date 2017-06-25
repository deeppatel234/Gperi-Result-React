import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
          <footer className="page-footer bg-app center-on-small-only">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        <h5 className="title">GUJARAT POWER ENGINEERING AND RESEARCH INSTITUTE</h5>
                        <p>Department of Computer Engineering</p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="title">Links</h5>
                        <ul>
                            <li><a href="https://www.gperi.ac.in">GPERI</a></li>
                            <li><a href="https://www.gtu.ac.in">GTU</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container-fluid">
                    Developed & Design By <a target="_blank" href="https://www.linkedin.com/in/deeppatel234/"> Deep Patel </a>
                </div>
            </div>
          </footer>
        );
    }
}

export default Footer;
