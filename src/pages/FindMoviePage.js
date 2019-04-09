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
    this.state = {
      results: [{}],
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.results !== state.results) {
      return { results: props.results };
    } else return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.results !== prevProps.results) {
      console.log('props have changed');
      this.setState({ results: this.getDerivedStateFromProps });
    }
  };

  render() {
    const { talkedToLloyd, results, history } = this.props;
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
          <h1>
            Talk to our chatbot Lloyd to find movie recommendations!{' '}
            <span role="img" aria-label="smile">
              😊
            </span>
          </h1>
        ) : (
          ''
        )}
        {results.length === 0 ? (
          <div>
            <h1>
              Lloyd could not find anything that matched your preferences.{' '}
              <span role="img" aria-label="sad">
                😞
              </span>
            </h1>
            <br />
            <h3>
              Ask him again with different criteria so he can find ya movie{' '}
              <span role="img" aria-label="movie">
                🎦
              </span>
              !
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
