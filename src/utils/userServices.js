import tokenServices from './tokenServices';
import userAPI from './userAPI';

function getUser() {
  return tokenServices.getUserFromToken();
}

function logout() {
  tokenServices.removeToken();
}

/**
 * checks users email and password
 * @param {Object} creds 
 * @returns token
 */
async function login(creds) {
  const response = await userAPI.login(creds);
  const { token } = response.data;
  tokenServices.setToken(token);
}

/**
 * creates new user
 * @param {Object} user 
 * @returns token
 */
async function signup(user) {
  const response = await userAPI.signup(user);
  const { token } = response.data;
  tokenServices.setToken(token);
}
/**
 * Find user and send UserId and movieId
 * @param {string} movieId 
 */
async function addToUserWatchlist(movieId) {
  const user = await getUser();
  // if user exists
  if (user) {
    userAPI.addToWatchlist(user._id, movieId);
  }
}

export default {
  getUser,
  logout,
  login,
  signup,
  addToUserWatchlist
};
