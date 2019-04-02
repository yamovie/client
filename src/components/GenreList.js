import React, { Component } from 'react';
import axios from 'axios';

class GenreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxesVisible: false,
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
    const { moviesByGenreKey, checkboxesVisible } = this.props;
    if (!checkboxesVisible) {
      return (
        <div id="list-genres">
          <button className="single-genre" type="button" onClick={() => moviesByGenreKey('all')}>All</button>
          {genres.map(genre => (
            <button className="single-genre" type="button" onClick={() => moviesByGenreKey(genre.key)}>{genre.name}</button>
          ))}
        </div>
      );
    }

    return (
      <div>
        <form>
          <div id="list-genres">
            {genres.map((genre, i) => (
              <label key={i}>
                <input type="checkbox" />
                <span className="single-genre">{genre.name}</span>
              </label>
            ))}
          </div>
          <button className="reset-button" type="button">reset</button>
        </form>
      </div>
      
    );
  }
}

export default GenreList;
