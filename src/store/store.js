import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import recipeReducer from './recipeSlice';
import groupReducer from './groupSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipeReducer,
        groups: groupReducer
    }
});

export default store;
