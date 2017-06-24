import React, { Component } from 'react';
import DBA from './dba.js';

class ResultPanel extends Component {

    constructor(props) {
        console.log("props", props);
        super(props);
        this.dba = new DBA();
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);

    }
    componentDidMount() {}
    render() {
        return (
          <div>
          
          </div>
        );
    }
}

export default ResultPanel;
