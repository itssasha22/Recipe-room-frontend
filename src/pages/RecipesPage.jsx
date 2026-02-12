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
  
  // Fetch recipes from backend with real-time filtering
  useEffect(() => {
    fetchRecipes();
  }, [searchTerm, selectedCountry, minRating, maxServings, searchIngredient]);
  
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
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSearchIngredient('');
    setSelectedCountry('All');
    setMinRating(0);
    setMaxServings(100);
  };
  
  const getCountryFlag = (country) => {
    const flags = {
      // Africa
      'Algeria': '🇩🇿', 'Egypt': '🇪🇬', 'Ethiopia': '🇪🇹', 'Ghana': '🇬🇭', 'Kenya': '🇰🇪',
      'Morocco': '🇲🇦', 'Nigeria': '🇳🇬', 'South Africa': '🇿🇦', 'Tanzania': '🇹🇿', 'Tunisia': '🇹🇳',
      // Asia
      'China': '🇨🇳', 'India': '🇮🇳', 'Indonesia': '🇮🇩', 'Japan': '🇯🇵', 'Korea': '🇰🇷',
      'Lebanon': '🇱🇧', 'Malaysia': '🇲🇾', 'Pakistan': '🇵🇰', 'Philippines': '🇵🇭', 'Singapore': '🇸🇬',
      'Thailand': '🇹🇭', 'Turkey': '🇹🇷', 'Vietnam': '🇻🇳', 'Saudi Arabia': '🇸🇦', 'UAE': '🇦🇪',
      // Europe
      'France': '🇫🇷', 'Germany': '🇩🇪', 'Greece': '🇬🇷', 'Italy': '🇮🇹', 'Spain': '🇪🇸',
      'UK': '🇬🇧', 'Poland': '🇵🇱', 'Portugal': '🇵🇹', 'Russia': '🇷🇺', 'Sweden': '🇸🇪',
      'Norway': '🇳🇴', 'Denmark': '🇩🇰', 'Netherlands': '🇳🇱', 'Belgium': '🇧🇪', 'Switzerland': '🇨🇭',
      // Americas
      'Argentina': '🇦🇷', 'Brazil': '🇧🇷', 'Canada': '🇨🇦', 'Chile': '🇨🇱', 'Colombia': '🇨🇴',
      'Cuba': '🇨🇺', 'Jamaica': '🇯🇲', 'Mexico': '🇲🇽', 'Peru': '🇵🇪', 'USA': '🇺🇸',
      // Oceania
      'Australia': '🇦🇺', 'New Zealand': '🇳🇿'
    };
    return flags[country] || '🌍';
  };

  const countries = [
    'All',
    // Africa
    '🇩🇿 Algeria', '🇪🇬 Egypt', '🇪🇹 Ethiopia', '🇬🇭 Ghana', '🇰🇪 Kenya',
    '🇲🇦 Morocco', '🇳🇬 Nigeria', '🇿🇦 South Africa', '🇹🇿 Tanzania', '🇹🇳 Tunisia',
    // Asia
    '🇨🇳 China', '🇮🇳 India', '🇮🇩 Indonesia', '🇯🇵 Japan', '🇰🇷 Korea',
    '🇱🇧 Lebanon', '🇲🇾 Malaysia', '🇵🇰 Pakistan', '🇵🇭 Philippines', '🇸🇬 Singapore',
    '🇹🇭 Thailand', '🇹🇷 Turkey', '🇻🇳 Vietnam', '🇸🇦 Saudi Arabia', '🇦🇪 UAE',
    // Europe
    '🇫🇷 France', '🇩🇪 Germany', '🇬🇷 Greece', '🇮🇹 Italy', '🇪🇸 Spain',
    '🇬🇧 UK', '🇵🇱 Poland', '🇵🇹 Portugal', '🇷🇺 Russia', '🇸🇪 Sweden',
    '🇳🇴 Norway', '🇩🇰 Denmark', '🇳🇱 Netherlands', '🇧🇪 Belgium', '🇨🇭 Switzerland',
    // Americas
    '🇦🇷 Argentina', '🇧🇷 Brazil', '🇨🇦 Canada', '🇨🇱 Chile', '🇨🇴 Colombia',
    '🇨🇺 Cuba', '🇯🇲 Jamaica', '🇲🇽 Mexico', '🇵🇪 Peru', '🇺🇸 USA',
    // Oceania
    '🇦🇺 Australia', '🇳🇿 New Zealand'
  ];

  return (
    <div style={{ 
      background: 'var(--cream-white)', 
      minHeight: '100vh',
      paddingBottom: '4rem'
    }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--spice-orange), var(--tomato-red))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          marginBottom: '0.75rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          Global Recipe Collection
        </h1>
        <p style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          opacity: 0.95,
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Discover authentic flavors from 23 countries and 37+ hand-picked recipes
        </p>
      </div>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Filter Panel */}
        <div className="card" style={{ 
          marginTop: '-2rem',
          marginBottom: '3rem',
          background: 'white',
          boxShadow: '0 8px 24px rgba(255,107,53,0.12)'
        }}>
          <h3 style={{ 
            color: 'var(--charcoal-black)',
            marginTop: 0,
            marginBottom: '1.5rem',
            fontSize: '1.3rem',
            fontWeight: '700'
          }}>
            🔍 Find Your Perfect Recipe
          </h3>
          
          <div className="grid-2" style={{ gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="form-label">Recipe Name</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Ingredient</label>
              <input
                type="text"
                placeholder="e.g., chicken, tomato..."
                value={searchIngredient}
                onChange={(e) => setSearchIngredient(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Country of Origin</label>
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
            
            <div>
              <label className="form-label">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="form-input"
                style={{ cursor: 'pointer' }}
              >
                <option value={0}>All Ratings</option>
                <option value={1}>⭐ 1+ Stars</option>
                <option value={2}>⭐⭐ 2+ Stars</option>
                <option value={3}>⭐⭐⭐ 3+ Stars</option>
                <option value={4}>⭐⭐⭐⭐ 4+ Stars</option>
                <option value={5}>⭐⭐⭐⭐⭐ 5 Stars Only</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Maximum Servings</label>
              <input
                type="number"
                value={maxServings}
                onChange={(e) => setMaxServings(Number(e.target.value))}
                min="1"
                max="100"
                className="form-input"
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                onClick={handleResetFilters}
                className="btn"
                style={{ 
                  width: '100%',
                  background: 'var(--stone-gray)',
                  color: 'white'
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          <div style={{ 
            padding: '1rem',
            background: 'var(--cream-white)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <span style={{ 
              color: 'var(--herb-green)',
              fontWeight: '700',
              fontSize: '1.1rem'
            }}>
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="loading-spinner" />
            <p style={{ color: 'var(--stone-gray)', marginTop: '1.5rem', fontSize: '1.1rem' }}>
              Loading delicious recipes...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card" style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: 'linear-gradient(135deg, #fee, #fdd)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
            <p style={{ color: 'var(--tomato-red)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {error}
            </p>
            <button 
              onClick={fetchRecipes} 
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && !error && recipes.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
            <h3 style={{ color: 'var(--charcoal-black)', fontSize: '1.5rem', marginBottom: '1rem' }}>
              No recipes found
            </h3>
            <p style={{ color: 'var(--stone-gray)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Try adjusting your filters or search for something else
            </p>
            <button 
              onClick={handleResetFilters}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          !loading && !error && (
            <div className="grid-3">
              {recipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="card"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                    <img 
                      src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'} 
                      alt={recipe.title}
                      style={{ 
                        width: '100%', 
                        height: '240px', 
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    
                    {/* Country Flag Badge */}
                    <span style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      fontSize: '2rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}>
                      {getCountryFlag(recipe.country)}
                    </span>
                    
                    {/* Top Rated Badge */}
                    {recipe.avg_rating >= 4 && (
                      <span className="badge badge-orange" style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem'
                      }}>
                        Top Rated
                      </span>
                    )}
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      color: 'var(--charcoal-black)', 
                      marginTop: 0, 
                      marginBottom: '0.5rem',
                      fontSize: '1.35rem',
                      fontWeight: '700',
                      lineHeight: '1.3'
                    }}>
                      {recipe.title}
                    </h3>
                    
                    <p style={{ 
                      color: 'var(--stone-gray)', 
                      fontSize: '0.95rem',
                      margin: '0.5rem 0 1rem'
                    }}>
                      by {recipe.author || 'Community Chef'}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e8e8e8',
                      marginTop: 'auto'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            style={{ 
                              color: i < Math.round(recipe.avg_rating || 0) ? '#fcbf49' : '#ddd',
                              fontSize: '1.1rem'
                            }}
                          >
                            ★
                          </span>
                        ))}
                        <span style={{ 
                          color: 'var(--stone-gray)', 
                          fontSize: '0.85rem',
                          marginLeft: '0.4rem'
                        }}>
                          ({recipe.rating_count || 0})
                        </span>
                      </div>
                      
                      <div style={{ 
                        display: 'flex',
                        gap: '0.75rem',
                        color: 'var(--stone-gray)', 
                        fontSize: '0.9rem'
                      }}>
                        <span>🕐 {recipe.prep_time + recipe.cook_time} min</span>
                        <span>👥 {recipe.servings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
