import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    currentRecipe: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      category: '',
      difficulty: '',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setRecipes, setCurrentRecipe, setFilters, setError } = recipeSlice.actions;
export default recipeSlice.reducer;