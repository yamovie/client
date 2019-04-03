import axios from 'axios';

const BASE_URL = 'http://localhost:5000/users/';

function signup(user) {
  return axios.post(`${BASE_URL}signup`, { email: user.email, fullName: user.fullName, password: user.pw }, { headers: new Headers({ 'Content-Type': 'application/json' }) });
}

function login(creds) {
  return axios.post(`${BASE_URL}login`, { email: creds.email, pw: creds.pw }, { headers: new Headers({ 'Content-Type': 'application/json' }) });
}

export default {
  signup,
  login,
};
