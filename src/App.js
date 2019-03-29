import React from 'react';
import { Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';

import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import ChatWindow from './components/ChatWindow';
import OAuth from './components/OAuth';
import API_URL from './config';
import './css/main.css';

const socket = io(API_URL);
const provider = 'google';

const App = () => (
  <div className="App">
    <Route exact path="/" component={HomePage}>
      Home
    </Route>
    <Switch>
      <Route path="/browse" component={BrowsePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/movieform" component={MovieForm} />
      <Route path="/chat" component={ChatWindow} />
      <Route path="/login" render={(props) => <OAuth {...props} provider={provider} socket={socket} /> } />   
    </Switch>
  </div>
);

export default App;
