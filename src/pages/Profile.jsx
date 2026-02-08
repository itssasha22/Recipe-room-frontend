import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'Chef Sarah',
    email: 'sarah@reciperoom.com',
    bio: 'Passionate home cook sharing simple, delicious recipes',
    location: 'Nairobi, Kenya',
    recipesCount: 12,
    followersCount: 234
  });

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '2px solid #10b981', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', height: '150px', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-50px', left: '2rem', width: '120px', height: '120px', borderRadius: '50%', border: '5px solid white', background: '#fdba74', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              👨‍🍳
            </div>
          </div>

          <div style={{ padding: '4rem 2rem 2rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                {editing ? (
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    style={{ fontSize: '1.8rem', fontWeight: '700', color: '#8b5cf6', border: '2px solid #10b981', borderRadius: '8px', padding: '0.5rem', marginBottom: '0.5rem' }}
                  />
                ) : (
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#8b5cf6', margin: '0 0 0.5rem 0' }}>{profileData.username}</h2>
                )}
                <p style={{ color: '#666', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📧 {profileData.email}
                </p>
                <p style={{ color: '#666', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📍 {profileData.location}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {editing ? (
                  <>
                    <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                      💾 Save
                    </button>
                    <button onClick={() => setEditing(false)} style={{ padding: '0.75rem 1.5rem', background: '#fdba74', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                      ✖️ Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} style={{ padding: '0.75rem 1.5rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f9fafb', borderRadius: '12px', border: '2px solid #10b981' }}>
              {editing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #10b981', borderRadius: '8px', fontSize: '1rem', minHeight: '80px' }}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p style={{ color: '#666', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
                  {profileData.bio}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>{profileData.recipesCount}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Recipes Shared</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #fdba74 100%)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>{profileData.followersCount}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Followers</div>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #fdba74 0%, #8b5cf6 100%)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700' }}>4.8⭐</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '2rem', border: '2px solid #10b981', marginBottom: '2rem' }}>
          <h3 style={{ color: '#8b5cf6', marginBottom: '1.5rem', fontSize: '1.5rem' }}>My Recent Recipes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {['Pilau Rice', 'Chapati', 'Ugali & Sukuma', 'Mandazi'].map((recipe, idx) => (
              <div key={idx} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '10px', border: '2px solid #10b981', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
                <div style={{ color: '#8b5cf6', fontWeight: '600' }}>{recipe}</div>
                <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.25rem' }}>⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ padding: '0.875rem 2rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: '600' }}>
            🏠 Home
          </Link>
          <button onClick={handleLogout} style={{ padding: '0.875rem 2rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;