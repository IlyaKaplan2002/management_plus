import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

export const API = axios.create({
  baseURL: REACT_APP_API_URL || 'http://localhost:5000',
});

export const setToken = (token: string) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeToken = () => {
  delete API.defaults.headers.common['Authorization'];
};
