import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image || 'https://via.placeholder.com/400x300?text=Recipe'} alt={recipe.title} />
        {recipe.is_premium && <span className="badge-premium">Premium</span>}
      </div>
      
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <span>⏱️ {recipe.prep_time || 30} min</span>
          <span>👤 {recipe.author}</span>
          <span>⭐ {recipe.rating || 4.5}</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;