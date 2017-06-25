import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
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
        );
    }
}

export default Footer;
