import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import MovieForm from './components/MovieForm';
import ChatWindow from './components/ChatWindow';
import LloydChat from './components/LloydChat';
import Navbar from './components/Navbar';
import './css/main.css';

const App = () => (
  <div className="App">
    <Navbar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/browse" component={BrowsePage} />
      <Route path="/about" component={AboutPage} />
      {/* <Route path="/movieform" component={MovieForm} /> */}
      <Route path="/chat" component={ChatWindow} />
      <Route component={NotFoundPage} />
    </Switch>
    <LloydChat />
  </div>
);

export default App;
