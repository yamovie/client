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

  // Renders the genre list to the MovieList page. ==================

  render() {
    const { genres } = this.state;
    const { moviesByGenreKey } = this.props;
    return (
      <div id="list-genres">
        <button className="single-genre" type="button" onClick={() => moviesByGenreKey('all')}>All</button>
        {genres.map(genre => (
          <button className="single-genre" type="button" onClick={() => moviesByGenreKey(genre.external_ids.tmdb_id)}>{genre.name}</button>
        ))}
      </div>
    );
  }
}

export default GenreList;
