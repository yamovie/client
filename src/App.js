import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import './css/main.css';
import FindMoviePage from './pages/FindMoviePage';

const App = () => (
  <div className="App">
    <Route exact path="/" component={HomePage}>
      Home
    </Route>
    <Switch>
      <Route path="/browse" component={BrowsePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/movieform" component={MovieForm} />
      <Route path="/chat" component={FindMoviePage} />
    </Switch>
  </div>
);

export default App;
