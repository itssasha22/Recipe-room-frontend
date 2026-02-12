import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api.config';

const API_URL = API_BASE_URL;

const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    // Backend returns 'access_token' not 'token'
    const token = response.data.access_token || response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  uploadImage: async (imageData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/auth/upload-image`, imageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    return localStorage.getItem('token');
  }
};

export default authService;