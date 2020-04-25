import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_CLIENT_ID}&${process.env.REACT_APP_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data,
      loading: false
    });
  }

  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_CLIENT_ID}&${process.env.REACT_APP_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_CLIENT_ID}&${process.env.REACT_APP_CLIENT_SECRET}`
    );

    this.setState({
      user: res.data,
      loading: false
    });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&${process.env.REACT_APP_CLIENT_SECRET}`
    );

    this.setState({
      repos: res.data,
      loading: false
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  setAlert = (message, type) => {
    this.setState({
      alert: {
        message,
        type
      }
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClearBtn={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users
                    loading={this.state.loading}
                    users={this.state.users}
                  />
                </>
              )}
            />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={this.state.user}
                  repos={this.state.repos}
                  loading={this.loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
