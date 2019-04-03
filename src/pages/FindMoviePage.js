import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';

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
        <Navbar />
        <ChatWindow />
        {showResults ? (
          <div>
            <MovieList showGenreFilter={false} />
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}
export default FindMoviePage;
