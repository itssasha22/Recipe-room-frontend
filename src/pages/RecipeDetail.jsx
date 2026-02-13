import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import recipeService from '../services/recipeService';
import BookmarkButton from '../components/BookmarkButton';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const data = await recipeService.getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    
    try {
      setSubmitting(true);
      await recipeService.rateRecipe(id, rating, comment);
      await fetchRecipe(); // Refresh to show new rating/comment
      setRating(0);
      setComment('');
    } catch (err) {
      setError('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--danger-red)', marginBottom: '15px' }}>{error || 'Recipe not found'}</p>
        <button onClick={() => navigate('/recipes')} className="btn-secondary">
          ← Back to Recipes
        </button>
      </div>
    );
  }

  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Recipe Header */}
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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{recipe.title}</h1>
              {recipe.author_name && (
                <p style={{ fontSize: '14px', color: 'var(--primary-orange)', fontWeight: '500' }}>
                  By {recipe.author_name}
                </p>
              )}
            </div>
            
            {currentUser && (
              <BookmarkButton recipeId={recipe.id} initialBookmarked={recipe.is_bookmarked} />
            )}
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Recipe Image */}
        <div style={{ margin: '30px -15px', width: 'calc(100% + 30px)' }}>
          <img 
            src={recipe.image_url || 'https://via.placeholder.com/800x500?text=Recipe'} 
            alt={recipe.title}
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              borderRadius: 0
            }}
          />
        </div>

        {/* Meta Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '15px',
          background: 'white',
          padding: '20px',
          border: '1px solid var(--border-gray)',
          marginBottom: '30px'
        }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginBottom: '5px' }}>PREP TIME</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{recipe.prep_time} min</p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginBottom: '5px' }}>COOK TIME</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{recipe.cook_time} min</p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginBottom: '5px' }}>TOTAL</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{totalTime} min</p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginBottom: '5px' }}>SERVINGS</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{recipe.servings}</p>
          </div>
          {recipe.average_rating > 0 && (
            <div>
              <p style={{ fontSize: '12px', color: 'var(--light-gray)', marginBottom: '5px' }}>RATING</p>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>⭐ {recipe.average_rating.toFixed(1)}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ background: 'white', padding: '25px', border: '1px solid var(--border-gray)', marginBottom: '30px' }}>
          <p style={{ fontSize: '15px', lineHeight: '1.7' }}>{recipe.description}</p>
        </div>

        {/* Ingredients */}
        <div style={{ background: 'white', padding: '25px', border: '1px solid var(--border-gray)', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Ingredients</h2>
          <ul style={{ paddingLeft: '20px', fontSize: '15px', lineHeight: '2' }}>
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div style={{ background: 'white', padding: '25px', border: '1px solid var(--border-gray)', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Instructions</h2>
          <ol style={{ paddingLeft: '20px', fontSize: '15px', lineHeight: '2' }}>
            {recipe.instructions.split('\n').map((instruction, index) => (
              <li key={index} style={{ marginBottom: '12px' }}>{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Rating Form */}
        {currentUser && (
          <div style={{ background: 'white', padding: '25px', border: '1px solid var(--border-gray)', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Rate This Recipe</h2>
            
            <form onSubmit={handleRatingSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '10px' }}>
                  Your Rating
                </label>
                <div style={{ display: 'flex', gap: '8px', fontSize: '28px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        opacity: star <= rating ? 1 : 0.3,
                        transition: 'opacity 0.2s'
                      }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Add your comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-input"
                rows="3"
                style={{ marginBottom: '15px', resize: 'vertical' }}
              />

              <button 
                type="submit" 
                className="btn-primary"
                disabled={rating === 0 || submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </form>
          </div>
        )}

        {/* Comments Section */}
        {recipe.ratings && recipe.ratings.length > 0 && (
          <div style={{ background: 'white', padding: '25px', border: '1px solid var(--border-gray)', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>
              Reviews ({recipe.ratings.length})
            </h2>
            
            {recipe.ratings.map((ratingItem) => (
              <div 
                key={ratingItem.id}
                style={{ 
                  borderBottom: '1px solid var(--border-gray)',
                  paddingBottom: '15px',
                  marginBottom: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>
                    {ratingItem.user_name || 'Anonymous'}
                  </span>
                  <span style={{ fontSize: '16px' }}>
                    {'⭐'.repeat(ratingItem.rating)}
                  </span>
                </div>
                {ratingItem.comment && (
                  <p style={{ fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.6' }}>
                    {ratingItem.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
