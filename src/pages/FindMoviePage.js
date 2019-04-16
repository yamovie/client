import React from 'react';
import Proptypes from 'prop-types';
import MovieList from '../components/MovieList';
import '../css/FindMoviePage.css';
import { LloydChat } from '../components';

class FindMoviePage extends React.Component {
  static propTypes = {
    getMovieResults: Proptypes.func.isRequired,
    resetMovieResults: Proptypes.func.isRequired,
    genreIds: Proptypes.shape().isRequired,
    results: Proptypes.arrayOf(Proptypes.object).isRequired,
    talkedToLloyd: Proptypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      results: [{}],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.results !== state.results) {
      return { results: props.results };
    } else return null;
  }

  componentDidUpdate = prevProps => {
    if (this.props.results !== prevProps.results) {
      this.setState({ results: this.getDerivedStateFromProps });
    }
  };

  render() {
    const {
      getMovieResults,
      resetMovieResults,
      genreIds,
      talkedToLloyd,
      results,
      history,
    } = this.props;
    return (
      <div>
        {talkedToLloyd && results.length > 0 ? (
          <MovieList
            results={results}
            showGenreFilter={false}
            history={history}
          />
        ) : (
          ''
        )}
        {!talkedToLloyd ? (
          <h1 className="findMovieh1">
            Talk to our chatbot Lloyd to find YaMovie recommendations!
            <span role="img" aria-label="smile">
              😊
            </span>
          </h1>
        ) : (
          ''
        )}
        {results.length === 0 ? (
          <div>
            <h1 className="findMovieh1">
              Lloyd could not find anything that matched your preferences.
              <span role="img" aria-label="sad">
                😞
              </span>
            </h1>
            <br />
            <h3 className="findMovieh3">
              Ask him again with different criteria so he can find YaMovie
              <span role="img" aria-label="movie">
                🎦
              </span>
              !
            </h3>
          </div>
        ) : (
          ''
        )}
        <LloydChat
          getMovieResults={getMovieResults}
          genreIds={genreIds}
          resetMovieResults={resetMovieResults}
        />
      </div>
    );
  }
}
export default FindMoviePage;
