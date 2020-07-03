const axios = require('axios');

const local = JSON.parse(localStorage.getItem('persist:config'));
let login;
try {
  login = JSON.parse(local?.login);
} catch (error) {}

const token = login?.userData?.token;

if (token) {
  axios.defaults.headers.common['Authorization'] = token;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}

const api = axios.create({
  baseURL: 'http://localhost:5002',
});

export default api;
