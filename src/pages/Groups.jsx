import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const groups = [
    { id: 1, name: 'Italian Cuisine Lovers', members: 12, recipes: 8, image: 'https:
    { id: 2, name: 'Kenyan Food Masters', members: 8, recipes: 5, image: 'https:
    { id: 3, name: 'Dessert Enthusiasts', members: 15, recipes: 12, image: 'https:
    { id: 4, name: 'Quick Meals', members: 20, recipes: 15, image: 'https:
  ];

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      alert(`Group "${newGroupName}" created!`);
      setNewGroupName('');
      setShowCreateModal(false);
    }
  };

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {groups.map(group => (
            <div 
              key={group.id}
              onClick={() => navigate(`/group/${group.id}`)}
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
              <img src={group.image} alt={group.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: '#fdba74', fontSize: '1.3rem', marginBottom: '1rem' }}>{group.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <span>👥 {group.members} members</span>
                  <span>📖 {group.recipes} recipes</span>
                </div>
                <button style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  View Group →
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', border: '2px solid #8b5cf6', maxWidth: '500px', width: '90%' }}>
              <h2 style={{ color: '#fdba74', marginBottom: '1.5rem' }}>Create New Group</h2>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '1rem', marginBottom: '1.5rem' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleCreateGroup} style={{ flex: 1, padding: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Create
                </button>
                <button onClick={() => setShowCreateModal(false)} style={{ flex: 1, padding: '0.75rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
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
