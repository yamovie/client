import React from 'react';
import Proptypes from 'prop-types';
import MovieList from '../components/MovieList';
import '../css/FindMoviePage.css';

class FindMoviePage extends React.Component {
  static propTypes = {
    results: Proptypes.arrayOf(Proptypes.object).isRequired,
    talkedToLloyd: Proptypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { results, talkedToLloyd } = this.props;
    return (
      <div>
        {talkedToLloyd && results.length > 0 ? (
          <MovieList results={results} showGenreFilter={false} />
        ) : (
          ''
        )}
        {!talkedToLloyd ? (
          <h1>Talk to our chatbot Lloyd to find movie recommendations! 😊</h1>
        ) : (
          ''
        )}
        {results.length === 0 ? (
          <div>
            <h1>
              Lloyd could not find anything that matched your preferences. 😞
            </h1>
            <br />
            <h3>
              Ask him again with different criteria so he can find ya movie 🎦!
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
