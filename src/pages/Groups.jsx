import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import groupService from '../services/groupService';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getAllGroups();
      setGroups(data);
    } catch (err) {
      setError('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      setCreating(true);
      await groupService.createGroup(newGroupName, newGroupDesc);
      setNewGroupName('');
      setNewGroupDesc('');
      setShowCreateForm(false);
      await fetchGroups();
    } catch (err) {
      setError('Failed to create group');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '25px 15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>Recipe Groups</h1>
              <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
                {groups.length} {groups.length === 1 ? 'group' : 'groups'}
              </p>
            </div>
            <button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="btn-primary"
            >
              {showCreateForm ? 'Cancel' : '+ Create Group'}
            </button>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        {error && (
          <div style={{ 
            background: '#fee', 
            border: '1px solid var(--danger-red)',
            color: 'var(--danger-red)',
            padding: '15px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Create Group Form */}
        {showCreateForm && (
          <div style={{ 
            background: 'white', 
            border: '1px solid var(--border-gray)', 
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="form-input"
                  placeholder="e.g., African Cuisine Lovers"
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Description
                </label>
                <textarea
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  className="form-input"
                  rows="3"
                  placeholder="What's this group about?"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={creating}>
                {creating ? 'Creating...' : 'Create Group'}
              </button>
            </form>
          </div>
        )}

        {/* Groups Grid */}
        {groups.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            border: '1px solid var(--border-gray)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>No groups yet</h2>
            <p style={{ fontSize: '14px', color: 'var(--light-gray)', marginBottom: '20px' }}>
              Create the first recipe group!
            </p>
            <button onClick={() => setShowCreateForm(true)} className="btn-primary">
              Create Group
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {groups.map((group) => (
              <Link 
                key={group.id} 
                to={`/groups/${group.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{ 
                  background: 'white',
                  border: '1px solid var(--border-gray)',
                  padding: '25px'
                }}
                className="hover-card"
                >
                  <div style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>
                    👥
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', textAlign: 'center' }}>
                    {group.name}
                  </h3>
                  {group.description && (
                    <p style={{ 
                      fontSize: '13px', 
                      color: 'var(--text-gray)',
                      marginBottom: '12px',
                      textAlign: 'center',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {group.description}
                    </p>
                  )}
                  <div style={{ 
                    textAlign: 'center',
                    fontSize: '12px',
                    color: 'var(--light-gray)',
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-gray)'
                  }}>
                    {group.member_count || 0} members
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
