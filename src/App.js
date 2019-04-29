import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { HomePage, BrowsePage, AboutPage, FindMoviePage, NotFoundPage } from './pages';
import { Login, Signup, Navbar } from './components';
import userServices from './utils/userServices';
import './css/main.css';
import UserDashboardPage from './pages/UserDashboardPage';

require('dotenv').config();
// import Watchlist from './components/Watchlist';

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
    this.setState({ user: userServices.getUser() });
  };

  handleSignup = () => {
    this.setState({ user: userServices.getUser() });
  };

  render() {
    const { user, isAuthenticated } = this.state;

    return (
      <div className="App">
        <Navbar user={user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/recommendations" component={FindMoviePage} />
          <Route
            path="/login"
            render={props => <Login {...props} handleLogin={this.handleLogin} />}
          />
          <Route
            path="/signup"
            render={props => <Signup {...props} handleSignup={this.handleSignup} />}
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
