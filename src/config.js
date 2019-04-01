export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://yamovie-server.herokuapp.com/auth'
  : 'http://localhost:5000/'