import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import {
  FeedbackToast,
  Login,
  Signup,
  Navbar,
  FakeNavbar,
  HomePage,
  BrowsePage,
  AboutPage,
  FindMoviePage,
  NotFoundPage,
  UserDashboardPage,
} from './components';
import userServices from './utils/userServices';
import './css/main.css';

require('dotenv').config();

class App extends Component {
  static propTypes = {
    location: PropTypes.shape(Object).isRequired,
    history: PropTypes.shape(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false,
      chatIsDone: true,
    };
  }

  /**
   * get token and set to local storage
   */
  componentWillMount() {
    const { location, history } = this.props;
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('token', query.token);
      history.push('/');
      this.setState({ isAuthenticated: true });
    }
  }

  /**
   * get user data from database
   */
  componentDidMount() {
    const user = userServices.getUser();
    if (user) {
      this.setState({ isAuthenticated: true, user });
    }
  }

  handleLogout = () => {
    userServices.logout();
    this.setState({ isAuthenticated: false, user: null });
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true, user: userServices.getUser() });
  };

  handleSignup = () => {
    this.setState({ isAuthenticated: true, user: userServices.getUser() });
  };

  /**
   * Ensures that user cannot change to another part of the site while Lloyd is returning a promise
   */
  chatIsDone = () => {
    this.setState({ chatIsDone: true });
  };

  chatIsLoading = () => {
    this.setState({ chatIsDone: false });
  };

  render() {
    const { user, isAuthenticated, chatIsDone } = this.state;

    return (
      <div className="App">
        {chatIsDone ? (
          <Navbar user={user} handleLogout={this.handleLogout} />
        ) : (
          <FakeNavbar user={user} />
        )}
        <FeedbackToast storageType={sessionStorage} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route
            path="/recommendations"
            render={props => (
              <FindMoviePage
                {...props}
                chatIsDone={this.chatIsDone}
                chatIsLoading={this.chatIsLoading}
              />
            )}
          />
          <Route
            path="/login"
            render={({ props }) =>
              isAuthenticated ? (
                <Redirect to="/account/watchlist" />
              ) : (
                <Login {...props} handleLogin={this.handleLogin} />
              )
            }
          />
          <Route
            path="/signup"
            render={({ props }) =>
              isAuthenticated ? (
                <Redirect to="/account/watchlist" />
              ) : (
                <Signup {...props} handleSignup={this.handleSignup} />
              )
            }
          />
          <Route
            path="/account"
            render={({ match, props }) =>
              isAuthenticated ? (
                <UserDashboardPage {...props} match={match} user={user} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
