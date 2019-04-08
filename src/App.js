import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import FindMoviePage from './pages/FindMoviePage';
import ChatWindow from './components/ChatWindow';
import LloydChat from './components/LloydChat';
import Navbar from './components/Navbar';
import './css/main.css';

class App extends React.Component {
  static propTypes = {
    history: Proptypes.shape(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      genreIds: {},
      results: [{}],
      talkedToLloyd: false,
    };
  }

  componentDidMount = () => {
    this.getGenreData();
  };

  getMovieResults = dataObj => {
    const { history } = this.props;
    axios
      .post(
        'https://yamovie-server.herokuapp.com/api/movies/recommend',
        dataObj,
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          results: response.data.results,
          talkedToLloyd: true,
        });
        history.push('/results');
      })
      .catch(error => console.log(error));
  };

  getGenreData = () => {
    axios
      .get('https://yamovie-server.herokuapp.com/api/genres')
      .then(response => {
        const genreArray = response.data;
        const idObject = {};
        for (let i = 0; i < genreArray.length; i++) {
          const str = genreArray[i].name.replace(/\s+/g, '');
          idObject[str] = genreArray[i]._id;
        }
        this.setState({ genreIds: idObject });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { genreIds, results, talkedToLloyd } = this.state;
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/browse" component={BrowsePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/chat" component={ChatWindow} />
          <Route
            path="/results"
            render={props => (
              <FindMoviePage
                {...props}
                results={results}
                showGenreFilter={false}
                talkedToLloyd={talkedToLloyd}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <LloydChat getMovieResults={this.getMovieResults} genreIds={genreIds} />
      </div>
    );
  }
}

export default App;
