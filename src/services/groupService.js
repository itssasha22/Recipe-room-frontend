/**
 * Group Service - API calls for group management
 * Connects frontend to backend group endpoints
 */

import api from './api';
import { API_ENDPOINTS } from '../config/api.config';

export const groupService = {
  /**
   * Get all groups for the current user
   */
  getUserGroups: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GROUPS);
      return response.data;
    } catch (error) {
      console.error('Error fetching user groups:', error);
      throw error;
    }
  },

  /**
   * Get group details by ID
   */
  getGroupById: async (groupId) => {
    try {
      const response = await api.get(API_ENDPOINTS.GROUP_BY_ID(groupId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new group
   * @param {Object} groupData - Group information
   * @param {string} groupData.name - Group name (required)
   * @param {string} groupData.description - Group description (optional)
   * @param {number} groupData.max_members - Maximum members allowed (optional, default: 10)
   * @param {string} groupData.image - Base64 image or URL (optional)
   */
  createGroup: async (groupData) => {
    try {
      const response = await api.post(API_ENDPOINTS.GROUPS, groupData);
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  /**
   * Update group details
   * Only the owner can update
   */
  updateGroup: async (groupId, updateData) => {
    try {
      const response = await api.put(API_ENDPOINTS.GROUP_BY_ID(groupId), updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Delete (deactivate) a group
   * Only the owner can delete
   */
  deleteGroup: async (groupId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.GROUP_BY_ID(groupId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Get all recipes in a group
   */
  getGroupRecipes: async (groupId) => {
    try {
      const response = await api.get(API_ENDPOINTS.GROUP_RECIPES(groupId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching recipes for group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Add a recipe to a group
   */
  addRecipeToGroup: async (groupId, recipeId) => {
    try {
      const response = await api.post(API_ENDPOINTS.GROUP_RECIPE(groupId, recipeId));
      return response.data;
    } catch (error) {
      console.error(`Error adding recipe ${recipeId} to group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Remove a recipe from a group
   */
  removeRecipeFromGroup: async (groupId, recipeId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.GROUP_RECIPE(groupId, recipeId));
      return response.data;
    } catch (error) {
      console.error(`Error removing recipe ${recipeId} from group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Add a member to a group
   * @param {number} groupId - Group ID
   * @param {number} userId - User ID to add
   */
  addMemberToGroup: async (groupId, userId) => {
    try {
      const response = await api.post(API_ENDPOINTS.GROUP_MEMBERS(groupId), { user_id: userId });
      return response.data;
    } catch (error) {
      console.error(`Error adding member ${userId} to group ${groupId}:`, error);
      throw error;
    }
  },

  /**
   * Remove a member from a group
   */
  removeMemberFromGroup: async (groupId, userId) => {
    try {
      const response = await api.delete(API_ENDPOINTS.GROUP_MEMBER(groupId, userId));
      return response.data;
    } catch (error) {
      console.error(`Error removing member ${userId} from group ${groupId}:`, error);
      throw error;
    }
  },
};

export default groupService;
