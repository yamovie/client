import React from 'react';
import MovieList from '../components/MovieList';

class FindMoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
    };
  }

  render() {
    const { showResults } = this.state;
    return (
      <div>
        <h1>Results</h1>
        {showResults ? <MovieList /> : undefined}
      </div>
    );
  }
}
export default FindMoviePage;
