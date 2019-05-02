import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import {
  HomePage,
  BrowsePage,
  AboutPage,
  FindMoviePage,
  NotFoundPage,
  UserDashboardPage,
} from './pages';
import { FeedbackToast, Login, Signup, Navbar } from './components';
import userServices from './utils/userServices';
import './css/main.css';

require('dotenv').config();

const { REACT_APP_SVR_API } = process.env;

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

<<<<<<< HEAD
  getMovieResults = dataObj => {
    const { history } = this.props;
    axios
      .post(`${REACT_APP_SVR_API}/movies/recommend`, dataObj, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        this.setState({
          results: response.data.results,
          talkedToLloyd: true,
        });
        history.push('/recommendations');
      })
      .catch(error => console.log(error));
  };

  getGenreData = () => {
    axios
      .get(`${REACT_APP_SVR_API}/genres`)
      .then(response => {
        // const genreArray = response.data;
        // const idObject = {};
        // for (let i = 0; i < genreArray.length; i++) {
        //   const str = genreArray[i].name.replace(/\s+/g, '');
        //   idObject[str] = genreArray[i]._id;
        // }

        const genreIds = response.data.reduce((acc, curr) => {
          acc[curr.translation] = curr._id;
          return acc;
        }, {});
        this.setState({ genreIds });
      })
      .catch(error => {
        console.log(error);
      });
  };

  resetMovieResults = () => {
    this.setState({ talkedToLloyd: false });
  };

=======
>>>>>>> 7204fc125e466a8e78d684dac9d692e6c7233b8d
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

  render() {
<<<<<<< HEAD
    const {
      user,
      genreIds,
      results,
      talkedToLloyd,
      isAuthenticated,
    } = this.state;
    const { history } = this.props;
=======
    const { user, isAuthenticated } = this.state;
>>>>>>> 7204fc125e466a8e78d684dac9d692e6c7233b8d

    return (
      <div className="App">
        <Navbar user={user} handleLogout={this.handleLogout} />
        <FeedbackToast />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/recommendations" component={FindMoviePage} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} handleLogin={this.handleLogin} />
            )}
          />
          <Route
            path="/signup"
            render={props => (
              <Signup {...props} handleSignup={this.handleSignup} />
            )}
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
