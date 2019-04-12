import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Signup from './components/Signup';
import userServices from './utils/userServices';
import LloydChat from './components/LloydChat';
import Navbar from './components/Navbar';
import './css/main.css';
import UserDashboardPage from './pages/UserDashboardPage';
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
    };
  }

  /**
   * get token and set to local storage
   */
  componentWillMount() {
    const { location, history } = this.props;
    // console.log(history);
    // console.log(location);
    const query = queryString.parse(location.search);
    if (query.token) {
      window.localStorage.setItem('token', query.token);
      history.push('/');
    }
  }

  /**
   * get user data from database
   */
  componentDidMount() {
    const user = userServices.getUser();
    if (user) {
      this.setState({ user });
    }
  }

  handleLogout = () => {
    userServices.logout();
    this.setState({ user: null });
  };

  handleLogin = () => {
    this.setState({ user: userServices.getUser() });
  };

  handleSignup = () => {
    this.setState({ user: userServices.getUser() });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Navbar user={user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chat" component={ChatWindow} />
          <Route
            path="/login"
            render={props => <Login {...props} handleLogin={this.handleLogin} />}
          />
          <Route
            path="/signup"
            render={props => <Signup {...props} handleSignup={this.handleSignup} />}
          />
          <Route path="/account" render={({ match, props }) => <UserDashboardPage {...props} match={match} user={user} />} />
          <Route component={NotFoundPage} />
        </Switch>
        <LloydChat />
      </div>
    );
  }
}

export default App;
