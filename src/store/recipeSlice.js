//a simple redux for managing recipes
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL (configure based on environment)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// ASYNC THUNKS - API calls
//etch all recipes with pagination
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async ({ page = 1, perPage = 20 } = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recipes/`, {
                params: { page, per_page: perPage }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to fetch recipes' });
        }
    }
);

//fetch recipe by id
export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchRecipeById',
    async (recipeId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`);
            return response.data.recipe;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Recipe not found' });
        }
    }
);
//create a new recipe
export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (recipeData, { rejectWithValue, getState }) => {
        try {
            // Get auth token from state (assuming Sasha's auth slice)
            const token = getState().auth?.token;

            const response = await axios.post(
                `${API_BASE_URL}/recipes/`,
                recipeData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.recipe;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to create recipe' });
        }
    }
);

//update a recipe
export const updateRecipe = createAsyncThunk(
    'recipes/updateRecipe',
    async ({ recipeId, updates }, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            const response = await axios.put(
                `${API_BASE_URL}/recipes/${recipeId}`,
                updates,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.recipe;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to update recipe' });
        }
    }
);

//to delete a recipe
export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (recipeId, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth?.token;

            await axios.delete(
                `${API_BASE_URL}/recipes/${recipeId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return recipeId;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to delete recipe' });
        }
    }
);

/**
 * Fetch recipes by user ID
 */
export const fetchUserRecipes = createAsyncThunk(
    'recipes/fetchUserRecipes',
    async ({ userId, page = 1, perPage = 20 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/recipes/user/${userId}`,
                {
                    params: { page, per_page: perPage }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { error: 'Failed to fetch user recipes' });
        }
    }
);

// SLICE
const initialState = {
    // Recipe list state
    recipeList: [],
    currentRecipe: null,
    userRecipes: [],

    // Pagination state
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        perPage: 20,
        hasNext: false,
        hasPrev: false
    },

    // Loading states (separate for different operations)
    loading: {
        fetchAll: false,
        fetchSingle: false,
        create: false,
        update: false,
        delete: false,
        fetchUser: false
    },

    // Error states
    error: {
        fetchAll: null,
        fetchSingle: null,
        create: null,
        update: null,
        delete: null,
        fetchUser: null
    },

    // UI state
    filters: {
        searchTerm: '',
        country: null,
        minRating: null,
        peopleServed: null
    }
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        // to clear current recipe (useful when leaving recipe detail page)
        clearCurrentRecipe: (state) => {
            state.currentRecipe = null;
        },

        //to update filter state
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },

        // Clear filters
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },

        // Clear all errors
        clearErrors: (state) => {
            state.error = initialState.error;
        },

        // Clear specific error
        clearError: (state, action) => {
            const errorType = action.payload;
            if (state.error[errorType]) {
                state.error[errorType] = null;
            }
        }
    },
    extraReducers: (builder) => {
        // ========================================================================
        // FETCH ALL RECIPES
        // ========================================================================
        builder.addCase(fetchRecipes.pending, (state) => {
            state.loading.fetchAll = true;
            state.error.fetchAll = null;
        });
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.loading.fetchAll = false;
            state.recipeList = action.payload.recipes;
            state.pagination = action.payload.pagination;
        });
        builder.addCase(fetchRecipes.rejected, (state, action) => {
            state.loading.fetchAll = false;
            state.error.fetchAll = action.payload?.message || 'Failed to load recipes';
        });

        // ========================================================================
        // FETCH SINGLE RECIPE
        // ========================================================================
        builder.addCase(fetchRecipeById.pending, (state) => {
            state.loading.fetchSingle = true;
            state.error.fetchSingle = null;
        });
        builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
            state.loading.fetchSingle = false;
            state.currentRecipe = action.payload;
        });
        builder.addCase(fetchRecipeById.rejected, (state, action) => {
            state.loading.fetchSingle = false;
            state.error.fetchSingle = action.payload?.message || 'Recipe not found';
        });

        //clear reecipe
        builder.addCase(createRecipe.pending, (state) => {
            state.loading.create = true;
            state.error.create = null;
        });
        builder.addCase(createRecipe.fulfilled, (state, action) => {
            state.loading.create = false;
            // Add new recipe to the beginning of the list
            state.recipeList.unshift(action.payload);
            state.currentRecipe = action.payload;
        });
        builder.addCase(createRecipe.rejected, (state, action) => {
            state.loading.create = false;
            state.error.create = action.payload?.message || 'Failed to create recipe';
        });

        //update recipe
        builder.addCase(updateRecipe.pending, (state) => {
            state.loading.update = true;
            state.error.update = null;
        });
        builder.addCase(updateRecipe.fulfilled, (state, action) => {
            state.loading.update = false;

            // Update in recipe list
            const index = state.recipeList.findIndex(
                recipe => recipe.recipe_id === action.payload.recipe_id
            );
            if (index !== -1) {
                state.recipeList[index] = action.payload;
            }

            // Update current recipe if it matches
            if (state.currentRecipe?.recipe_id === action.payload.recipe_id) {
                state.currentRecipe = action.payload;
            }
        });
        builder.addCase(updateRecipe.rejected, (state, action) => {
            state.loading.update = false;
            state.error.update = action.payload?.message || 'Failed to update recipe';
        });

        //Deleting recipe
        builder.addCase(deleteRecipe.pending, (state) => {
            state.loading.delete = true;
            state.error.delete = null;
        });
        builder.addCase(deleteRecipe.fulfilled, (state, action) => {
            state.loading.delete = false;

            // Remove from recipe list
            state.recipeList = state.recipeList.filter(
                recipe => recipe.recipe_id !== action.payload
            );

            // Clear current recipe if it was deleted
            if (state.currentRecipe?.recipe_id === action.payload) {
                state.currentRecipe = null;
            }
        });
        builder.addCase(deleteRecipe.rejected, (state, action) => {
            state.loading.delete = false;
            state.error.delete = action.payload?.message || 'Failed to delete recipe';
        });

        //fetching the users recipes
        builder.addCase(fetchUserRecipes.pending, (state) => {
            state.loading.fetchUser = true;
            state.error.fetchUser = null;
        });
        builder.addCase(fetchUserRecipes.fulfilled, (state, action) => {
            state.loading.fetchUser = false;
            state.userRecipes = action.payload.recipes;
        });
        builder.addCase(fetchUserRecipes.rejected, (state, action) => {
            state.loading.fetchUser = false;
            state.error.fetchUser = action.payload?.message || 'Failed to load user recipes';
        });
    }
});

// Export actions
export const {
    clearCurrentRecipe,
    setFilters,
    clearFilters,
    clearErrors,
    clearError
} = recipeSlice.actions;

// Export selectors
export const selectRecipes = (state) => state.recipes.recipeList;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectUserRecipes = (state) => state.recipes.userRecipes;
export const selectPagination = (state) => state.recipes.pagination;
export const selectRecipeLoading = (state) => state.recipes.loading;
export const selectRecipeErrors = (state) => state.recipes.error;
export const selectFilters = (state) => state.recipes.filters;
// Export reducer
export default recipeSlice.reducer;
