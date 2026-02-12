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
      
      // Fetch recipe details
      const recipeData = await recipeService.getRecipeById(id);
      setRecipe(recipeData);
      
      // Fetch comments
      try {
        const commentsData = await recipeService.getRecipeComments(id);
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
      
      // Check bookmark status (only if logged in)
      try {
        const bookmarkStatus = await recipeService.checkBookmark(id);
        setIsBookmarked(bookmarkStatus.is_bookmarked);
      } catch (err) {
        console.error('Bookmark check failed:', err);
      }
      
      // Get user's rating (only if logged in)
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
      
      // Refresh recipe to get updated average rating
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
      
      // Refresh recipe to get updated comment count
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

  const shareOnFacebook = () => {
    const recipeUrl = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    const recipeUrl = window.location.href;
    const recipeText = `Check out this amazing recipe: ${recipe.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipeText)}&url=${encodeURIComponent(recipeUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const recipeUrl = window.location.href;
    const recipeText = `Check out this amazing recipe: ${recipe.title} ${recipeUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(recipeText)}`, '_blank');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#fdba74', fontSize: '1.5rem' }}>Loading recipe...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: '#1e1e1e', padding: '3rem', borderRadius: '16px', border: '2px solid #ef4444' }}>
            <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Recipe Not Found</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>{error || 'The recipe you are looking for does not exist.'}</p>
            <Link to="/recipes" style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/recipes" style={{ color: '#fdba74', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem' }}>
            ← Back to Recipes
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={toggleBookmark} style={{ padding: '0.5rem 1rem', background: isBookmarked ? '#fdba74' : '#2a2a2a', color: 'white', border: '2px solid #fdba74', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' }}>
              {isBookmarked ? '❤️ Saved' : '🤍 Save'}
            </button>
            <button onClick={handleDelete} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              🗑️ Delete
            </button>
          </div>
        </div>

        <div style={{ background: '#1e1e1e', borderRadius: '16px', boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)', overflow: 'hidden', border: '2px solid #8b5cf6' }}>
          <img src={recipe.image_url || 'https://via.placeholder.com/800'} alt={recipe.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          
          <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', color: 'white', fontWeight: '800' }}>{recipe.title}</h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>by {recipe.author || 'Unknown'}</p>
          </div>

          <div style={{ padding: '2rem' }}>
            {/* Share buttons */}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.2rem' }}>Share this recipe</h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={shareOnFacebook} style={{ padding: '0.75rem 1.5rem', background: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Facebook
                </button>
                <button onClick={shareOnTwitter} style={{ padding: '0.75rem 1.5rem', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Twitter
                </button>
                <button onClick={shareOnWhatsApp} style={{ padding: '0.75rem 1.5rem', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Recipe stats */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #fdba74', minWidth: '120px' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{recipe.prep_time}m</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Prep Time</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #fdba74', minWidth: '120px' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{recipe.cook_time}m</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Cook Time</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #10b981', minWidth: '120px' }}>
                <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: '700' }}>{recipe.servings}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Servings</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #8b5cf6', minWidth: '120px' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>
                  {recipe.avg_rating ? recipe.avg_rating.toFixed(1) : '0.0'}/5
                </div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>({recipe.rating_count || 0} ratings)</div>
              </div>
            </div>

            {/* Rate this recipe */}
            <div style={{ marginBottom: '2rem', textAlign: 'center', background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.2rem' }}>Rate this recipe</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    disabled={submittingRating}
                    style={{
                      fontSize: '2rem',
                      background: 'none',
                      border: 'none',
                      cursor: submittingRating ? 'wait' : 'pointer',
                      color: star <= userRating ? '#fbbf24' : '#555',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {star <= userRating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p style={{ color: '#10b981', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Your rating: {userRating} star{userRating !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Description */}
            {recipe.description && (
              <div style={{ marginBottom: '2rem', background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
                <h3 style={{ color: '#fdba74', marginBottom: '0.75rem', fontSize: '1.3rem' }}>About</h3>
                <p style={{ color: '#aaa', lineHeight: '1.6', margin: 0 }}>{recipe.description}</p>
              </div>
            )}

            {/* Ingredients */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>Ingredients</h3>
              <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px', border: '2px solid #10b981' }}>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  color: '#aaa', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  margin: 0,
                  lineHeight: '2'
                }}>
                  {recipe.ingredients}
                </pre>
              </div>
            </div>

            {/* Instructions */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>Instructions</h3>
              <div style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  color: '#aaa', 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  margin: 0,
                  lineHeight: '1.8'
                }}>
                  {recipe.instructions}
                </pre>
              </div>
            </div>

            {/* Comments Section */}
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                Comments ({comments.length})
              </h3>
              
              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} style={{ marginBottom: '2rem' }}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this recipe..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '1rem',
                    background: '#2a2a2a',
                    border: '2px solid #8b5cf6',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    marginBottom: '1rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim()}
                  style={{
                    padding: '0.75rem 2rem',
                    background: submittingComment || !newComment.trim() ? '#555' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: submittingComment || !newComment.trim() ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>

              {/* Comments List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#888', padding: '2rem', background: '#2a2a2a', borderRadius: '12px', border: '2px solid #444' }}>
                    No comments yet. Be the first to comment!
                  </div>
                ) : (
                  comments.map(comment => (
                    <div key={comment.id} style={{ background: '#2a2a2a', padding: '1.5rem', borderRadius: '12px', border: '2px solid #444' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <div>
                          <div style={{ color: '#fdba74', fontWeight: '600', fontSize: '1.1rem' }}>
                            {comment.author || 'Anonymous'}
                          </div>
                          <div style={{ color: '#888', fontSize: '0.85rem' }}>
                            {new Date(comment.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      <p style={{ color: '#aaa', margin: 0, lineHeight: '1.6' }}>
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
