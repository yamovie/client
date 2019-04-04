import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
// import queryString from 'query-string';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Signup from './components/Signup';
import userServices from './utils/userServices';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const user = userServices.getUser();
    if (user) {
      this.setState({user})
    }
  }

  // componentWillMount() {
  //   const query = queryString.parse(this.props.location.search);
  //   if (query.token) {
  //     window.localStorage.setItem('jwt', query.token);
  //     this.props.history.push('/');
  //   }
  // }

  handleLogout = () => {
    userServices.logout();
    this.setState({ user: null });
  }

  handleLogin = () => {
    this.setState({ user: userServices.getUser() });
  }

  handleSignup = () => {
    this.setState({ user: userServices.getUser() });
  }
   
  render() {
    const {user} = this.state;
    return (
      <div className="App">
        <Route exact path="/" component={HomePage}>
          Home
        </Route>
        <Switch>
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/movieform" component={MovieForm} />
          <Route path="/chat" component={ChatWindow} />
          <Route path="/login" render={() => <Login handleLogin={this.handleLogin} />} />
          <Route path="/signup" render={() => <Signup handleSignup={this.handleSignup} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
