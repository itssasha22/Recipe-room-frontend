import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
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