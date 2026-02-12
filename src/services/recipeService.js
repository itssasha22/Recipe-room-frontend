/**
 * Recipe Service - API calls for recipe management
 * Connects frontend to backend recipe endpoints
 */

import api from './api';

const API_BASE = '/recipes';
const COMMENTS_BASE = '/comments';
const RATINGS_BASE = '/ratings';
const BOOKMARKS_BASE = '/bookmarks';

export const recipeService = {
  /**
   * Get all recipes with optional filters
   * @param {Object} filters - Filter parameters
   * @param {string} filters.search - Search term for recipe name
   * @param {string} filters.country - Filter by country
   * @param {number} filters.min_rating - Minimum average rating
   * @param {number} filters.max_servings - Maximum servings
   * @param {string} filters.ingredient - Search for ingredient
   * @param {string} filters.sort_by - Sort by (created_at, rating, title)
   */
  getAllRecipes: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const url = params ? `${API_BASE}?${params}` : API_BASE;
      const response = await api.get(url);
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
      const response = await api.get(`${API_BASE}/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Get all recipes by a specific user
   */
  getRecipesByUser: async (userId) => {
    try {
      const response = await api.get(`${API_BASE}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipes for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new recipe
   */
  createRecipe: async (recipeData) => {
    try {
      const response = await api.post(API_BASE, recipeData);
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
      const response = await api.put(`${API_BASE}/${recipeId}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a recipe
   */
  deleteRecipe: async (recipeId) => {
    try {
      const response = await api.delete(`${API_BASE}/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting recipe ${recipeId}:`, error);
      throw error;
    }
  },

  // Comment Methods
  /**
   * Get all comments for a recipe
   */
  getRecipeComments: async (recipeId) => {
    try {
      const response = await api.get(`${COMMENTS_BASE}/recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Add a comment to a recipe
   */
  addComment: async (recipeId, content) => {
    try {
      const response = await api.post(COMMENTS_BASE, { recipe_id: recipeId, content });
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Update a comment
   */
  updateComment: async (commentId, content) => {
    try {
      const response = await api.put(`${COMMENTS_BASE}/${commentId}`, { content });
      return response.data;
    } catch (error) {
      console.error(`Error updating comment ${commentId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a comment
   */
  deleteComment: async (commentId) => {
    try {
      const response = await api.delete(`${COMMENTS_BASE}/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment ${commentId}:`, error);
      throw error;
    }
  },

  // Rating Methods
  /**
   * Get ratings for a recipe
   */
  getRecipeRatings: async (recipeId) => {
    try {
      const response = await api.get(`${RATINGS_BASE}/recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ratings for recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Rate a recipe (1-5 stars)
   */
  rateRecipe: async (recipeId, rating) => {
    try {
      const response = await api.post(RATINGS_BASE, { recipe_id: recipeId, rating });
      return response.data;
    } catch (error) {
      console.error(`Error rating recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Get current user's rating for a recipe
   */
  getUserRating: async (recipeId) => {
    try {
      const response = await api.get(`${RATINGS_BASE}/user/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user rating for recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a rating
   */
  deleteRating: async (ratingId) => {
    try {
      const response = await api.delete(`${RATINGS_BASE}/${ratingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting rating ${ratingId}:`, error);
      throw error;
    }
  },

  // Bookmark Methods
  /**
   * Get all bookmarked recipes for current user
   */
  getBookmarks: async () => {
    try {
      const response = await api.get(BOOKMARKS_BASE);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  },

  /**
   * Bookmark a recipe
   */
  bookmarkRecipe: async (recipeId) => {
    try {
      const response = await api.post(BOOKMARKS_BASE, { recipe_id: recipeId });
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
      const response = await api.delete(`${BOOKMARKS_BASE}/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing bookmark from recipe ${recipeId}:`, error);
      throw error;
    }
  },

  /**
   * Check if recipe is bookmarked
   */
  checkBookmark: async (recipeId) => {
    try {
      const response = await api.get(`${BOOKMARKS_BASE}/check/${recipeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error checking bookmark for recipe ${recipeId}:`, error);
      throw error;
    }
  },
};

export default recipeService;
