import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../services/recipeService';
import { getCountryFlag } from '../utils/countryFlags';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getBookmarks();
      setBookmarks(data);
    } catch (err) {
      setError('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '25px 15px' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>My Bookmarks</h1>
          <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
            {bookmarks.length} saved {bookmarks.length === 1 ? 'recipe' : 'recipes'}
          </p>
        </div>
      </div>

      {/* Bookmarks Grid */}
      <div className="container section-padding">
        {error && (
          <div style={{ 
            background: '#fee', 
            border: '1px solid var(--danger-red)',
            color: 'var(--danger-red)',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {bookmarks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            border: '1px solid var(--border-gray)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔖</div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>No bookmarks yet</h2>
            <p style={{ fontSize: '14px', color: 'var(--light-gray)', marginBottom: '20px' }}>
              Save your favorite recipes to find them easily later
            </p>
            <Link to="/recipes" className="btn-primary">
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid-3">
            {bookmarks.map((recipe) => (
              <Link 
                key={recipe.id} 
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="recipe-card">
                  <img 
                    src={recipe.image_url || 'https://via.placeholder.com/400x300?text=Recipe'} 
                    alt={recipe.title}
                  />
                  <div className="recipe-card-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{getCountryFlag(recipe.country)}</span>
                      <span style={{ fontSize: '12px', color: 'var(--light-gray)', fontWeight: '600' }}>{recipe.country}</span>
                    </div>
                    <h3 className="recipe-card-title">{recipe.title}</h3>
                    
                    <div className="recipe-card-meta">
                      <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                      <span>🍽️ {recipe.servings} servings</span>
                      {recipe.average_rating > 0 && (
                        <span>⭐ {recipe.average_rating.toFixed(1)}</span>
                      )}
                    </div>

                    {recipe.author_name && (
                      <p style={{ 
                        fontSize: '12px',
                        color: 'var(--primary-orange)',
                        marginTop: '8px',
                        fontWeight: '500'
                      }}>
                        By {recipe.author_name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
