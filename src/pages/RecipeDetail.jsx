import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const recipeData = await recipeService.getRecipeById(id);
      setRecipe(recipeData);
      
      try {
        const commentsData = await recipeService.getRecipeComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
      
      try {
        const bookmarkStatus = await recipeService.checkBookmark(id);
        setIsBookmarked(bookmarkStatus.is_bookmarked);
      } catch (err) {
        console.error('Bookmark check failed:', err);
      }
      
      try {
        const ratingData = await recipeService.getUserRating(id);
        setUserRating(ratingData.user_rating);
      } catch (err) {
        console.error('Rating fetch failed:', err);
      }
      
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await recipeService.removeBookmark(id);
        setIsBookmarked(false);
      } else {
        await recipeService.bookmarkRecipe(id);
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error('Bookmark toggle failed:', err);
      alert('Please log in to bookmark recipes');
    }
  };

  const handleRating = async (rating) => {
    try {
      setSubmittingRating(true);
      await recipeService.rateRecipe(id, rating);
      setUserRating(rating);
      
      const updatedRecipe = await recipeService.getRecipeById(id);
      setRecipe(updatedRecipe);
    } catch (err) {
      console.error('Rating submission failed:', err);
      alert('Please log in to rate recipes');
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      setSubmittingComment(true);
      const comment = await recipeService.addComment(id, newComment);
      setComments([...comments, comment]);
      setNewComment('');
      
      const updatedRecipe = await recipeService.getRecipeById(id);
      setRecipe(updatedRecipe);
    } catch (err) {
      console.error('Comment submission failed:', err);
      alert('Please log in to add comments');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        alert('Recipe deleted!');
        navigate('/recipes');
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete recipe. You may not have permission.');
      }
    }
  };

  const shareRecipe = (platform) => {
    const recipeUrl = window.location.href;
    const recipeText = `Check out this amazing recipe: ${recipe.title}`;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(recipeText)}&url=${encodeURIComponent(recipeUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(recipeText + ' ' + recipeUrl)}`
    };
    
    window.open(urls[platform], '_blank');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream-white)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <div className="loading-spinner" />
          <p style={{ color: 'var(--stone-gray)', marginTop: '1.5rem', fontSize: '1.2rem', textAlign: 'center' }}>
            Loading recipe...
          </p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream-white)', padding: '4rem 2rem' }}>
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>😕</div>
          <h2 style={{ color: 'var(--charcoal-black)', marginBottom: '1rem', fontSize: '2rem' }}>
            Recipe Not Found
          </h2>
          <p style={{ color: 'var(--stone-gray)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {error || 'The recipe you are looking for does not exist.'}
          </p>
          <Link to="/recipes" className="btn btn-primary">
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream-white)', minHeight: '100vh' }}>
      {/* Hero Section with Image */}
      <div style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
        <img 
          src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=80'} 
          alt={recipe.title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '3rem 2rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <Link 
              to="/recipes" 
              style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '1.1rem',
                display: 'inline-block',
                marginBottom: '1.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}
            >
              ← All Recipes
            </Link>
            <h1 style={{ 
              color: 'white', 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              marginBottom: '0.75rem',
              textShadow: '2px 2px 8px rgba(0,0,0,0.4)'
            }}>
              {recipe.title}
            </h1>
            <p style={{ 
              color: 'rgba(255,255,255,0.95)', 
              fontSize: '1.2rem',
              textShadow: '1px 1px 3px rgba(0,0,0,0.4)'
            }}>
              by {recipe.author || 'Community Chef'}
            </p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Quick Info Cards */}
        <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--cream-white)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: 'var(--spice-orange)', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {recipe.prep_time} min
                </div>
                <div style={{ color: 'var(--stone-gray)', fontSize: '0.9rem' }}>Prep Time</div>
              </div>
              
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--cream-white)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: 'var(--tomato-red)', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {recipe.cook_time} min
                </div>
                <div style={{ color: 'var(--stone-gray)', fontSize: '0.9rem' }}>Cook Time</div>
              </div>
              
              <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: 'var(--cream-white)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', color: 'var(--herb-green)', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {recipe.servings}
                </div>
                <div style={{ color: 'var(--stone-gray)', fontSize: '0.9rem' }}>Servings</div>
              </div>
            </div>
            
            {/* Rating Display */}
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--cream-white)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < Math.round(recipe.avg_rating || 0) ? '#fcbf49' : '#ddd', fontSize: '1.8rem' }}>
                    ★
                  </span>
                ))}
              </div>
              <div style={{ color: 'var(--stone-gray)', fontSize: '1rem' }}>
                {recipe.avg_rating?.toFixed(1) || '0.0'} ({recipe.rating_count || 0} ratings)
              </div>
            </div>
          </div>

          {/* Actions Card */}
          <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--charcoal-black)' }}>
              Recipe Actions
            </h3>
            
            <button 
              onClick={toggleBookmark} 
              className="btn"
              style={{ 
                width: '100%',
                marginBottom: '1rem',
                background: isBookmarked ? 'var(--herb-green)' : 'white',
                color: isBookmarked ? 'white' : 'var(--charcoal-black)',
                border: isBookmarked ? 'none' : '2px solid var(--spice-orange)'
              }}
            >
              {isBookmarked ? '❤️ Saved to Bookmarks' : '🤍 Save Recipe'}
            </button>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ color: 'var(--stone-gray)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                Share this recipe:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <button onClick={() => shareRecipe('facebook')} style={{ padding: '0.75rem', background: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                  Facebook
                </button>
                <button onClick={() => shareRecipe('twitter')} style={{ padding: '0.75rem', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                  Twitter
                </button>
                <button onClick={() => shareRecipe('whatsapp')} style={{ padding: '0.75rem', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                  WhatsApp
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleDelete}
              style={{ 
                width: '100%',
                padding: '0.75rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🗑️ Delete Recipe
            </button>
          </div>
        </div>

        {/* Your Rating Section */}
        <div className="card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--charcoal-black)', marginTop: 0, marginBottom: '1rem' }}>
            Rate This Recipe
          </h3>
          <p style={{ color: 'var(--stone-gray)', marginBottom: '1.5rem' }}>
            {userRating > 0 ? 'You rated this recipe:' : 'How would you rate this recipe?'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                disabled={submittingRating}
                style={{
                  fontSize: '2.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: submittingRating ? 'wait' : 'pointer',
                  color: star <= userRating ? '#fcbf49' : '#ddd',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => !submittingRating && (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout for Ingredients & Instructions */}
        <div className="grid-2" style={{ gap: '2rem', marginBottom: '3rem', alignItems: 'start' }}>
          {/* Ingredients */}
          <div className="card">
            <h2 style={{ color: 'var(--spice-orange)', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              Ingredients
            </h2>
            <div style={{ color: 'var(--charcoal-black)', lineHeight: '2', fontSize: '1.05rem' }}>
              {recipe.ingredients?.split('\n').map((ingredient, index) => (
                <div 
                  key={index} 
                  style={{ 
                    padding: '0.75rem',
                    background: index % 2 === 0 ? 'var(--cream-white)' : 'transparent',
                    borderRadius: '6px',
                    marginBottom: '0.25rem'
                  }}
                >
                  • {ingredient}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="card">
            <h2 style={{ color: 'var(--herb-green)', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.8rem' }}>
              Instructions
            </h2>
            <div style={{ color: 'var(--charcoal-black)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              {recipe.instructions?.split('\n').map((step, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: '1.5rem',
                    paddingLeft: '2.5rem',
                    position: 'relative'
                  }}
                >
                  <span style={{ 
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '1.8rem',
                    height: '1.8rem',
                    borderRadius: '50%',
                    background: 'var(--spice-orange)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.95rem'
                  }}>
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="card">
          <h2 style={{ color: 'var(--charcoal-black)', marginTop: 0, marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            Comments ({comments.length})
          </h2>
          
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} style={{ marginBottom: '2rem' }}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, tips, or variations..."
              className="form-input"
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
            <button 
              type="submit" 
              disabled={submittingComment || !newComment.trim()}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
          
          {/* Comment List */}
          {comments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--cream-white)', borderRadius: '8px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <p style={{ color: 'var(--stone-gray)', fontSize: '1.1rem' }}>
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {comments.map((comment) => (
                <div 
                  key={comment.id} 
                  style={{ 
                    padding: '1.5rem',
                    background: 'var(--cream-white)',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--spice-orange)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--charcoal-black)', fontSize: '1.05rem' }}>
                        {comment.user_name || 'Anonymous'}
                      </div>
                      <div style={{ color: 'var(--stone-gray)', fontSize: '0.85rem' }}>
                        {new Date(comment.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--charcoal-black)', margin: 0, lineHeight: '1.7', fontSize: '1.05rem' }}>
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
