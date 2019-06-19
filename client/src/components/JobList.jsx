import React from 'react';
import JobItem from './JobItem';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('jobs: ', this.props.jobs);
    return (
      <div className="job-list">
        {this.props.jobs.map((elem, idx) => (
          <JobItem job={elem} key={idx} />
        ))}
      </div>
    );
  }
}

export default JobList;
