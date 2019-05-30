import axios from 'axios';

const { REACT_APP_SVR_USERS, REACT_APP_SVR_API } = process.env;

/**
 * Axios call to database to signup user
 * @param {Object} user
 * @returns {string} token
 */
function signup(user) {
  return axios.post(
    `${REACT_APP_SVR_USERS}/signup`,
    { email: user.email, fullName: user.fullName, password: user.pw },
    { headers: { 'Content-Type': 'application/json' } },
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
    { headers: { 'Content-Type': 'application/json' } },
  );
}

function addToWatchlist(userId, movieId, callback) {
  // add to user watchlist
  return axios.post(
    `${REACT_APP_SVR_USERS}/${userId}/watchlist`,
    { movieId },
    { headers: { 'Content-Type': 'application/json' } }
  )
    .then(res => {
      return res;
    })
    .catch(e => {
      return e;
    });
}

function getPreferences(userId) {
  return axios.get(`${REACT_APP_SVR_API}/preferences/${userId}`);
}

function updatePreferences(userId, newPrefs) {
  return axios.patch(
    `${REACT_APP_SVR_API}/preferences/${userId}`,
    { newPrefs },
    { headers: { 'Content-Type': 'application/json' } },
  );
}

export default {
  signup,
  login,
  addToWatchlist,
  getPreferences,
  updatePreferences,
};
