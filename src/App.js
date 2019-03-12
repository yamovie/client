import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BrowsePage from './pages/BrowsePage';
// import AboutPage from '../components/AboutPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/browse" component={BrowsePage} />
      </div>
    );
  }
}

export default App;
