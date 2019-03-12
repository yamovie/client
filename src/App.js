import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import BrowsePage from './components/BrowsePage';
import AboutPage from './components/AboutPage';
import MovieForm from './components/MovieForm';

const App = () => (
  <div className="App">
    <Route exact path="/" component={Homepage}>
      Home
    </Route>
    <Switch>
      <Route path="/browsepage" component={BrowsePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/movieform" component={MovieForm} />
    </Switch>
  </div>
);

export default App;
