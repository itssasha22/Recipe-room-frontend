import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const RecipesPage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  
  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, selectedCountry]);
  
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {};
      if (searchTerm) filters.search = searchTerm;
      if (selectedCountry && selectedCountry !== 'All') {
        filters.country = selectedCountry;
      }
      
      const data = await recipeService.getAllRecipes(filters);
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const countries = [
    'All', 'Algeria', 'Argentina', 'Australia', 'Belgium', 'Brazil', 'Canada',
    'Chile', 'China', 'Colombia', 'Cuba', 'Denmark', 'Egypt', 'Ethiopia',
    'France', 'Germany', 'Ghana', 'Greece', 'India', 'Indonesia', 'Italy',
    'Jamaica', 'Japan', 'Kenya', 'Korea', 'Lebanon', 'Malaysia', 'Mexico',
    'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Russia', 'Saudi Arabia',
    'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Tanzania',
    'Thailand', 'Tunisia', 'Turkey', 'UAE', 'UK', 'USA', 'Vietnam'
  ];

  return (
    <div style={{ background: 'var(--pure-white)', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--off-white)', padding: '40px 20px', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container">
          <h1 style={{ marginBottom: '10px' }}>All Recipes</h1>
          <p style={{ color: 'var(--medium-gray)', fontSize: '1.125rem' }}>
            Browse our collection of {recipes.length} recipes
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)', padding: '30px 20px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label className="form-label">Search Recipes</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Filter by Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="form-input"
                style={{ cursor: 'pointer' }}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="container" style={{ padding: '40px 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="loading-spinner" />
            <p style={{ color: 'var(--medium-gray)', marginTop: '20px' }}>Loading recipes...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'var(--coral-accent)', marginBottom: '20px', fontSize: '1.125rem' }}>{error}</p>
            <button onClick={fetchRecipes} className="btn">Try Again</button>
          </div>
        ) : recipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h3>No recipes found</h3>
            <p style={{ color: 'var(--medium-gray)' }}>Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid-3">
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className="card"
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'} 
                  alt={recipe.title}
                  className="recipe-card-image"
                />
                <div className="recipe-card-content">
                  <h3 className="recipe-card-title">{recipe.title}</h3>
                  <p style={{ color: 'var(--medium-gray)', fontSize: '14px', marginBottom: '12px' }}>
                    by {recipe.author || 'Anonymous'}
                  </p>
                  <div className="recipe-card-meta">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < Math.round(recipe.avg_rating || 0) ? '#ff9500' : '#ddd' }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{ color: 'var(--medium-gray)', fontSize: '14px' }}>
                      {recipe.prep_time + recipe.cook_time} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
