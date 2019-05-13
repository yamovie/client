import axios from 'axios';

const { REACT_APP_SVR_API } = process.env;

/**
 * Gets the list of recommended movies based on the input filter options data
 * @param {Object} dataObj an object containing all of the recommendation filter options
 * @returns An Axios promise with the recommendation data
 */
function getRecs(dataObj) {
  return axios.post(`${REACT_APP_SVR_API}/movies/recommend`, dataObj, {
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Gets the list of all provider objects
 * @param {String} [type] the type of provider (i.e. stream, rent, buy, free)
 * @returns An Axios promise with the provider data
 */
function getProviders(type = '') {
  if (type !== '') {
    return axios.get(`${REACT_APP_SVR_API}/providers/${type}`);
  }
  return axios.get(`${REACT_APP_SVR_API}/providers`);
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

/**
 * Gets the movie results filtered by the input search text
 * @param {String} searchInputValue the thing to search by
 * @returns an axios promise with the search results
 */
function getSearchResults(searchInputValue) {
  return axios.get(`${REACT_APP_SVR_API}/movies/search`, {
    params: {
      title: searchInputValue,
    },
  });
}

/**
 * Gets the next page of movies, taking into account whether the movies are filtered
 * by a search or by a genre
 * @param {number} page
 * @param {String} currentGenreFilter the ObjectId for the genre the movies are filtered by
 * @param {String} currentSearchQuery the query if the movies are currently filtered by search
 * @returns an axios promise with the data for the next page
 */
function loadNextPage(page, currentGenreFilter = 'all', currentSearchQuery = '') {
  // if there is a genre filter
  if (currentGenreFilter !== 'all') {
    return axios.get(
      `${REACT_APP_SVR_API}/movies/genre/${currentGenreFilter}/?page=${page}`,
    );
  }
  // if there is a search query
  if (currentSearchQuery !== '') {
    return axios.get(`${REACT_APP_SVR_API}/movies/search`, {
      params: { title: currentSearchQuery, page },
    });
  }
  // otherwise, just normal movies
  return axios.get(`${REACT_APP_SVR_API}/movies/?page=${page}`);
}

export default {
  getRecs,
  getProviders,
  getGenres,
  getSingleMovie,
  getMovies,
  getSearchResults,
  loadNextPage,
};
