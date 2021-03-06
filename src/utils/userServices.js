import Swal from 'sweetalert2';
import tokenServices from './tokenServices';
import userAPI from './userAPI';

function getUser() {
  return tokenServices.getUserFromToken();
}

async function logout() {
  Swal.fire({
    position: 'top-end',
    type: 'success',
    text: 'Sucessfully Logged Out!',
    showConfirmButton: false,
    timer: 1300,
  });
  await tokenServices.removeToken();
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
    userAPI.addToWatchlist(user._id, movieId)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            text: 'The movie was sucessfully added to Watchlist',
            showConfirmButton: false,
            timer: 1000,
          })
        } else {
          Swal.fire({
            position: 'top-end',
            type: 'error',
            text: 'That movie all ready exists in your watchlist',
            showConfirmButton: false,
            timer: 1000,
          })
        };
      });
  }
}

export default {
  getUser,
  logout,
  login,
  signup,
  addToUserWatchlist,
};
