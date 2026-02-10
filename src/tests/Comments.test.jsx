import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Comments from '../components/Comments';
import authSlice from '../store/authSlice';

const createMockStore = (user = null) => {
  return configureStore({
    reducer: {
      auth: authSlice,
    },
    preloadedState: {
      auth: {
        user,
        token: user ? 'mock-token' : null,
        isAuthenticated: !!user,
      },
    },
  });
};

describe('Comments Component', () => {
  const mockComments = [
    {
      id: 1,
      content: 'Great recipe!',
      user: 'testuser',
      user_id: 1,
      created_at: '2026-02-10T10:00:00',
      updated_at: '2026-02-10T10:00:00',
    },
    {
      id: 2,
      content: 'I loved this!',
      user: 'anotheruser',
      user_id: 2,
      created_at: '2026-02-10T11:00:00',
      updated_at: '2026-02-10T11:00:00',
    },
  ];

  const mockProps = {
    recipeId: 1,
    comments: mockComments,
    onAddComment: vi.fn(),
    onUpdateComment: vi.fn(),
    onDeleteComment: vi.fn(),
    currentUserId: 1,
    totalComments: 2,
    hasMore: false,
    onLoadMore: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders comments section with title', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Comments (2)')).toBeInTheDocument();
  });

  it('displays all comments', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Great recipe!')).toBeInTheDocument();
    expect(screen.getByText('I loved this!')).toBeInTheDocument();
  });

  it('shows comment form when user is logged in', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
    expect(screen.getByText('Post Comment')).toBeInTheDocument();
  });

  it('shows login message when user is not logged in', () => {
    const store = createMockStore(null);
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Please login to comment')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Add a comment...')).not.toBeInTheDocument();
  });

  it('handles comment submission', async () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Add a comment...');
    const submitButton = screen.getByText('Post Comment');

    fireEvent.change(textarea, { target: { value: 'New comment' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.onAddComment).toHaveBeenCalledWith('New comment');
    });
  });

  it('shows character count', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Add a comment...');
    fireEvent.change(textarea, { target: { value: 'Test' } });

    expect(screen.getByText('4/1000')).toBeInTheDocument();
  });

  it('disables submit when exceeding max length', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Add a comment...');
    const longText = 'A'.repeat(1001);
    fireEvent.change(textarea, { target: { value: longText } });

    const submitButton = screen.getByText('Post Comment');
    expect(submitButton).toBeDisabled();
  });

  it('shows edit and delete buttons for own comments', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const editButtons = screen.getAllByTitle('Edit comment');
    expect(editButtons).toHaveLength(1); // Only for user's own comment
  });

  it('allows editing own comment', async () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const editButton = screen.getByTitle('Edit comment');
    fireEvent.click(editButton);

    // Edit mode should show textarea
    const editTextarea = screen.getAllByRole('textbox')[1]; // First is the add comment textarea
    expect(editTextarea).toBeInTheDocument();
    
    fireEvent.change(editTextarea, { target: { value: 'Updated comment' } });
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockProps.onUpdateComment).toHaveBeenCalledWith(1, 'Updated comment');
    });
  });

  it('allows deleting own comment', async () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    
    // Mock window.confirm
    global.confirm = vi.fn(() => true);
    
    render(
      <Provider store={store}>
        <Comments {...mockProps} />
      </Provider>
    );

    const deleteButton = screen.getByTitle('Delete comment');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockProps.onDeleteComment).toHaveBeenCalledWith(1);
    });
  });

  it('shows empty state when no comments', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...{ ...mockProps, comments: [], totalComments: 0 }} />
      </Provider>
    );

    expect(screen.getByText('No comments yet')).toBeInTheDocument();
    expect(screen.getByText('Be the first to comment on this recipe!')).toBeInTheDocument();
  });

  it('shows load more button when hasMore is true', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    render(
      <Provider store={store}>
        <Comments {...{ ...mockProps, hasMore: true }} />
      </Provider>
    );

    const loadMoreButton = screen.getByText('Load More Comments');
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(mockProps.onLoadMore).toHaveBeenCalled();
  });

  it('formats dates correctly', () => {
    const store = createMockStore({ id: 1, username: 'testuser' });
    const recentComment = {
      id: 3,
      content: 'Recent comment',
      user: 'testuser',
      user_id: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    render(
      <Provider store={store}>
        <Comments {...{ ...mockProps, comments: [recentComment] }} />
      </Provider>
    );

    expect(screen.getByText(/Just now|minute/)).toBeInTheDocument();
  });
});
