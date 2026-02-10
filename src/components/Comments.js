import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Comments = ({ 
  recipeId, 
  comments = [], 
  onAddComment, 
  onUpdateComment,
  onDeleteComment,
  currentUserId,
  totalComments = 0,
  hasMore = false,
  onLoadMore
}) => {
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const maxLength = 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && newComment.length <= maxLength) {
      onAddComment(newComment.trim());
      setNewComment('');
      setCharCount(0);
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setNewComment(value);
    setCharCount(value.length);
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleSaveEdit = (commentId) => {
    if (editContent.trim() && editContent.length <= maxLength) {
      onUpdateComment(commentId, editContent.trim());
      setEditingId(null);
      setEditContent('');
    }
  };

  const handleDelete = (commentId) => {
    onDeleteComment(commentId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">
        Comments ({totalComments})
      </h3>
      
      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <textarea
              data-testid="comment-textarea"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              rows="3"
              required
              maxLength={maxLength}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {charCount}/{maxLength}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">
              {charCount > maxLength - 100 && charCount <= maxLength && (
                <span className="text-orange-600">
                  {maxLength - charCount} characters remaining
                </span>
              )}
              {charCount > maxLength && (
                <span className="text-red-600">
                  Exceeds maximum length by {charCount - maxLength}
                </span>
              )}
            </span>
            <button 
              data-testid="post-comment-button"
              type="submit"
              disabled={!newComment.trim() || charCount > maxLength}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-md text-center">
          <p className="text-gray-600">Please login to comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg font-medium">No comments yet</p>
            <p className="text-sm">Be the first to comment on this recipe!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div 
              key={comment.id} 
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              {editingId === comment.id ? (
                /* Edit Mode */
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    maxLength={maxLength}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      disabled={!editContent.trim() || editContent.length > maxLength}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {/* User Avatar Placeholder */}
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {comment.user?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{comment.user || 'Anonymous'}</span>
                        <span className="text-sm text-gray-500 ml-2">{formatDate(comment.created_at)}</span>
                        {comment.updated_at !== comment.created_at && (
                          <span className="text-xs text-gray-400 ml-1">(edited)</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {user && comment.user_id === user.id && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(comment)}
                          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit comment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors"
                          title="Delete comment"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 ml-10">{comment.content}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;