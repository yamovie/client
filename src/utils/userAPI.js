import axios from 'axios';

const BASE_URL = 'https://yamovie-server.herokuapp.com/users/';
/**
 * Axios call to database to signup user
 * @param {Object} user 
 * @returns {string} token
 */
function signup(user) {
  return axios.post(`${BASE_URL}/signup`, { email: user.email, fullName: user.fullName, password: user.pw }, { headers: new Headers({ 'Content-Type': 'application/json' }) });
}

/**
 * Axios call to database to verify user login
 * @param {Object} creds
 *  * @returns {string} token 
 */
function login(creds) {
  return axios.post(`${BASE_URL}/login`, { email: creds.email, pw: creds.pw }, { headers: new Headers({ 'Content-Type': 'application/json' }) });
}

export default {
  signup,
  login,
};
