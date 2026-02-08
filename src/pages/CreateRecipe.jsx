import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    course: 'Starter',
    time: '',
    servings: 4,
    country: '',
    ingredients: [''],
    steps: [''],
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setFormData({ ...formData, image: file });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index) => {
    setFormData({ ...formData, ingredients: formData.ingredients.filter((_, i) => i !== index) });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const updateStep = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const removeStep = (index) => {
    setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    console.log('Recipe created:', formData);
    alert('Recipe created successfully!');
    navigate('/recipes');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#fdba74', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Create New Recipe</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Share your culinary creation with the world</p>

        <form onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #8b5cf6' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Recipe Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter recipe name"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Course *</label>
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              >
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Country *</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
                placeholder="e.g., Italy"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Prep Time *</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                placeholder="e.g., 30 mins"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Servings *</label>
              <input
                type="number"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: Number(e.target.value) })}
                required
                min="1"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Recipe Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ marginTop: '1rem', width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Ingredients *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
                />
                {formData.ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(index)} style={{ padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              + Add Ingredient
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Instructions *</label>
            {formData.steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <textarea
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  rows="2"
                  style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem', resize: 'vertical' }}
                />
                {formData.steps.length > 1 && (
                  <button type="button" onClick={() => removeStep(index)} style={{ padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    ✖
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addStep} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
              + Add Step
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" disabled={uploading} style={{ flex: 1, padding: '1rem', background: uploading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Creating...' : '✓ Create Recipe'}
            </button>
            <button type="button" onClick={() => navigate('/recipes')} style={{ padding: '1rem 2rem', background: '#2a2a2a', color: 'white', border: '2px solid #8b5cf6', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
