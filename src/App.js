import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import './css/main.css';

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
