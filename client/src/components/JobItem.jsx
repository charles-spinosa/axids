import React from 'react';
import Moment from 'moment';

class JobItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.job);
    return (
      <div className="job-item">
        <div className="left-col">
          <span className="job-url">
            Job URL:{' '}
            <a href={this.props.job.url} target="_blank">
              {this.props.job.url}
            </a>
          </span>
          <span
            className={
              this.props.job.status === 'finished'
                ? 'job-status job-completed'
                : this.props.job.status === 'queued'
                ? 'job-status job-queued'
                : this.props.job.status === 'not-queued'
                ? 'job-status job-not-queued'
                : 'job-status job-failed'
            }
          >
            Status: {this.props.job.status}
          </span>
          {this.props.job.largestImageURL && (
            <div>
              <a href={this.props.job.largestImageURL} target="_blank">
                Click here to view largest image
              </a>
            </div>
          )}
        </div>
        <div className="right-col">world</div>
      </div>
    );
  }
}

export default JobItem;
