import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import groupService from '../services/groupService';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [id]);

  const fetchGroupData = async () => {
    try {
      setLoading(true);
      const response = await groupService.getGroupById(id);
      if (response.success) {
        setGroup(response.group);
      } else {
        setError(response.error || 'Failed to fetch group details');
      }
    } catch (err) {
      setError('Failed to load group details');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    try {
      await groupService.joinGroup(id);
      await fetchGroupData();
    } catch (err) {
      setError('Failed to join group');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await groupService.leaveGroup(id);
      navigate('/groups');
    } catch (err) {
      setError('Failed to leave group');
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await groupService.inviteToGroup(id, inviteEmail);
      setInviteEmail('');
      setShowInviteForm(false);
      alert('Invitation sent!');
    } catch (err) {
      setError('Failed to send invitation');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--danger-red)', marginBottom: '15px' }}>{error || 'Group not found'}</p>
        <button onClick={() => navigate('/groups')} className="btn-secondary">
          ← Back to Groups
        </button>
      </div>
    );
  }

  const isMember = group.is_member || false;

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Group Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '25px 15px' }}>
          <button 
            onClick={() => navigate('/groups')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-orange)',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '15px',
              padding: 0
            }}
          >
            ← Back to Groups
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>👥</div>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '10px' }}>{group.name}</h1>
            {group.description && (
              <p style={{ fontSize: '15px', color: 'var(--text-gray)', marginBottom: '15px' }}>
                {group.description}
              </p>
            )}
            <p style={{ fontSize: '14px', color: 'var(--light-gray)', marginBottom: '20px' }}>
              {group.members?.length || 0} members
            </p>

            {isMember ? (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => setShowInviteForm(!showInviteForm)} className="btn-primary">
                  Invite Members
                </button>
                <button onClick={handleLeaveGroup} className="btn-secondary">
                  Leave Group
                </button>
              </div>
            ) : (
              <button onClick={handleJoinGroup} className="btn-primary">
                Join Group
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Group Content */}
      {isMember && (
        <div className="container section-padding">
          {showInviteForm && (
            <div style={{ 
              background: 'white', 
              border: '1px solid var(--border-gray)', 
              padding: '25px',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Invite to Group</h2>
              <form onSubmit={handleInvite}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="form-input"
                    placeholder="friend@example.com"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Send Invitation
                </button>
              </form>
            </div>
          )}

          {/* Members Section */}
          {group.members && group.members.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Members</h2>
              <div style={{ 
                background: 'white', 
                border: '1px solid var(--border-gray)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  {group.members.map((member) => (
                    <div 
                      key={member.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 15px',
                        background: 'var(--off-white)',
                        borderRadius: '20px',
                        fontSize: '14px'
                      }}
                    >
                      <span>👤</span>
                      <span>{member.username}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recipes Section */}
          {group.recipes && group.recipes.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Group Recipes</h2>
              <div className="grid-3">
                {group.recipes.map((recipe) => (
                  <Link 
                    key={recipe.id} 
                    to={`/recipes/${recipe.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="recipe-card">
                      <img 
                        src={recipe.image_url || 'https://via.placeholder.com/400x300?text=Recipe'} 
                        alt={recipe.title}
                      />
                      <div className="recipe-card-content">
                        <h3 className="recipe-card-title">{recipe.title}</h3>
                        <div className="recipe-card-meta">
                          <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                          {recipe.average_rating > 0 && (
                            <span>⭐ {recipe.average_rating.toFixed(1)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {(!group.recipes || group.recipes.length === 0) && (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px 20px',
              background: 'white',
              border: '1px solid var(--border-gray)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📝</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>No recipes yet</h3>
              <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
                Share recipes with this group
              </p>
            </div>
          )}
        </div>
      )}

      {!isMember && (
        <div className="container section-padding">
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            border: '1px solid var(--border-gray)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔒</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Join to see content</h3>
            <p style={{ fontSize: '14px', color: 'var(--light-gray)', marginBottom: '20px' }}>
              Become a member to view recipes and discussions
            </p>
            <button onClick={handleJoinGroup} className="btn-primary">
              Join Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
