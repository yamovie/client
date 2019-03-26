import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import ChatWindow from './components/ChatWindow';
import './css/main.css';

const App = () => (
  <div className="App">
    <Route exact path="/" component={HomePage}>
      Home
    </Route>
    <Switch>
      <Route path="/browsepage" component={BrowsePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/movieform" component={MovieForm} />
      <Route path="/chat" component={ChatWindow} />
    </Switch>
  </div>
);

export default App;
