import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import groupService from '../services/groupService';

const Groups = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    description: '',
    max_members: 10
  });
  const [creating, setCreating] = useState(false);

  // Fetch groups on component mount
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await groupService.getUserGroups();
      
      if (response.success) {
        setGroups(response.groups || []);
      } else {
        setError(response.error || 'Failed to fetch groups');
      }
    } catch (err) {
      console.error('Error fetching groups:', err);
      setError(err.response?.data?.message || 'Failed to load groups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupData.name.trim()) {
      alert('Please enter a group name');
      return;
    }

    try {
      setCreating(true);
      setError(null);
      
      const response = await groupService.createGroup({
        name: newGroupData.name.trim(),
        description: newGroupData.description.trim(),
        max_members: newGroupData.max_members
      });

      if (response.success) {
        alert(`Group "${newGroupData.name}" created successfully!`);
        setNewGroupData({ name: '', description: '', max_members: 10 });
        setShowCreateModal(false);
        // Refresh the groups list
        fetchGroups();
      } else {
        alert(response.message || 'Failed to create group');
      }
    } catch (err) {
      console.error('Error creating group:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create group. Please try again.';
      alert(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fdba74', fontSize: '1.5rem' }}>Loading groups...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ color: '#fdba74', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Recipe Groups</h1>
            <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Collaborate with others to create amazing recipes</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}>
            + Create Group
          </button>
        </div>

        {error && (
          <div style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {groups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#1e1e1e', borderRadius: '16px', border: '2px solid #8b5cf6' }}>
            <h2 style={{ color: '#fdba74', marginBottom: '1rem' }}>No Groups Yet</h2>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Create your first group to start collaborating!</p>
            <button onClick={() => setShowCreateModal(true)} style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
              + Create Your First Group
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {groups.map(group => (
              <div 
                key={group.group_id}
                onClick={() => navigate(`/group/${group.group_id}`)}
                style={{ 
                  background: '#1e1e1e',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid #8b5cf6',
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {group.image_url && (
                  <img src={group.image_url} alt={group.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                )}
                {!group.image_url && (
                  <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '4rem' }}>👥</span>
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: '#fdba74', fontSize: '1.3rem', marginBottom: '0.5rem' }}>{group.name}</h3>
                  {group.description && (
                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>{group.description}</p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <span>{group.members_count} member{group.members_count !== 1 ? 's' : ''}</span>
                    <span>Max: {group.max_members}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/group/${group.group_id}`);
                    }}
                    style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    View Group →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #8b5cf6', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: '#fdba74', marginBottom: '1.5rem' }}>Create New Group</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem' }}>Group Name *</label>
                <input
                  type="text"
                  value={newGroupData.name}
                  onChange={(e) => setNewGroupData({ ...newGroupData, name: e.target.value })}
                  placeholder="Enter group name"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem' }}>Description (Optional)</label>
                <textarea
                  value={newGroupData.description}
                  onChange={(e) => setNewGroupData({ ...newGroupData, description: e.target.value })}
                  placeholder="Describe your group..."
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem' }}>Maximum Members</label>
                <input
                  type="number"
                  value={newGroupData.max_members}
                  onChange={(e) => setNewGroupData({ ...newGroupData, max_members: parseInt(e.target.value) || 10 })}
                  min="2"
                  max="100"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={handleCreateGroup} 
                  disabled={creating}
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem', 
                    background: creating ? '#9ca3af' : '#10b981', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    cursor: creating ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewGroupData({ name: '', description: '', max_members: 10 });
                  }} 
                  disabled={creating}
                  style={{ 
                    flex: 1, 
                    padding: '0.75rem', 
                    background: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: '600', 
                    cursor: creating ? 'not-allowed' : 'pointer' 
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            ← Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Groups;
