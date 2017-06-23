import axios from 'axios';

class DBA {
	
	constructor () {
		this.hostName = "https://gperiresultapi.herokuapp.com";
		this.studentSearch = this.studentSearch.bind(this);
	}
	
	studentSearch (searchString) {
		return axios.post(this.hostName+"/search?string="+searchString);
	}

	topStudentsDashboard () {
		return axios.post(this.hostName+"/collagetop");
	}

	studentInformation (searchString) {
		return axios.post(this.hostName+"/student?enrollment="+searchString);
	}

	batchImformation (branchName) { 
		console.log("branchName", branchName);
		return axios.post(this.hostName+"/batch?branch="+branchName);	
	}
} 

export default DBA;