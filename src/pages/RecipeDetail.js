import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Comments from '../components/Comments';
import SocialShare from '../components/SocialShare';
import Rating from '../components/Rating';
import Loading from '../components/Loading';
import './Home.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsPage, setCommentsPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(false);

  useEffect(() => {
    fetchRecipe();
    fetchComments();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      setRecipe(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${id}?page=${page}&per_page=20`
      );
      
      if (response.data.success) {
        const { items, total, has_next } = response.data.data;
        
        if (page === 1) {
          setComments(items);
        } else {
          setComments(prev => [...prev, ...items]);
        }
        
        setTotalComments(total);
        setHasMoreComments(has_next);
        setCommentsPage(page);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleAddComment = async (content) => {
    if (!user) {
      alert('Please login to comment');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Refresh comments
        fetchComments(1);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.error || 'Failed to add comment');
    }
  };

  const handleUpdateComment = async (commentId, content) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/comments/${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Update comment in state
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId ? response.data.data : comment
          )
        );
      }
    } catch (err) {
      console.error('Error updating comment:', err);
      alert(err.response?.data?.error || 'Failed to update comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Remove comment from state
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        setTotalComments(prev => prev - 1);
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert(err.response?.data?.error || 'Failed to delete comment');
    }
  };

  const handleLoadMoreComments = () => {
    fetchComments(commentsPage + 1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600">Recipe not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 hover:text-blue-800 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        
        <div className="p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              By {recipe.user || 'Anonymous'}
            </span>
            
            {recipe.difficulty && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {recipe.difficulty}
              </span>
            )}
            
            {recipe.is_premium && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                ⭐ Premium
              </span>
            )}
          </div>

          {recipe.description && (
            <p className="text-gray-700 mb-4">{recipe.description}</p>
          )}

          {/* Recipe Info */}
          <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
            {recipe.prep_time && (
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{recipe.prep_time}</p>
                <p className="text-sm text-gray-600">Prep Time (min)</p>
              </div>
            )}
            {recipe.cook_time && (
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{recipe.cook_time}</p>
                <p className="text-sm text-gray-600">Cook Time (min)</p>
              </div>
            )}
            {recipe.servings && (
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{recipe.servings}</p>
                <p className="text-sm text-gray-600">Servings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-700">
            {recipe.ingredients}
          </pre>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-700">
            {recipe.instructions}
          </pre>
        </div>
      </div>

      {/* Social Share */}
      <div className="mb-6">
        <SocialShare
          url={window.location.href}
          title={recipe.title}
          description={recipe.description}
        />
      </div>

      {/* Comments Section */}
      <div data-testid="comments-section">
        <Comments
          recipeId={id}
          comments={comments}
          onAddComment={handleAddComment}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          currentUserId={user?.id}
          totalComments={totalComments}
          hasMore={hasMoreComments}
          onLoadMore={handleLoadMoreComments}
        />
      </div>
    </div>
  );
};

export default RecipeDetail;