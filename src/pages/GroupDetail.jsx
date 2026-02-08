import { useParams, useNavigate } from 'react-router-dom';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const groupsData = {
    1: {
      name: 'Italian Cuisine Lovers',
      description: 'A community passionate about authentic Italian cooking',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
      members: [
        { id: 1, name: 'Chef Sarah', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=100', recipes: 5 },
        { id: 2, name: 'Chef David', role: 'Member', avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=100', recipes: 3 },
        { id: 3, name: 'Maria Rossi', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', recipes: 2 },
        { id: 4, name: 'Giovanni Bianchi', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 1 }
      ],
      recipes: [
        { id: 2, name: 'Spaghetti Carbonara', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
        { id: 11, name: 'Margherita Pizza', author: 'Chef David', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' }
      ]
    },
    2: {
      name: 'Kenyan Food Masters',
      description: 'Celebrating traditional and modern Kenyan cuisine',
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800',
      members: [
        { id: 5, name: 'Chef Wanjiku', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100', recipes: 4 },
        { id: 6, name: 'Kamau Njoroge', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', recipes: 2 },
        { id: 7, name: 'Akinyi Odhiambo', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', recipes: 1 }
      ],
      recipes: [
        { id: 16, name: 'Samosas', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
        { id: 17, name: 'Nyama Choma & Ugali', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' }
      ]
    },
    3: {
      name: 'Dessert Enthusiasts',
      description: 'Sweet treats and desserts from around the world',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
      members: [
        { id: 8, name: 'Chef Grace', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100', recipes: 3 },
        { id: 9, name: 'Emma Watson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', recipes: 2 },
        { id: 10, name: 'Sophie Martin', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 1 }
      ],
      recipes: [
        { id: 3, name: 'Tiramisu', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
        { id: 15, name: 'Cheesecake', author: 'Chef Grace', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400' }
      ]
    },
    4: {
      name: 'Quick Meals',
      description: 'Fast and delicious recipes for busy people',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      members: [
        { id: 11, name: 'Chef Mary', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=100', recipes: 4 },
        { id: 12, name: 'John Smith', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', recipes: 2 }
      ],
      recipes: [
        { id: 8, name: 'Chicken Fried Rice', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' }
      ]
    }
  };

  const group = groupsData[id] || groupsData[1];

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={() => navigate('/groups')} style={{ padding: '0.75rem 1.5rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '2rem' }}>
          ← Back to Groups
        </button>

        <div style={{ background: '#1e1e1e', borderRadius: '16px', overflow: 'hidden', border: '2px solid #8b5cf6', marginBottom: '2rem' }}>
          <img src={group.image} alt={group.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#fdba74', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{group.name}</h1>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1rem' }}>{group.description}</p>
            <div style={{ display: 'flex', gap: '2rem', color: '#10b981', fontSize: '1rem' }}>
              <span>👥 {group.members.length} Members</span>
              <span>📖 {group.recipes.length} Recipes</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div style={{ background: '#1e1e1e', borderRadius: '16px', padding: '1.5rem', border: '2px solid #10b981', height: 'fit-content' }}>
            <h2 style={{ color: '#fdba74', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Members</h2>
            {group.members.map(member => (
              <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#2a2a2a', borderRadius: '8px', marginBottom: '1rem' }}>
                <img src={member.avatar} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #8b5cf6' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.25rem' }}>{member.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.85rem' }}>
                    {member.role === 'Admin' ? '👑 Admin' : '👤 Member'} • {member.recipes} recipes
                  </div>
                </div>
              </div>
            ))}
            <button style={{ width: '100%', padding: '0.75rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '1rem' }}>
              + Invite Members
            </button>
          </div>

          <div>
            <div style={{ background: '#1e1e1e', borderRadius: '16px', padding: '1.5rem', border: '2px solid #8b5cf6', marginBottom: '2rem' }}>
              <h2 style={{ color: '#fdba74', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Group Recipes</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {group.recipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
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
                    <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ color: '#fdba74', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{recipe.name}</h3>
                      <p style={{ color: '#aaa', fontSize: '0.85rem' }}>by {recipe.author}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginTop: '1.5rem' }}>
                + Add Recipe to Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
