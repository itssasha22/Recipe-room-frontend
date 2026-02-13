import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import groupService from '../services/groupService';

const BrowseGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleJoinGroup = async (groupId) => {
    try {
      await groupService.joinGroup(groupId);
      fetchGroups();
    } catch (err) {
      setError('Failed to join group');
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
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '25px 15px' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>Discover Groups</h1>
          <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
            {groups.length} cooking groups to explore
          </p>
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

        {groups.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: 'white',
            border: '1px solid var(--border-gray)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>No groups yet</h2>
            <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
              Be the first to create a group!
            </p>
          </div>
        ) : (
          <div className="grid-3">
            {groups.map((group) => (
              <div 
                key={group.id}
                style={{ 
                  background: 'white',
                  border: '1px solid var(--border-gray)',
                  padding: '25px'
                }}
                className="hover-card"
              >
                {group.image_url ? (
                  <img src={group.image_url} alt={group.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '12px' }} />
                ) : (
                  <div style={{ fontSize: '36px', marginBottom: '12px', textAlign: 'center' }}>
                    👥
                  </div>
                )}
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
                  marginBottom: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-gray)'
                }}>
                  {group.member_count || 0} members · by {group.creator_name}
                </div>
                <button 
                  onClick={() => handleJoinGroup(group.id)}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '14px', padding: '10px' }}
                >
                  Join Group
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGroups;
