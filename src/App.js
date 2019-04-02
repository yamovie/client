import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import openSocket from 'socket.io-client';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import MovieForm from './components/MovieForm';
import ChatWindow from './components/ChatWindow';
import OAuth from './components/OAuth';
import './css/main.css';


const provider = 'google';
// const API_URL = 'https://yamovie-server.herokuapp.com/auth';
// const socket = io('http://localhost');
// const socket = openSocket('http://localhost:80');

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
      <Route path="/login" render={(props) => <OAuth {...props} provider={provider} /> } />   
    </Switch>
  </div>
);

export default App;
