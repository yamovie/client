import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import { HomePage, BrowsePage, AboutPage, FindMoviePage, NotFoundPage } from './pages';
import { ChatWindow, Login, Signup, LloydChat, Navbar } from './components';
import userServices from './utils/userServices';
import './css/main.css';

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
          <Route path="/recommendations" component={FindMoviePage} />
          <Route
            path="/login"
            render={props => <Login {...props} handleLogin={this.handleLogin} />}
          />
          <Route
            path="/signup"
            render={props => <Signup {...props} handleSignup={this.handleSignup} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <LloydChat />
      </div>
    );
  }
}

export default App;
