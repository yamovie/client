import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import MovieList from './components/MovieList';
import BrowsePage from './pages/BrowsePage';
import Navbar from './components/Navbar';
// import AboutPage from '../components/AboutPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={MovieList} />
        <Route exact path="/browse" component={BrowsePage} />
      </div>
    );
  }
}

export default App;
