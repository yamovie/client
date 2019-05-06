import axios from 'axios';

const { REACT_APP_SVR_API } = process.env;

function getRecs(dataObj) {
  return axios.post(`${REACT_APP_SVR_API}/movies/recommend`, dataObj, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Gets the list of all genre objects
 * @returns An Axios promise with the genre data
 */
function getGenres() {
  return axios.get(`${REACT_APP_SVR_API}/genres`);
}

/**
 * Gets the data for a movie
 * @param {String} [id]
 * @returns An Axios promise with the movie data
 */
function getSingleMovie(id) {
  return axios.get(`${REACT_APP_SVR_API}/movies/${id}`);
}

/**
 * Gets all the movies, optionally filtered by genreId
 * @param {String} [genreId]
 * @returns An Axios promise with the movie data
 */
function getMovies(genreId = 'all') {
  if (genreId !== 'all') {
    return axios.get(`${REACT_APP_SVR_API}/movies/genre/${genreId}`);
  }
  return axios.get(`${REACT_APP_SVR_API}/movies/`);
}

// function getGenresAndMovies() {
//   axios.all([this.getGenres(), this.getMovies()]).then(
//     axios.spread((genreResp, movieResp) => {
//       this.setState({
//         genres: genreResp.data,
//         movies: movieResp.data.results,
//         page: movieResp.data.page,
//         hasNextPage: movieResp.data.hasNextPage,
//       });
//     }),
//   );
// }

function getSearchResults(searchInputValue) {
  return axios.get(`${REACT_APP_SVR_API}/movies/search`, {
    params: {
      title: searchInputValue,
    },
  });
}

function loadNextPage(page, currentGenreFilter = 'all') {
  if (currentGenreFilter === 'all') {
    return axios.get(`${REACT_APP_SVR_API}/movies/?page=${page}`);
  }
  return axios.get(
    `${REACT_APP_SVR_API}/movies/genre/${currentGenreFilter}/?page=${page}`,
  );
}

export default {
  getRecs,
  getGenres,
  getSingleMovie,
  getMovies,
  // getGenresAndMovies,
  getSearchResults,
  loadNextPage,
};
