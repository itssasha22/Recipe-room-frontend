import { useParams, useNavigate } from 'react-router-dom';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const groupsData = {
    1: {
      name: 'Italian Cuisine Lovers',
      description: 'A community passionate about authentic Italian cooking',
      image: 'https:
      members: [
        { id: 1, name: 'Chef Sarah', role: 'Admin', avatar: 'https:
        { id: 2, name: 'Chef David', role: 'Member', avatar: 'https:
        { id: 3, name: 'Maria Rossi', role: 'Member', avatar: 'https:
        { id: 4, name: 'Giovanni Bianchi', role: 'Member', avatar: 'https:
        { id: 5, name: 'Lucia Ferrari', role: 'Member', avatar: 'https:
        { id: 6, name: 'Marco Romano', role: 'Member', avatar: 'https:
        { id: 7, name: 'Sofia Conti', role: 'Member', avatar: 'https:
        { id: 8, name: 'Alessandro Ricci', role: 'Member', avatar: 'https:
        { id: 9, name: 'Francesca Marino', role: 'Member', avatar: 'https:
        { id: 10, name: 'Matteo Greco', role: 'Member', avatar: 'https:
        { id: 11, name: 'Elena Lombardi', role: 'Member', avatar: 'https:
        { id: 12, name: 'Luca Gallo', role: 'Member', avatar: 'https:
      ],
      recipes: [
        { id: 1, name: 'Caesar Salad', author: 'Chef Sarah', image: 'https:
        { id: 2, name: 'Spaghetti Carbonara', author: 'Chef Sarah', image: 'https:
        { id: 3, name: 'Tiramisu', author: 'Chef Sarah', image: 'https:
        { id: 10, name: 'Bruschetta', author: 'Chef David', image: 'https:
        { id: 11, name: 'Margherita Pizza', author: 'Chef David', image: 'https:
        { id: 12, name: 'Panna Cotta', author: 'Chef David', image: 'https:
        { id: 19, name: 'Risotto', author: 'Maria Rossi', image: 'https:
        { id: 20, name: 'Lasagna', author: 'Giovanni Bianchi', image: 'https:
      ]
    },
    2: {
      name: 'Kenyan Food Masters',
      description: 'Celebrating traditional and modern Kenyan cuisine',
      image: 'https:
      members: [
        { id: 13, name: 'Chef Wanjiku', role: 'Admin', avatar: 'https:
        { id: 14, name: 'Kamau Njoroge', role: 'Member', avatar: 'https:
        { id: 15, name: 'Akinyi Odhiambo', role: 'Member', avatar: 'https:
        { id: 16, name: 'Mwangi Kariuki', role: 'Member', avatar: 'https:
        { id: 17, name: 'Njeri Wambui', role: 'Member', avatar: 'https:
        { id: 18, name: 'Otieno Omondi', role: 'Member', avatar: 'https:
        { id: 19, name: 'Wangari Muthoni', role: 'Member', avatar: 'https:
        { id: 20, name: 'Kipchoge Kimani', role: 'Member', avatar: 'https:
      ],
      recipes: [
        { id: 16, name: 'Samosas', author: 'Chef Wanjiku', image: 'https:
        { id: 17, name: 'Nyama Choma & Ugali', author: 'Chef Wanjiku', image: 'https:
        { id: 18, name: 'Tropical Fruit Salad', author: 'Chef Wanjiku', image: 'https:
        { id: 21, name: 'Chapati', author: 'Kamau Njoroge', image: 'https:
        { id: 22, name: 'Githeri', author: 'Chef Wanjiku', image: 'https:
      ]
    },
    3: {
      name: 'Dessert Enthusiasts',
      description: 'Sweet treats and desserts from around the world',
      image: 'https:
      members: [
        { id: 21, name: 'Chef Grace', role: 'Admin', avatar: 'https:
        { id: 22, name: 'Emma Watson', role: 'Member', avatar: 'https:
        { id: 23, name: 'Sophie Martin', role: 'Member', avatar: 'https:
        { id: 24, name: 'Oliver Brown', role: 'Member', avatar: 'https:
        { id: 25, name: 'Isabella Garcia', role: 'Member', avatar: 'https:
        { id: 26, name: 'Lucas Silva', role: 'Member', avatar: 'https:
        { id: 27, name: 'Mia Johnson', role: 'Member', avatar: 'https:
        { id: 28, name: 'Noah Williams', role: 'Member', avatar: 'https:
        { id: 29, name: 'Ava Martinez', role: 'Member', avatar: 'https:
        { id: 30, name: 'Ethan Davis', role: 'Member', avatar: 'https:
        { id: 31, name: 'Charlotte Lee', role: 'Member', avatar: 'https:
        { id: 32, name: 'James Wilson', role: 'Member', avatar: 'https:
        { id: 33, name: 'Amelia Taylor', role: 'Member', avatar: 'https:
        { id: 34, name: 'Benjamin Moore', role: 'Member', avatar: 'https:
        { id: 35, name: 'Harper Anderson', role: 'Member', avatar: 'https:
      ],
      recipes: [
        { id: 3, name: 'Tiramisu', author: 'Chef Sarah', image: 'https:
        { id: 6, name: 'Chocolate Lava Cake', author: 'Chef John', image: 'https:
        { id: 9, name: 'Mango Sticky Rice', author: 'Chef Mary', image: 'https:
        { id: 12, name: 'Panna Cotta', author: 'Chef David', image: 'https:
        { id: 15, name: 'Cheesecake', author: 'Chef Grace', image: 'https:
        { id: 18, name: 'Tropical Fruit Salad', author: 'Chef Wanjiku', image: 'https:
        { id: 23, name: 'Brownies', author: 'Emma Watson', image: 'https:
        { id: 24, name: 'Macarons', author: 'Sophie Martin', image: 'https:
        { id: 25, name: 'Crème Brûlée', author: 'Oliver Brown', image: 'https:
        { id: 26, name: 'Apple Pie', author: 'Isabella Garcia', image: 'https:
        { id: 27, name: 'Chocolate Mousse', author: 'Emma Watson', image: 'https:
        { id: 28, name: 'Lemon Tart', author: 'Chef Grace', image: 'https:
      ]
    },
    4: {
      name: 'Quick Meals',
      description: 'Fast and delicious recipes for busy people',
      image: 'https:
      members: [
        { id: 36, name: 'Chef Mary', role: 'Admin', avatar: 'https:
        { id: 37, name: 'John Smith', role: 'Member', avatar: 'https:
        { id: 38, name: 'Sarah Johnson', role: 'Member', avatar: 'https:
        { id: 39, name: 'Michael Brown', role: 'Member', avatar: 'https:
        { id: 40, name: 'Emily Davis', role: 'Member', avatar: 'https:
        { id: 41, name: 'David Wilson', role: 'Member', avatar: 'https:
        { id: 42, name: 'Jessica Martinez', role: 'Member', avatar: 'https:
        { id: 43, name: 'Daniel Garcia', role: 'Member', avatar: 'https:
        { id: 44, name: 'Ashley Rodriguez', role: 'Member', avatar: 'https:
        { id: 45, name: 'Matthew Lee', role: 'Member', avatar: 'https:
        { id: 46, name: 'Amanda White', role: 'Member', avatar: 'https:
        { id: 47, name: 'Christopher Harris', role: 'Member', avatar: 'https:
        { id: 48, name: 'Jennifer Clark', role: 'Member', avatar: 'https:
        { id: 49, name: 'Joshua Lewis', role: 'Member', avatar: 'https:
        { id: 50, name: 'Melissa Walker', role: 'Member', avatar: 'https:
        { id: 51, name: 'Andrew Hall', role: 'Member', avatar: 'https:
        { id: 52, name: 'Stephanie Allen', role: 'Member', avatar: 'https:
        { id: 53, name: 'Ryan Young', role: 'Member', avatar: 'https:
        { id: 54, name: 'Nicole King', role: 'Member', avatar: 'https:
        { id: 55, name: 'Brandon Wright', role: 'Member', avatar: 'https:
      ],
      recipes: [
        { id: 7, name: 'Spring Rolls', author: 'Chef Mary', image: 'https:
        { id: 8, name: 'Chicken Fried Rice', author: 'Chef Mary', image: 'https:
        { id: 13, name: 'Chicken Tacos', author: 'Chef Grace', image: 'https:
        { id: 29, name: 'Quesadillas', author: 'John Smith', image: 'https:
        { id: 30, name: 'Stir Fry', author: 'Sarah Johnson', image: 'https:
        { id: 31, name: 'Pasta Aglio e Olio', author: 'Michael Brown', image: 'https:
        { id: 32, name: 'Grilled Cheese', author: 'Emily Davis', image: 'https:
        { id: 33, name: 'Omelette', author: 'John Smith', image: 'https:
        { id: 34, name: 'Avocado Toast', author: 'Chef Mary', image: 'https:
        { id: 35, name: 'Smoothie Bowl', author: 'Chef Mary', image: 'https:
        { id: 36, name: 'Wraps', author: 'Sarah Johnson', image: 'https:
        { id: 37, name: 'Ramen', author: 'Michael Brown', image: 'https:
        { id: 38, name: 'Poke Bowl', author: 'Emily Davis', image: 'https:
        { id: 39, name: 'Nachos', author: 'John Smith', image: 'https:
        { id: 40, name: 'Soup', author: 'Chef Mary', image: 'https:
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
