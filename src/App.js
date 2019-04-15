import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  HomePage,
  BrowsePage,
  AboutPage,
  FindMoviePage,
  NotFoundPage,
} from './pages';
import { ChatWindow, Login, Signup, Navbar } from './components';
import userServices from './utils/userServices';
import LloydChat from './components/LloydChat';
import './css/main.css';

class App extends Component {
  static propTypes = {
    location: PropTypes.shape(Object).isRequired,
    history: PropTypes.shape(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      genreIds: {},
      results: [{}],
      talkedToLloyd: false,
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
    this.getGenreData();
    const user = userServices.getUser();
    if (user) {
      this.setState({ user });
    }
  }

  getMovieResults = dataObj => {
    const { history } = this.props;
    axios
      .post(
        'https://yamovie-server-staging.herokuapp.com/api/movies/recommend',
        dataObj,
      )
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
      .get('https://yamovie-server-staging.herokuapp.com/api/genres')
      .then(response => {
        const genreArray = response.data;
        const idObject = {};
        for (let i = 0; i < genreArray.length; i++) {
          const str = genreArray[i].name.replace(/\s+/g, '');
          idObject[str] = genreArray[i]._id;
        }
        this.setState({ genreIds: idObject });
      })
      .catch(error => {
        console.log(error);
      });
  };

  resetMovieResults = () => {
    this.setState({ talkedToLloyd: false });
  };

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
    const { user, genreIds, results, talkedToLloyd } = this.state;
    const { history } = this.props;
    return (
      <div className="App">
        <Navbar user={user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chat" component={ChatWindow} />
          <Route
            path="/recommendations"
            render={props => (
              <FindMoviePage
                {...props}
                history={history}
                results={results}
                showGenreFilter={false}
                talkedToLloyd={talkedToLloyd}
              />
            )}
          />
          <Route component={NotFoundPage} />
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
          <Route component={NotFoundPage} />
        </Switch>
        <LloydChat
          getMovieResults={this.getMovieResults}
          genreIds={genreIds}
          resetMovieResults={this.resetMovieResults}
        />
      </div>
    );
  }
}

export default App;
