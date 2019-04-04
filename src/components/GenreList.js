import React, { Component } from 'react';
import axios from 'axios';

class GenreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxesVisible: false,
      genres: [],
    };
    this.handleSelectionReset = this.handleSelectionReset.bind(this);
  }

  // =================== Grabs Genre List from API ==============

  componentDidMount() {
    axios
      .get('https://yamovie-server.herokuapp.com/api/genres')
      .then(response => this.setState({ genres: response.data }));
  }

  // =================== Unticks all checked genreboxes ==============

  handleSelectionReset(e) {
    e.target.reset();
    e.preventDefault();
  }

  // ================== Renders the genre list ==================

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
        <form onSubmit={this.handleSelectionReset}>
          <div id="list-genres">
            {genres.map((genre) => (
              <label className="single-genre checkmark-container" key={genre.id}>
                <input type="checkbox" />
                <span className="checkmark" />
                <span className="single-genre">{genre.name}</span>
              </label>
            ))}
          </div>
          <button className="reset-button" type="submit">reset</button>
        </form>
      </div>
      
    );
  }
}

export default GenreList;
