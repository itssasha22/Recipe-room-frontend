import { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';

const BookmarkButton = ({ recipeId, onBookmarkChange }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [recipeId]);

  const checkBookmarkStatus = async () => {
    try {
      const result = await recipeService.checkBookmark(recipeId);
      setBookmarked(result.bookmarked);
    } catch (err) {
      // silent fail
    }
  };

  const handleToggleBookmark = async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      if (bookmarked) {
        await recipeService.removeBookmark(recipeId);
        setBookmarked(false);
      } else {
        await recipeService.bookmarkRecipe(recipeId);
        setBookmarked(true);
      }
      if (onBookmarkChange) onBookmarkChange();
    } catch (err) {
      // revert on error
      setBookmarked(!bookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={loading}
      style={{
        background: bookmarked ? 'var(--coral-red)' : 'transparent',
        color: bookmarked ? 'white' : 'var(--coral-red)',
        border: '2px solid var(--coral-red)',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? '...' : bookmarked ? '🔖 Saved' : '🔖 Save'}
    </button>
  );
};

export default BookmarkButton;
