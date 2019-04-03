import tokenServices from './tokenServices';
import userAPI from './userAPI';

function getUser() {
  return tokenServices.getUserFromToken();
}

function logout() {
  tokenServices.removeToken();
}

function login(creds) {
  return userAPI.login(creds)
    .then(token => tokenServices.setToken(token));
}

export default {
  getUser,
  logout,
  login,
};
