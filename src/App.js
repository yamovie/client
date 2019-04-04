import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatWindow from './components/ChatWindow';
import LloydChat from './components/LloydChat';
import Navbar from './components/Navbar';
import './css/main.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: [],
      animationId: '',
    };
  }

  componentDidMount = () => {
    this.getGenreData();
  };

  getMovieResults = (
    genres,
    mpaa,
    minYear,
    maxYear,
    rottenTomato,
    imdb,
    foreign,
    indie,
  ) => {
    axios
      .post(
        'https://yamovie-server-staging.herokuapp.com/api/movies/recommended',
        {
          genres,
          mpaa,
          minYear,
          maxYear,
          rottenTomato,
          imdb,
          foreign,
          indie,
        },
      )
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  getGenreData = () => {
    axios
      .get('https://yamovie-server-staging.herokuapp.com/api/genres')
      .then(response => {
        console.log(response);
        const genreArray = response.data;
        const actionArray = [];
        for (let i = 0; i < genreArray.length; i++) {
          if (genreArray[i].name === 'Animation') {
            this.setState({ animationId: genreArray[i]._id });
          }
          actionArray.push({
            value: genreArray[i]._id,
            text: genreArray[i].name,
          });
        }
        this.setState({ action: actionArray });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { action, animationId } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chat" component={ChatWindow} />
          <Route component={NotFoundPage} />
        </Switch>
        <LloydChat
          getMovieResults={this.getMovieResults}
          action={action}
          animationId={animationId}
        />
      </div>
    );
  }
}

export default App;
