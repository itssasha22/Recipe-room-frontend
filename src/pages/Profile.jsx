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

  const myRecipes = [
    { name: 'Caesar Salad', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300', rating: 5 },
    { name: 'Spaghetti Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300', rating: 5 },
    { name: 'Tiramisu', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300', rating: 5 },
    { name: 'Bruschetta', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300', rating: 4 }
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ background: '#1a1a1a', borderRadius: '16px', boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)', overflow: 'hidden', border: '2px solid #8b5cf6', marginBottom: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', height: '150px', position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: '-50px', left: '2rem', width: '120px', height: '120px', borderRadius: '50%', border: '5px solid #fdba74', background: 'url(https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200) center/cover', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}></div>
          </div>

          <div style={{ padding: '4rem 2rem 2rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                {editing ? (
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fdba74', border: '2px solid #10b981', borderRadius: '8px', padding: '0.5rem', marginBottom: '0.5rem', background: '#2a2a2a' }}
                  />
                ) : (
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#fdba74', margin: '0 0 0.5rem 0' }}>{profileData.username}</h2>
                )}
                <p style={{ color: '#aaa', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📧 {profileData.email}
                </p>
                <p style={{ color: '#aaa', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📍 {profileData.location}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                {editing ? (
                  <>
                    <button onClick={handleSave} style={{ padding: '0.75rem 1.5rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                      💾 Save
                    </button>
                    <button onClick={() => setEditing(false)} style={{ padding: '0.75rem 1.5rem', background: '#fdba74', color: '#000', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
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

            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#2a2a2a', borderRadius: '12px', border: '2px solid #10b981' }}>
              {editing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', border: '2px solid #10b981', borderRadius: '8px', fontSize: '1rem', minHeight: '80px', background: '#1a1a1a', color: 'white' }}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p style={{ color: '#aaa', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
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

        <div style={{ background: '#1a1a1a', borderRadius: '16px', boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)', padding: '2rem', border: '2px solid #10b981', marginBottom: '2rem' }}>
          <h3 style={{ color: '#fdba74', marginBottom: '1.5rem', fontSize: '1.5rem' }}>My Recent Recipes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {myRecipes.map((recipe, idx) => (
              <div key={idx} style={{ background: '#2a2a2a', borderRadius: '10px', border: '2px solid #8b5cf6', overflow: 'hidden', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ color: '#10b981', fontWeight: '600', marginBottom: '0.5rem' }}>{recipe.name}</div>
                  <div style={{ color: '#fdba74', fontSize: '0.85rem' }}>{'⭐'.repeat(recipe.rating)}</div>
                </div>
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
