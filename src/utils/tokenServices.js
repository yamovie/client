/**
 * Set token to local storage
 * @param {string} token 
 */
function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

/**
 * check if there is a token in local storage
 * if there is a token, check to see if token is valid
 */
function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    // check if expired, remove if it is
    const payload = JSON.parse(atob(token.split('.')[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert Date.now()
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
}

/**
 * parse token for user information
 * @returns {Object} or null
 */
export function getUserFromToken() {
  const token = getToken();
  // jwt parsing
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
  localStorage.removeItem('token');
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken
};
