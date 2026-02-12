import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeService from '../services/recipeService';

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getBookmarks();
      setBookmarkedRecipes(data);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      if (err.response?.status === 401) {
        setError('Please log in to view your bookmarks.');
      } else {
        setError('Failed to load bookmarks. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (recipeId) => {
    try {
      await recipeService.removeBookmark(recipeId);
      // Remove from local state
      setBookmarkedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark. Please try again.');
    }
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
      'Kenya': '🇰🇪',
      'Ethiopia': '🇪🇹',
      'Nigeria': '🇳🇬',
      'Lebanon': '🇱🇧',
      'Morocco': '🇲🇦',
      'South Africa': '🇿🇦',
      'India': '🇮🇳'
    };
    return flags[country] || '🌍';
  };

  return (
    <div style={{ padding: '2rem', background: '#2c2c2c', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            background: 'linear-gradient(135deg, #fdba74, #8b5cf6)', 
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            marginBottom: '0.5rem',
            fontWeight: '800'
          }}>
            My Bookmarks
          </h1>
          <p style={{ color: '#aaa', fontSize: '1.1rem' }}>
            Your saved recipes in one place
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#fdba74', 
            fontSize: '1.2rem',
            background: '#1e1e1e',
            borderRadius: '12px',
            border: '2px solid #8b5cf6'
          }}>
            Loading your bookmarks...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#ef4444', 
            fontSize: '1.2rem', 
            background: '#1e1e1e', 
            borderRadius: '12px',
            border: '2px solid #ef4444'
          }}>
            {error}
            <button 
              onClick={fetchBookmarks} 
              style={{ 
                display: 'block', 
                margin: '1rem auto', 
                padding: '0.75rem 2rem', 
                background: '#8b5cf6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookmarkedRecipes.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            background: '#1e1e1e',
            borderRadius: '12px',
            border: '2px solid #8b5cf6'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📌</div>
            <h2 style={{ color: '#fdba74', fontSize: '1.8rem', marginBottom: '1rem' }}>
              No Bookmarks Yet
            </h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Start exploring recipes and bookmark your favorites!
            </p>
            <button
              onClick={() => navigate('/recipes')}
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}
            >
              Browse Recipes
            </button>
          </div>
        )}

        {/* Bookmarked Recipes Grid */}
        {!loading && !error && bookmarkedRecipes.length > 0 && (
          <>
            <div style={{ 
              marginBottom: '2rem', 
              color: '#10b981', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {bookmarkedRecipes.length} bookmarked recipe{bookmarkedRecipes.length !== 1 ? 's' : ''}
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '2rem' 
            }}>
              {bookmarkedRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  style={{
                    background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid #8b5cf6',
                    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative'
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
                  {/* Remove Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveBookmark(recipe.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(239, 68, 68, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.background = '#ef4444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
                    }}
                    title="Remove bookmark"
                  >
                    ❌
                  </button>

                  <div 
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={recipe.image_url || 'https://via.placeholder.com/400'} 
                      alt={recipe.title} 
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                    />
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'start', 
                        marginBottom: '0.5rem' 
                      }}>
                        <h3 style={{ 
                          color: '#fdba74', 
                          margin: '0', 
                          fontSize: '1.3rem', 
                          fontWeight: '700',
                          flex: 1,
                          paddingRight: '0.5rem'
                        }}>
                          {recipe.title}
                        </h3>
                        <span style={{ fontSize: '1.5rem' }}>
                          {getCountryFlag(recipe.country)}
                        </span>
                      </div>
                      
                      <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                        by {recipe.author || 'Unknown'}
                      </p>
                      
                      <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.75rem' }}>
                        <span>⏱️ {recipe.prep_time + recipe.cook_time || 0} mins</span>
                        <span style={{ marginLeft: '1rem' }}>👥 Serves {recipe.servings || 'N/A'}</span>
                      </div>
                      
                      <div style={{ 
                        marginTop: '0.75rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: '#fbbf24', fontSize: '1rem' }}>
                            {'⭐'.repeat(Math.round(recipe.avg_rating || 0))}
                            {'☆'.repeat(5 - Math.round(recipe.avg_rating || 0))}
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
