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

  toggle = () => {
    console.log('I ran!');
    this.setState({ showResults: false });
  };

  render() {
    const { showResults } = this.state;
    return (
      <div>
        <Navbar />
        {showResults ? (
          <div>
            <MovieList />
          </div>
        ) : (
          <div>
            <ChatWindow toggle={() => this.toggle} />
          </div>
        )}
      </div>
    );
  }
}
export default FindMoviePage;
