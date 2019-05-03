import axios from 'axios';

const { REACT_APP_SVR_USERS } = process.env;

/**
 * Axios call to database to signup user
 * @param {Object} user
 * @returns {string} token
 */
function signup(user) {
  return axios.post(
    `${REACT_APP_SVR_USERS}/signup`,
    { email: user.email, fullName: user.fullName, password: user.pw },
    { headers: new Headers({ 'Content-Type': 'application/json' }) },
  );
}

/**
 * Axios call to database to verify user login
 * @param {Object} creds
 *  * @returns {string} token
 */
function login(creds) {
  return axios.post(
    `${REACT_APP_SVR_USERS}/login`,
    { email: creds.email, pw: creds.pw },
    { headers: new Headers({ 'Content-Type': 'application/json' }) },
  );
}

function addToWatchlist(userId, movieId) {
  // add to user watchlist
  return axios.post(`${REACT_APP_SVR_USERS}/watchlist`, { userId, movieId},
  { headers: new Headers({ 'Content-Type': 'application/json' }) },
  );
}

export default {
  signup,
  login,
  addToWatchlist,
};
