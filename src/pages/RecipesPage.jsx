import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../services/recipeService';
import { getCountryFlag } from '../utils/countryFlags';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = [
    'Argentina', 'Brazil', 'China', 'Egypt', 'Ethiopia', 'France', 'Ghana',
    'India', 'Indonesia', 'Italy', 'Ivory Coast', 'Japan', 'Kenya', 'Lebanon',
    'Mexico', 'Morocco', 'Nigeria', 'Pakistan', 'Poland', 'Russia', 'Somalia',
    'South Africa', 'Spain', 'Thailand', 'Ukraine'
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [search, selectedCountry, recipes]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (err) {
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let filtered = [...recipes];

    if (search) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase()) ||
        recipe.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCountry) {
      filtered = filtered.filter(recipe => recipe.country === selectedCountry);
    }

    setFilteredRecipes(filtered);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--pure-white)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border-gray)', padding: '40px 20px' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>All Recipes</h1>
          <p style={{ fontSize: '15px', color: 'var(--text-gray)' }}>
            {filteredRecipes.length} delicious recipes to try
          </p>
        </div>
      </div>

      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="🔍 Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ fontSize: '15px', padding: '12px 15px' }}
              />
              
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="form-select"
                style={{ fontSize: '15px', padding: '12px 15px' }}
              >
                <option value="">🌍 All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {getCountryFlag(country)} {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        {filteredRecipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: '15px', color: 'var(--light-gray)' }}>
              No recipes found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredRecipes.map((recipe) => (
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

                    <p style={{ 
                      fontSize: '13px', 
                      color: 'var(--light-gray)',
                      marginTop: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {recipe.description}
                    </p>

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

export default RecipesPage;
