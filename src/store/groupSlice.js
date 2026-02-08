/**
 * Recipe-Room Frontend - Group Recipe Redux Slice
 * Author: Alex Maingi
 * Role: Recipes CRUD & Group Recipes
 * 
 * Redux Toolkit slice for managing group recipe collaboration.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ============================================================================
// ASYNC THUNKS - Group Operations
// ============================================================================

/**
 * Fetch all groups the current user belongs to
 */
export const fetchUserGroups = createAsyncThunk(
    'groups/fetchUserGroups',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.get(`${API_BASE_URL}/groups/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.groups;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to fetch groups' });
        }
    }
);

/**
 * Fetch single group by ID
 */
export const fetchGroupById = createAsyncThunk(
    'groups/fetchGroupById',
    async (groupId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.get(`${API_BASE_URL}/groups/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.group;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Group not found' });
        }
    }
);

/**
 * Create a new group
 */
export const createGroup = createAsyncThunk(
    'groups/createGroup',
    async (groupData, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.post(
                `${API_BASE_URL}/groups/`,
                groupData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.group;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to create group' });
        }
    }
);

/**
 * Update group details
 */
export const updateGroup = createAsyncThunk(
    'groups/updateGroup',
    async ({ groupId, updates }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.put(
                `${API_BASE_URL}/groups/${groupId}`,
                updates,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.group;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to update group' });
        }
    }
);

/**
 * Delete a group
 */
