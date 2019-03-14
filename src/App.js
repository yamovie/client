import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BrowsePage from './pages/BrowsePage';
import MovieCard from './components/MovieCard';
// import AboutPage from '../components/AboutPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/browse" component={BrowsePage} />
        <Route exact path="/moviecard" component={MovieCard} />

      </div>
    );
  }
}

export default App;
