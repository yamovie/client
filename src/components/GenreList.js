import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import '../css/GenreList.css';

class GenreList extends Component {
  static propTypes = {
    moviesByGenreKey: PropTypes.func.isRequired,
  }

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
    const { moviesByGenreKey, style, toggleHover } = this.props;
    return (
      <div id="list-genres" onMouseLeave={toggleHover} style={style}>
        <button className="single-genre" type="button" onClick={() => moviesByGenreKey('all')}>All</button>
        {genres.map(genre => (
          <button className="single-genre" type="button" key={genre.name} onClick={() => moviesByGenreKey(genre._id)}>{genre.name}</button>
        ))}
      </div>
    );
  }
}

export default GenreList;
