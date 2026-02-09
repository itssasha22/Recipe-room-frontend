import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import recipeSlice from './recipeSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipes: recipeSlice,
  },
});