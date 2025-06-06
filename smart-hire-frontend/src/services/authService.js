import axios from 'axios';

const API_URL = 'http://localhost:8000/auth'

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, {
    username,
    password,
  });
};

const login = (username, password) => {
  // Axios form-data için doğru formatı otomatik olarak gönderir
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  return axios.post(`${API_URL}/token`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

const AuthService = {
  register,
  login,
};

export default AuthService;