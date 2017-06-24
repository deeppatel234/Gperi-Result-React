import axios from 'axios';

class DBA {
	
	constructor () {
		this.hostName = "https://gperiresultapi.herokuapp.com";
		//this.hostName = "http://192.168.1.3:3003";
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
		return axios.post(this.hostName+"/batch?branch="+branchName);
	}

	semData (branchName, batch, sem) {
		return axios.post(this.hostName+"/sem?branch="+branchName+"&batch=" + batch +"&sem="+sem);
	}
} 

export default DBA;