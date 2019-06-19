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
  }

  componentDidMount() {
    Axios.get('/api/jobs').then(data => {
      this.setState(
        {
          jobs: data.data.sort(
            (a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)
          )
        },
        () => console.log(this.state)
      );
    });
  }

  render() {
    return (
      <div id="main-app">
        <h1>Biggest Image Finder :D</h1>
        <JobCreator />
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}

export default App;
