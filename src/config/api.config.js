/**
 * Centralized API Configuration
 * This file manages all API endpoints and configurations
 */

// Get API base URL from environment variable or use default
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Environment
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_PROFILE: '/auth/profile',
  AUTH_UPLOAD_IMAGE: '/auth/upload-image',
  
  // Recipes
  RECIPES: '/recipes',
  RECIPE_BY_ID: (id) => `/recipes/${id}`,
  USER_RECIPES: (userId) => `/recipes/user/${userId}`,
  
  // Groups
  GROUPS: '/groups',
  GROUP_BY_ID: (id) => `/groups/${id}`,
  GROUP_MEMBERS: (groupId) => `/groups/${groupId}/members`,
  GROUP_MEMBER: (groupId, userId) => `/groups/${groupId}/members/${userId}`,
  GROUP_RECIPES: (groupId) => `/groups/${groupId}/recipes`,
  GROUP_RECIPE: (groupId, recipeId) => `/groups/${groupId}/recipes/${recipeId}`,
  
  // Payments
  PAYMENT_INITIATE: '/payments/initiate',
  PAYMENT_STATUS: (paymentId) => `/payments/status/${paymentId}`,
  
  // Search
  SEARCH: '/search',
  
  // Comments
  COMMENTS_BY_RECIPE: (recipeId) => `/comments/recipe/${recipeId}`,
  COMMENT_CREATE: '/comments',
  COMMENT_UPDATE: (commentId) => `/comments/${commentId}`,
  COMMENT_DELETE: (commentId) => `/comments/${commentId}`,
};

// Helper function to get full URL
export const getFullUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  getFullUrl,
};
