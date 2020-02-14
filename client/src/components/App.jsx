import React from 'react';
import Axios from 'axios';
import JobCreator from './JobCreator';
import JobList from './JobList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
    this.deleteJob = this.deleteJob.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.enqueueJob = this.enqueueJob.bind(this);
    this.addJob = this.addJob.bind(this);
  }

  fetchData() {
    Axios.get('/api/jobs').then(data => {
      let sorted = data.data.slice().sort((a, b) => {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        // Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
      console.log(sorted);
      this.setState({
        jobs: sorted
      });
    });
  }

  componentDidMount() {
    this.fetchData();

    // long polling
    setInterval(this.fetchData, 5000);
  }

  deleteJob(jobID) {
    Axios.delete('/api/jobs/id/' + jobID).then(this.fetchData);
  }

  enqueueJob(jobID) {
    Axios.post(`/api/status/${jobID}`).then(this.fetchData);
  }

  addJob(string) {
    string = string.split(' ');
    return Axios.post(`/api/jobs`, string).then(this.fetchData);
  }

  render() {
    console.log(this.state);
    return (
      <div id="main-app">
        <h1>Bigmage Finder :D</h1>
        <JobCreator addJob={this.addJob} />
        <JobList
          jobs={this.state.jobs}
          deleteJob={this.deleteJob}
          enqueueJob={this.enqueueJob}
        />
      </div>
    );
  }
}

export default App;
