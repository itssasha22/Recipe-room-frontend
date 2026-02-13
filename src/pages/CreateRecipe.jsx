import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    country: '',
    image_url: ''
  });

  const countries = [
    'Kenya', 'Ethiopia', 'Nigeria', 'Italy', 'Thailand',
    'India', 'Mexico', 'Lebanon', 'South Africa', 'Morocco'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.ingredients || !formData.instructions) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.prep_time || !formData.cook_time || !formData.servings) {
      setError('Please provide prep time, cook time, and servings');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const recipeData = {
        ...formData,
        prep_time: parseInt(formData.prep_time),
        cook_time: parseInt(formData.cook_time),
        servings: parseInt(formData.servings)
      };
      
      const newRecipe = await recipeService.createRecipe(recipeData);
      navigate(`/recipes/${newRecipe.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '25px 15px' }}>
          <button 
            onClick={() => navigate('/recipes')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-orange)',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '10px',
              padding: 0
            }}
          >
            ← Back to Recipes
          </button>
          <h1 style={{ fontSize: '1.75rem' }}>Create New Recipe</h1>
        </div>
      </div>

      {/* Form */}
      <div className="container" style={{ maxWidth: '700px', padding: '30px 15px' }}>
        <div style={{ background: 'white', border: '1px solid var(--border-gray)', padding: '30px' }}>
          {error && (
            <div style={{ 
              background: '#fee', 
              border: '1px solid var(--danger-red)',
              color: 'var(--danger-red)',
              padding: '12px',
              marginBottom: '25px',
              fontSize: '14px',
              borderRadius: '3px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Recipe Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Classic Ugali"
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows="3"
                placeholder="Brief description of your recipe"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Time and Servings - Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{ 
                  fontSize: '14px', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Prep Time (min) *
                </label>
                <input
                  type="number"
                  name="prep_time"
                  value={formData.prep_time}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="15"
                  min="0"
                />
              </div>

              <div>
                <label style={{ 
                  fontSize: '14px', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Cook Time (min) *
                </label>
                <input
                  type="number"
                  name="cook_time"
                  value={formData.cook_time}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="30"
                  min="0"
                />
              </div>

              <div>
                <label style={{ 
                  fontSize: '14px', 
                  display: 'block', 
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  Servings *
                </label>
                <input
                  type="number"
                  name="servings"
                  value={formData.servings}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="4"
                  min="1"
                />
              </div>
            </div>

            {/* Country */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Country of Origin
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Ingredients */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Ingredients *
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="form-input"
                rows="6"
                placeholder="Enter each ingredient on a new line&#10;Example:&#10;2 cups maize flour&#10;4 cups water&#10;1 tsp salt"
                style={{ resize: 'vertical', fontFamily: 'monospace' }}
              />
              <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginTop: '5px' }}>
                One ingredient per line
              </p>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Instructions *
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                className="form-input"
                rows="8"
                placeholder="Enter each step on a new line&#10;Example:&#10;Boil water in a pot&#10;Add maize flour gradually&#10;Stir continuously"
                style={{ resize: 'vertical', fontFamily: 'monospace' }}
              />
              <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginTop: '5px' }}>
                One step per line
              </p>
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ 
                fontSize: '14px', 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Image URL (optional)
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Creating Recipe...' : 'Create Recipe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
