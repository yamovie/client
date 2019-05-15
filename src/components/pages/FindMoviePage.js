import React from 'react';
import { ChatWindow, MovieFeed } from '..';
import { FontAwesomeIcon, moviesAPI } from '../../utils';
import '../../css/pages/FindMoviePage.css';

class FindMoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genreIds: {},
      results: [{}],
      talkedToLloyd: true,
      mountChat: false,
      isExpanded: false,
    };
  }

  getMovieResults = dataObj => {
    moviesAPI
      .getRecs(dataObj)
      .then(response => {
        this.setState({
          results: response.data.results,
          talkedToLloyd: true,
        });
      })
      .catch(error => console.error(error));
  };

  getGenreData = () => {
    moviesAPI
      .getGenres()
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
            <img className="lloyd-icon" src="/images/lloyd/lloyd-black.png" alt="Lloyd" />
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
