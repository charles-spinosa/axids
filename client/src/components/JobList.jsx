import React from 'react';
import JobItem from './JobItem';

class JobList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="job-list">
        {this.props.jobs.map((elem, idx) => {
          console.log(elem, idx);
          return (
            <JobItem
              job={elem}
              key={idx}
              deleteJob={this.props.deleteJob}
              enqueueJob={this.props.enqueueJob}
            />
          );
        })}
      </div>
    );
  }
}

export default JobList;
