import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import groupService from '../services/groupService';
import recipeService from '../services/recipeService';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [inviteUserId, setInviteUserId] = useState('');
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await groupService.getGroupById(id);
      
      if (response.success) {
        setGroup(response.group);
      } else {
        setError(response.error || 'Failed to fetch group details');
      }
    } catch (err) {
      console.error('Error fetching group:', err);
      setError(err.response?.data?.message || 'Failed to load group details');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRecipes = async () => {
    try {
      const response = await recipeService.getAllRecipes(1, 100);
      if (response.success) {
        setAllRecipes(response.recipes || []);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  const handleInviteMember = async () => {
    if (!inviteUserId.trim()) {
      alert('Please enter a user ID');
      return;
    }

    try {
      setActionInProgress(true);
      const response = await groupService.addMemberToGroup(id, parseInt(inviteUserId));
      
      if (response.success) {
        alert('Member invited successfully!');
        setInviteUserId('');
        setShowInviteModal(false);
        fetchGroupData(); // Refresh group data
      } else {
        alert(response.message || 'Failed to invite member');
      }
    } catch (err) {
      console.error('Error inviting member:', err);
      alert(err.response?.data?.message || 'Failed to invite member');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleAddRecipe = async () => {
    if (!selectedRecipeId) {
      alert('Please select a recipe');
      return;
    }

    try {
      setActionInProgress(true);
      const response = await groupService.addRecipeToGroup(id, parseInt(selectedRecipeId));
      
      if (response.success) {
        alert('Recipe added to group successfully!');
        setSelectedRecipeId('');
        setShowAddRecipeModal(false);
        fetchGroupData(); // Refresh group data
      } else {
        alert(response.message || 'Failed to add recipe');
      }
    } catch (err) {
      console.error('Error adding recipe:', err);
      alert(err.response?.data?.message || 'Failed to add recipe');
    } finally {
      setActionInProgress(false);
    }
  };

  const handleOpenAddRecipeModal = () => {
    setShowAddRecipeModal(true);
    fetchAvailableRecipes();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fdba74', fontSize: '1.5rem' }}>Loading group details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ background: '#ef4444', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Error Loading Group</h2>
            <p>{error}</p>
          </div>
          <button onClick={() => navigate('/groups')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            ← Back to Groups
          </button>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fdba74', fontSize: '1.5rem' }}>Group not found</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={() => navigate('/groups')} style={{ padding: '0.75rem 1.5rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '2rem' }}>
          ← Back to Groups
        </button>

        <div style={{ background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', border: '2px solid #8b5cf6', marginBottom: '2rem' }}>
          {group.image_url ? (
            <img src={group.image_url} alt={group.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '300px', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '6rem' }}>👥</span>
            </div>
          )}
          <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#fdba74', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{group.name}</h1>
            {group.description && (
              <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1rem' }}>{group.description}</p>
            )}
            <div style={{ display: 'flex', gap: '2rem', color: '#10b981', fontSize: '1rem' }}>
              <span>{group.members_count} Members (Max: {group.max_members})</span>
              <span>{group.recipes ? group.recipes.length : 0} Recipes</span>
              <span>Created: {new Date(group.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Members Panel */}
          <div style={{ background: '#1e1e1e', borderRadius: '16px', padding: '1.5rem', border: '2px solid #10b981', height: 'fit-content' }}>
            <h2 style={{ color: '#fdba74', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Members</h2>
            
            {group.members && group.members.length > 0 ? (
              group.members.map((member, index) => (
                <div key={member.user_id || index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '8px', marginBottom: '1rem' }}>
                  {member.profile_image ? (
                    <img src={member.profile_image} alt={member.username} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #8b5cf6' }} />
                  ) : (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '1.2rem' }}>
                      {member.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>{member.username}</div>
                    <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
                      {member.user_id === group.owner_id ? 'Owner' : 'Member'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>No members yet</p>
            )}
            
            <button 
              onClick={() => setShowInviteModal(true)}
              style={{ width: '100%', padding: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' }}
            >
              + Invite Members
            </button>
          </div>

          {/* Recipes Panel */}
          <div>
            <div style={{ background: '#1e1e1e', borderRadius: '16px', padding: '1.5rem', border: '2px solid #8b5cf6', marginBottom: '2rem' }}>
              <h2 style={{ color: '#fdba74', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Group Recipes</h2>
              
              {group.recipes && group.recipes.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {group.recipes.map(recipe => (
                    <div 
                      key={recipe.recipe_id}
                      onClick={() => navigate(`/recipe/${recipe.recipe_id}`)}
                      style={{ 
                        background: '#2a2a2a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '2px solid #10b981',
                        transition: 'transform 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {recipe.image_url ? (
                        <img src={recipe.image_url} alt={recipe.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '150px', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                          🍽️
                        </div>
                      )}
                      <div style={{ padding: '1rem' }}>
                        <h3 style={{ color: '#fdba74', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{recipe.title}</h3>
                        {recipe.owner && (
                          <p style={{ color: '#aaa', fontSize: '0.85rem' }}>by {recipe.owner.username}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#aaa', textAlign: 'center', padding: '2rem' }}>No recipes in this group yet</p>
              )}
              
              <button 
                onClick={handleOpenAddRecipeModal}
                style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '1.5rem' }}
              >
                + Add Recipe to Group
              </button>
            </div>
          </div>
        </div>

        {/* Invite Member Modal */}
        {showInviteModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #10b981', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: '#fdba74', marginBottom: '1.5rem' }}>Invite Member</h2>
              <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Enter the user ID of the person you want to invite to this group
              </p>
              <input
                type="number"
                value={inviteUserId}
                onChange={(e) => setInviteUserId(e.target.value)}
                placeholder="Enter user ID"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #10b981', background: '#2a2a2a', color: 'white', fontSize: '1rem', marginBottom: '1.5rem' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={handleInviteMember}
                  disabled={actionInProgress}
                  style={{ flex: 1, padding: '0.75rem', background: actionInProgress ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: actionInProgress ? 'not-allowed' : 'pointer' }}
                >
                  {actionInProgress ? 'Inviting...' : 'Invite'}
                </button>
                <button 
                  onClick={() => {
                    setShowInviteModal(false);
                    setInviteUserId('');
                  }}
                  disabled={actionInProgress}
                  style={{ flex: 1, padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: actionInProgress ? 'not-allowed' : 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Recipe Modal */}
        {showAddRecipeModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflow: 'auto' }}>
            <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #8b5cf6', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflow: 'auto' }}>
              <h2 style={{ color: '#fdba74', marginBottom: '1.5rem' }}>Add Recipe to Group</h2>
              <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Select a recipe to add to this group
              </p>
              
              {allRecipes.length > 0 ? (
                <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflow: 'auto', border: '2px solid #8b5cf6', borderRadius: '8px', background: '#2a2a2a' }}>
                  {allRecipes.map(recipe => (
                    <div 
                      key={recipe.recipe_id}
                      onClick={() => setSelectedRecipeId(recipe.recipe_id)}
                      style={{ 
                        padding: '1rem', 
                        borderBottom: '1px solid #555', 
                        cursor: 'pointer',
                        background: selectedRecipeId === recipe.recipe_id ? '#8b5cf6' : 'transparent',
                        color: 'white'
                      }}
                    >
                      <div style={{ fontWeight: '600' }}>{recipe.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.25rem' }}>
                        {recipe.owner && `by ${recipe.owner.username}`}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#aaa', marginBottom: '1.5rem' }}>
                  No recipes available. Create a recipe first!
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={handleAddRecipe}
                  disabled={actionInProgress || !selectedRecipeId}
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem', 
                    background: (actionInProgress || !selectedRecipeId) ? '#9ca3af' : '#8b5cf6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    cursor: (actionInProgress || !selectedRecipeId) ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {actionInProgress ? 'Adding...' : 'Add Recipe'}
                </button>
                <button 
                  onClick={() => {
                    setShowAddRecipeModal(false);
                    setSelectedRecipeId('');
                  }}
                  disabled={actionInProgress}
                  style={{ flex: 1, padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: actionInProgress ? 'not-allowed' : 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
