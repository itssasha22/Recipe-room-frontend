/**
 * Recipe Service - API calls for recipe management
 * Connects frontend to backend recipe endpoints
 */

import api from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const recipeService = {
  /**
   * Get all recipes with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} perPage - Items per page (default: 20)
   */
  getAllRecipes: async (page = 1, perPage = 20) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.RECIPES}?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  /**
   * Get a single recipe by ID
   */
  getRecipeById: async (recipeId) => {
    try {
      const response = await api.get(API_ENDPOINTS.RECIPE_BY_ID(recipeId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Get all recipes by a specific user
   */
  getRecipesByUser: async (userId, page = 1, perPage = 20) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.USER_RECIPES(userId)}?page=${page}&per_page=${perPage}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipes for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new recipe
   * @param {Object} recipeData - Recipe information
   * @param {string} recipeData.title - Recipe title (required)
   * @param {string} recipeData.description - Recipe description (optional)
   * @param {string} recipeData.country - Country of origin (optional)
   * @param {Array} recipeData.ingredients - Array of ingredient objects (required)
   *   Each ingredient: { name: string, quantity: string, notes?: string }
   * @param {Array} recipeData.procedure - Array of step objects (required)
   *   Each step: { step: number, instruction: string, notes?: string }
   * @param {number} recipeData.people_served - Number of servings (required)
   * @param {number} recipeData.prep_time - Prep time in minutes (optional)
   * @param {number} recipeData.cook_time - Cook time in minutes (optional)
   * @param {string} recipeData.image - Base64 image or URL (optional)
   */
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post(API_ENDPOINTS.RECIPES, recipeData);
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  },

  /**
   * Update an existing recipe
   */
  updateRecipe: async (recipeId, updateData) => {
    try {
      const response = await api.put(API_ENDPOINTS.RECIPE_BY_ID(recipeId), updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a recipe (soft delete)
   */
  deleteRecipe: async (recipeId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.RECIPE_BY_ID(recipeId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Get recipe edit history
   */
  getRecipeHistory: async (recipeId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.RECIPE_BY_ID(recipeId)}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Discover recipes with filters
   * @param {Object} filters - Filter parameters
   * @param {string} filters.name - Recipe name
   * @param {string} filters.ingredient - Ingredient to search for
   * @param {number} filters.people_served - Number of servings
   * @param {string} filters.country - Country
   * @param {number} filters.rating - Minimum rating
   */
  discoverRecipes: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.get(`${API_ENDPOINTS.RECIPES}/discover?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error discovering recipes:', error);
      throw error;
    }
  },

  /**
   * Rate a recipe (1-5 stars)
   */
  rateRecipe: async (recipeId, ratingValue) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.RECIPE_BY_ID(recipeId)}/rate`, {
        value: ratingValue
      });
      return response.data;
    } catch (error) {
      console.error(`Error rating recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Get recipe rating
   */
  getRecipeRating: async (recipeId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.RECIPE_BY_ID(recipeId)}/rating`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rating for recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Bookmark a recipe
   */
  bookmarkRecipe: async (recipeId) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.RECIPE_BY_ID(recipeId)}/bookmark`);
      return response.data;
    } catch (error) {
      console.error(`Error bookmarking recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Remove bookmark from a recipe
   */
  removeBookmark: async (recipeId) => {
    try {
      const response = await api.delete(`${API_ENDPOINTS.RECIPE_BY_ID(recipeId)}/bookmark`);
      return response.data;
    } catch (error) {
      console.error(`Error removing bookmark from recipe ${recipeId}:`, error);
      throw error;
    }
  },
};

export default recipeService;
