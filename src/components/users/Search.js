import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  renderClearBtn = () => {
    if (this.props.showClearBtn) {
      return (
        <button
          className="btn btn-light btn-block"
          onClick={this.props.clearUsers}
        >
          Clear
        </button>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <form action="" className="form" onSubmit={this.handleSubmit}>
          <input
            name="text"
            type="text"
            placeholder="Search User..."
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" className="btn btn-dark btn-block" />
        </form>
        {this.renderClearBtn()}
      </div>
    );
  }
}

export default Search;
