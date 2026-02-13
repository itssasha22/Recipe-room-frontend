import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    country: '',
    people_served: 4,
    prep_time: '',
    cook_time: '',
    ingredients: [{ name: '', quantity: '', notes: '' }],
    procedure: [{ step: 1, instruction: '', notes: '' }]
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = () => {
    setFormData({ 
      ...formData, 
      ingredients: [...formData.ingredients, { name: '', quantity: '', notes: '' }] 
    });
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData({ 
        ...formData, 
        ingredients: formData.ingredients.filter((_, i) => i !== index) 
      });
    }
  };

  const addStep = () => {
    setFormData({ 
      ...formData, 
      procedure: [...formData.procedure, { step: formData.procedure.length + 1, instruction: '', notes: '' }] 
    });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...formData.procedure];
    newSteps[index][field] = value;
    setFormData({ ...formData, procedure: newSteps });
  };

  const removeStep = (index) => {
    if (formData.procedure.length > 1) {
      const newSteps = formData.procedure
        .filter((_, i) => i !== index)
        .map((step, idx) => ({ ...step, step: idx + 1 }));
      setFormData({ ...formData, procedure: newSteps });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim()) {
      setError('Recipe title is required');
      return;
    }

    if (formData.ingredients.some(ing => !ing.name.trim() || !ing.quantity.trim())) {
      setError('All ingredients must have a name and quantity');
      return;
    }

    if (formData.procedure.some(step => !step.instruction.trim())) {
      setError('All procedure steps must have instructions');
      return;
    }

    try {
      setUploading(true);

      // Prepare data in the format backend expects
      const recipeData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        country: formData.country.trim() || null,
        ingredients: formData.ingredients.map(ing => ({
          name: ing.name.trim(),
          quantity: ing.quantity.trim(),
          notes: ing.notes.trim() || ''
        })),
        procedure: formData.procedure.map((step, idx) => ({
          step: idx + 1,
          instruction: step.instruction.trim(),
          notes: step.notes.trim() || ''
        })),
        people_served: parseInt(formData.people_served) || 1,
        prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
        cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
      };

      console.log('Creating recipe with data:', recipeData);

      const response = await recipeService.createRecipe(recipeData);

      if (response.success) {
        alert('Recipe created successfully!');
        navigate('/recipes');
      } else {
        setError(response.message || 'Failed to create recipe');
      }
    } catch (err) {
      console.error('Error creating recipe:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create recipe. Please try again.';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#fdba74', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Create New Recipe</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Share your culinary creation with the world</p>

        {error && (
          <div style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #8b5cf6' }}>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Recipe Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter recipe title"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your recipe..."
              rows="3"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., Italy, Kenya"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Servings *</label>
              <input
                type="number"
                value={formData.people_served}
                onChange={(e) => setFormData({ ...formData, people_served: Number(e.target.value) })}
                required
                min="1"
                max="1000"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Prep Time (minutes)</label>
              <input
                type="number"
                value={formData.prep_time}
                onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                placeholder="e.g., 30"
                min="0"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Cook Time (minutes)</label>
              <input
                type="number"
                value={formData.cook_time}
                onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                placeholder="e.g., 45"
                min="0"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Ingredients *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                    placeholder="Ingredient name"
                    required
                    style={{ flex: 2, padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#1e1e1e', color: 'white', fontSize: '1rem' }}
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                    required
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#1e1e1e', color: 'white', fontSize: '1rem' }}
                  />
                  {formData.ingredients.length > 1 && (
                    <button type="button" onClick={() => removeIngredient(index)} style={{ padding: '0.75rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                      ✖
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={ingredient.notes}
                  onChange={(e) => updateIngredient(index, 'notes', e.target.value)}
                  placeholder="Optional notes (e.g., chopped, diced)"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #555', background: '#1e1e1e', color: '#aaa', fontSize: '0.9rem' }}
                />
              </div>
            ))}
            <button type="button" onClick={addIngredient} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
              + Add Ingredient
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Instructions *</label>
            {formData.procedure.map((step, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', background: '#8b5cf6', color: 'white', borderRadius: '8px', fontWeight: '600', minWidth: '45px', textAlign: 'center' }}>
                    {step.step}
                  </div>
                  <textarea
                    value={step.instruction}
                    onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                    placeholder={`Step ${index + 1} instructions`}
                    required
                    rows="2"
                    style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#1e1e1e', color: 'white', fontSize: '1rem', resize: 'vertical' }}
                  />
                  {formData.procedure.length > 1 && (
                    <button type="button" onClick={() => removeStep(index)} style={{ padding: '0.75rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                      ✖
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={step.notes}
                  onChange={(e) => updateStep(index, 'notes', e.target.value)}
                  placeholder="Optional notes"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #555', background: '#1e1e1e', color: '#aaa', fontSize: '0.9rem' }}
                />
              </div>
            ))}
            <button type="button" onClick={addStep} style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
              + Add Step
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" disabled={uploading} style={{ flex: 1, padding: '1rem', background: uploading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Creating...' : '✓ Create Recipe'}
            </button>
            <button type="button" onClick={() => navigate('/recipes')} disabled={uploading} style={{ padding: '1rem 2rem', background: '#2a2a2a', color: 'white', border: '2px solid #8b5cf6', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
