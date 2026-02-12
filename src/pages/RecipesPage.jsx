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
  const [minRating, setMinRating] = useState(0);
  const [maxServings, setMaxServings] = useState(100);
  const [searchIngredient, setSearchIngredient] = useState('');
  
  // Fetch recipes from backend
  useEffect(() => {
    fetchRecipes();
  }, []);
  
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build filters object
      const filters = {};
      if (searchTerm) filters.search = searchTerm;
      if (selectedCountry && selectedCountry !== 'All') {
        filters.country = selectedCountry.replace(/^..\s/, ''); // Remove flag emoji
      }
      if (minRating > 0) filters.min_rating = minRating;
      if (maxServings < 100) filters.max_servings = maxServings;
      if (searchIngredient) filters.ingredient = searchIngredient;
      
      const data = await recipeService.getAllRecipes(filters);
      setRecipes(data);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    fetchRecipes();
  };
  
  const getCountryFlag = (country) => {
    const flags = {
      'Italy': '🇮🇹',
      'France': '🇫🇷',
      'USA': '🇺🇸',
      'China': '🇨🇳',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Mexico': '🇲🇽',
      'Norway': '🇳🇴',
      'Kenya': '🇰🇪'
    };
    return flags[country] || '🌍';
  };

  const countries = ['All', '🇮🇹 Italy', '🇫🇷 France', '🇺🇸 USA', '🇨🇳 China', '🇹🇭 Thailand', '🇻🇳 Vietnam', '🇲🇽 Mexico', '🇳🇴 Norway', '🇰🇪 Kenya'];

  return (
    <div style={{ padding: '2rem', background: '#2c2c2c', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fdba74', textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Global Recipe Collection</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem', fontSize: '1.1rem' }}>Search, Filter & Discover Amazing Recipes</p>
        
        {/* Filter Panel */}
        <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', marginBottom: '3rem', border: '2px solid #8b5cf6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🔍 Search Name</label>
              <input
                type="text"
                placeholder="Recipe name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🥗 Ingredient</label>
              <input
                type="text"
                placeholder="Search ingredient..."
                value={searchIngredient}
                onChange={(e) => setSearchIngredient(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🌍 Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>⭐ Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                <option value={0}>All Ratings</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>👥 Max Servings</label>
              <input
                type="number"
                value={maxServings}
                onChange={(e) => setMaxServings(Number(e.target.value))}
                min="1"
                max="100"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
          </div>
          
          <button 
            onClick={handleSearch} 
            style={{ 
              marginTop: '1rem', 
              width: '100%', 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #8b5cf6, #fdba74)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '700', 
              cursor: 'pointer' 
            }}
          >
            🔍 Apply Filters
          </button>
          
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#fdba74', fontSize: '1.2rem' }}>
            Loading recipes...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444', fontSize: '1.2rem', background: '#1e1e1e', borderRadius: '12px' }}>
            {error}
            <button 
              onClick={fetchRecipes} 
              style={{ 
                display: 'block', 
                margin: '1rem auto', 
                padding: '0.75rem 2rem', 
                background: '#8b5cf6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && !error && recipes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem', padding: '3rem' }}>
            <p>No recipes found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                style={{
                  background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  border: '2px solid #8b5cf6',
                  boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(253, 186, 116, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(139, 92, 246, 0.3)';
                }}
              >
                <img 
                  src={recipe.image_url || 'https://via.placeholder.com/400'} 
                  alt={recipe.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h3 style={{ color: '#fdba74', margin: '0', fontSize: '1.3rem', fontWeight: '700' }}>{recipe.title}</h3>
                    <span style={{ fontSize: '1.5rem' }}>{getCountryFlag(recipe.country)}</span>
                  </div>
                  
                  <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    by {recipe.author || 'Unknown'}
                  </p>
                  
                  <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                    <span>⏱️ {recipe.prep_time + recipe.cook_time || 0} mins</span>
                    <span style={{ marginLeft: '1rem' }}>👥 Serves {recipe.servings || 'N/A'}</span>
                  </div>
                  
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#fbbf24', fontSize: '1rem' }}>
                        {'⭐'.repeat(Math.round(recipe.avg_rating || 0))}{'☆'.repeat(5 - Math.round(recipe.avg_rating || 0))}
                      </span>
                      <span style={{ color: '#888', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
                        ({recipe.rating_count || 0})
                      </span>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.85rem' }}>
                      💬 {recipe.comment_count || 0}
                    </div>
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
