import React from 'react';
import axios from 'axios';
import MovieFeed from '../components/MovieFeed';
import '../css/FindMoviePage.css';
import { ChatWindow } from '../components';
import { FontAwesomeIcon } from '../utils/fontAwesome';

const serverLink = 'https://yamovie-server-staging.herokuapp.com/api';

class FindMoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genreIds: {},
      results: [{}],
      talkedToLloyd: false,
      mountChat: false,
      isExpanded: true,
    };
  }

  getMovieResults = dataObj => {
    // const { history } = this.props;
    axios
      .post(`${serverLink}/movies/recommend`, dataObj, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        this.setState({
          results: response.data.results,
          talkedToLloyd: true,
        });
        // history.push('/recommendations');
      })
      .catch(error => console.error(error));
  };

  getGenreData = () => {
    axios
      .get(`${serverLink}/genres`)
      .then(response => {
        const genreIds = response.data.reduce((acc, curr) => {
          acc[curr.translation] = curr._id;
          return acc;
        }, {});
        this.setState({
          genreIds,
          mountChat: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  resetMovieResults = () => {
    this.setState({ talkedToLloyd: false });
  };

  componentDidMount = () => {
    this.getGenreData();
  };

  toggleExpanded = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  };

  render() {
    const { talkedToLloyd, genreIds, results, mountChat, isExpanded } = this.state;

    return (
      <div>
        <div className="full-container">
          <button
            type="button"
            className={`expand-indicator ${isExpanded ? 'close' : ''}`}
            onClick={this.toggleExpanded}
          >
            <FontAwesomeIcon icon="angle-down" />
          </button>
          <div className="top-chat-container" style={isExpanded ? { height: '0' } : {}}>
            <img className="lloyd-icon" src="/images/lloyd.png" alt="Lloyd" />
            <h1 className="lloyd-title">Lloyd Chat</h1>
          </div>
          <div
            className="bottom-chat-container"
            style={isExpanded ? {} : { height: '0px' }}
          >
            {mountChat && isExpanded ? (
              <ChatWindow
                toggleChat={this.toggleExpanded}
                getMovieResults={this.getMovieResults}
                resetMovieResults={this.resetMovieResults}
                genreIds={genreIds}
              />
            ) : (
              ''
            )}
          </div>
        </div>
        {talkedToLloyd && results.length > 0 ? <MovieFeed movies={results} /> : ''}
        {!talkedToLloyd ? '' : ''} {/* Why is this here...? */}
        {results.length === 0 ? (
          <div>
            <h1 className="findMovieh1">
              Lloyd could not find anything that matched your preferences.
            </h1>
            <br />
            <h3 className="findMovieh3">
              Ask him again with different criteria so he can find YaMovie or come back
              later because our database is always expanding!
            </h3>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default FindMoviePage;
