import Axios from 'axios';
import userAPI from './userAPI';

function getUser() {
  Axios.get(`${process.env.DB_URL}users`).then(res => res.data);
}

// function logout() {
//   tokenService.removeToken();
// }

// function login(creds) {
//   return userAPI.login(creds)
//     .then(token => tokenService.setToken(token));
// }

export default {
  getUser,
  // logout,
  // login,
};
