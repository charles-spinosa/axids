import React from 'react';
import Axios from 'axios';

class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      largest: '',
      size: 0
    };
    this.getLargest = this.getLargest.bind(this);
  }

  getLargest() {
    Axios.get(`/api/status/${this.props.job._id}/result`).then(data => {
      console.log(data.data[0]);
      this.setState({
        largest: data.data[0].imageURL,
        size: data.data[0].imageSize
      });
    });
  }

  render() {
    return (
      <div className="job-item">
        <div className="left-col">
          <div className="job-url">
            Job URL:{' '}
            <a href={this.props.job.url} target="_blank">
              {this.props.job.url}
            </a>
          </div>
          <div
            className={
              this.props.job.status === 'finished'
                ? 'job-status job-completed'
                : this.props.job.status === 'queued'
                ? 'job-status job-queued'
                : this.props.job.status === 'not queued'
                ? 'job-status job-not-queued'
                : 'job-status job-failed'
            }
          >
            Status: {this.props.job.status}
          </div>
        </div>
        <div className="right-col">
          <div className="buttons">
            {this.props.job.status === 'queued' ? (
              <button className="refresh-job-status" onClick={this.getLargest}>
                Get Current Largest
              </button>
            ) : this.props.job.status === 'not queued' ? (
              <button
                className="enqueue"
                onClick={() => this.props.enqueueJob(this.props.job._id)}
              >
                Enqueue Job
              </button>
            ) : null}
            <button onClick={() => this.props.deleteJob(this.props.job._id)}>
              Delete Job
            </button>
          </div>
          <div className="temp-largest">
            {this.props.job.largestImageURL ? (
              <div className="largest-image-url">
                <a href={this.props.job.largestImageURL} target="_blank">
                  View final image
                </a>
              </div>
            ) : this.state.largest ? (
              <a href={this.state.largest} target="_blank">
                Current Largest: {this.state.size}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default JobItem;
