import React from 'react';

class JobCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ url: '' });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="job-creator">
        <form onSubmit={this.handleSubmit}>
          <input
            id="url-input-field"
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <button type="submit">Submit list of comma separated URLs</button>
        </form>
        <br />
        URLs must follow the format: "http://www.mydomain.com/"
      </div>
    );
  }
}

export default JobCreator;
