import React, { Component } from 'react';
import axios from 'axios';

class GenreList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    };
  }

  // =================== Grabs Genre List from API ==============

  componentDidMount() {
    axios
      .get('https://yamovie-server.herokuapp.com/api/genres')
      .then(response => this.setState({ genres: response.data }));
  }

  // Renders the genre list to the HTML page. ==================

  render() {
    const { genres } = this.state;
    const { moviesById } = this.props;
    return (
      <div id="list-genres">
        {genres.map(genre => (
          <div id="single-genre">
            <button type="button" onClick={() => moviesById(genre.tmdb_id)}>{genre.genre}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default GenreList;