export const deleteGroup = createAsyncThunk(
    'groups/deleteGroup',
    async (groupId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            await axios.delete(`${API_BASE_URL}/groups/${groupId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return groupId;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to delete group' });
        }
    }
);

/**
 * Add member to group
 */
export const addGroupMember = createAsyncThunk(
    'groups/addMember',
    async ({ groupId, userId }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.post(
                `${API_BASE_URL}/groups/${groupId}/members`,
                { user_id: userId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.group;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to add member' });
        }
    }
);

/**
 * Remove member from group
 */
export const removeGroupMember = createAsyncThunk(
    'groups/removeMember',
    async ({ groupId, userId }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            await axios.delete(
                `${API_BASE_URL}/groups/${groupId}/members/${userId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            return { groupId, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to remove member' });
        }
    }
);

/**
 * Fetch recipes for a specific group
 */
export const fetchGroupRecipes = createAsyncThunk(
    'groups/fetchGroupRecipes',
    async (groupId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.get(
                `${API_BASE_URL}/groups/${groupId}/recipes`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            return { groupId, recipes: response.data.recipes };
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to fetch group recipes' });
        }
    }
);

/**
 * Add recipe to group
 */
export const addRecipeToGroup = createAsyncThunk(
    'groups/addRecipeToGroup',
    async ({ groupId, recipeId }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            await axios.post(
                `${API_BASE_URL}/groups/${groupId}/recipes/${recipeId}`,
                {},
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            return { groupId, recipeId };
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to add recipe to group' });
        }
    }
);

/**
 * Remove recipe from group
 */
export const removeRecipeFromGroup = createAsyncThunk(
    'groups/removeRecipeFromGroup',
    async ({ groupId, recipeId }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            await axios.delete(
                `${API_BASE_URL}/groups/${groupId}/recipes/${recipeId}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            return { groupId, recipeId };
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to remove recipe from group' });
        }
    }
);

// ============================================================================
// SLICE DEFINITION
// ============================================================================

const initialState = {
    // Group data
    groups: [],
    currentGroup: null,
    groupRecipes: {},  // Keyed by group_id

    // Loading states
    loading: {
        fetchGroups: false,
        fetchGroup: false,
        createGroup: false,
        updateGroup: false,
        deleteGroup: false,
        addMember: false,
        removeMember: false,
        fetchRecipes: false,
        addRecipe: false,
        removeRecipe: false
    },

    // Error states
    error: {
        fetchGroups: null,
        fetchGroup: null,
        createGroup: null,
        updateGroup: null,
        deleteGroup: null,
        addMember: null,
        removeMember: null,
        fetchRecipes: null,
        addRecipe: null,
        removeRecipe: null
    }
};

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        clearCurrentGroup: (state) => {
            state.currentGroup = null;
        },

        clearGroupErrors: (state) => {
            state.error = initialState.error;
        },

        clearGroupError: (state, action) => {
            const errorType = action.payload;
            if (state.error[errorType]) {
                state.error[errorType] = null;
            }
        }
    },
    extraReducers: (builder) => {
        // ========================================================================
        // FETCH USER GROUPS
        // ========================================================================
        builder.addCase(fetchUserGroups.pending, (state) => {
            state.loading.fetchGroups = true;
            state.error.fetchGroups = null;
        });
        builder.addCase(fetchUserGroups.fulfilled, (state, action) => {
            state.loading.fetchGroups = false;
            state.groups = action.payload;
        });
        builder.addCase(fetchUserGroups.rejected, (state, action) => {
            state.loading.fetchGroups = false;
            state.error.fetchGroups = action.payload?.message || 'Failed to load groups';
        });

        // ========================================================================
        // FETCH SINGLE GROUP
        // ========================================================================
        builder.addCase(fetchGroupById.pending, (state) => {
            state.loading.fetchGroup = true;
            state.error.fetchGroup = null;
        });
        builder.addCase(fetchGroupById.fulfilled, (state, action) => {
            state.loading.fetchGroup = false;
            state.currentGroup = action.payload;
        });
        builder.addCase(fetchGroupById.rejected, (state, action) => {
            state.loading.fetchGroup = false;
            state.error.fetchGroup = action.payload?.message || 'Group not found';
        });

        // ========================================================================
        // CREATE GROUP
        // ========================================================================
        builder.addCase(createGroup.pending, (state) => {
            state.loading.createGroup = true;
            state.error.createGroup = null;
        });
        builder.addCase(createGroup.fulfilled, (state, action) => {
            state.loading.createGroup = false;
            state.groups.unshift(action.payload);
            state.currentGroup = action.payload;
        });
        builder.addCase(createGroup.rejected, (state, action) => {
            state.loading.createGroup = false;
            state.error.createGroup = action.payload?.message || 'Failed to create group';
        });

        // ========================================================================
        // UPDATE GROUP
        // ========================================================================
        builder.addCase(updateGroup.pending, (state) => {
            state.loading.updateGroup = true;
            state.error.updateGroup = null;
        });
        builder.addCase(updateGroup.fulfilled, (state, action) => {
            state.loading.updateGroup = false;

            const index = state.groups.findIndex(g => g.group_id === action.payload.group_id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }

            if (state.currentGroup?.group_id === action.payload.group_id) {
                state.currentGroup = action.payload;
            }
        });
        builder.addCase(updateGroup.rejected, (state, action) => {
            state.loading.updateGroup = false;
            state.error.updateGroup = action.payload?.message || 'Failed to update group';
        });

        // ========================================================================
        // DELETE GROUP
        // ========================================================================
        builder.addCase(deleteGroup.pending, (state) => {
            state.loading.deleteGroup = true;
            state.error.deleteGroup = null;
        });
        builder.addCase(deleteGroup.fulfilled, (state, action) => {
            state.loading.deleteGroup = false;
            state.groups = state.groups.filter(g => g.group_id !== action.payload);

            if (state.currentGroup?.group_id === action.payload) {
                state.currentGroup = null;
            }
        });
        builder.addCase(deleteGroup.rejected, (state, action) => {
            state.loading.deleteGroup = false;
            state.error.deleteGroup = action.payload?.message || 'Failed to delete group';
        });

        // ========================================================================
        // ADD MEMBER
        // ========================================================================
        builder.addCase(addGroupMember.pending, (state) => {
            state.loading.addMember = true;
            state.error.addMember = null;
        });
        builder.addCase(addGroupMember.fulfilled, (state, action) => {
            state.loading.addMember = false;

            const index = state.groups.findIndex(g => g.group_id === action.payload.group_id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }

            if (state.currentGroup?.group_id === action.payload.group_id) {
                state.currentGroup = action.payload;
            }
        });
        builder.addCase(addGroupMember.rejected, (state, action) => {
            state.loading.addMember = false;
            state.error.addMember = action.payload?.message || 'Failed to add member';
        });

        // ========================================================================
        // REMOVE MEMBER
        // ========================================================================
        builder.addCase(removeGroupMember.pending, (state) => {
            state.loading.removeMember = true;
            state.error.removeMember = null;
        });
        builder.addCase(removeGroupMember.fulfilled, (state, action) => {
            state.loading.removeMember = false;
        });
        builder.addCase(removeGroupMember.rejected, (state, action) => {
            state.loading.removeMember = false;
            state.error.removeMember = action.payload?.message || 'Failed to remove member';
        });

        // ========================================================================
        // FETCH GROUP RECIPES
        // ========================================================================
        builder.addCase(fetchGroupRecipes.pending, (state) => {
            state.loading.fetchRecipes = true;
            state.error.fetchRecipes = null;
        });
        builder.addCase(fetchGroupRecipes.fulfilled, (state, action) => {
            state.loading.fetchRecipes = false;
            state.groupRecipes[action.payload.groupId] = action.payload.recipes;
        });
        builder.addCase(fetchGroupRecipes.rejected, (state, action) => {
            state.loading.fetchRecipes = false;
            state.error.fetchRecipes = action.payload?.message || 'Failed to load recipes';
        });
    }
});

// Export actions
export const {
    clearCurrentGroup,
    clearGroupErrors,
    clearGroupError
} = groupSlice.actions;

// Export selectors
export const selectGroups = (state) => state.groups.groups;
export const selectCurrentGroup = (state) => state.groups.currentGroup;
export const selectGroupRecipes = (groupId) => (state) => state.groups.groupRecipes[groupId] || [];
export const selectGroupLoading = (state) => state.groups.loading;
export const selectGroupErrors = (state) => state.groups.error;

// Export reducer
export default groupSlice.reducer;
