import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BrowsePage from './components/BrowsePage';
import AboutPage from './components/AboutPage';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" component={Homepage} >Home</Route>
        {/* <Switch>
          <Route path="/browsepage" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
        </Switch> */}
      </div>
    );
  }
}

export default App;
