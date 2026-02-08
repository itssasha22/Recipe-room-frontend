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
        { id: 4, name: 'Giovanni Bianchi', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 1 },
        { id: 5, name: 'Lucia Ferrari', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', recipes: 1 },
        { id: 6, name: 'Marco Romano', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', recipes: 0 },
        { id: 7, name: 'Sofia Conti', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', recipes: 0 },
        { id: 8, name: 'Alessandro Ricci', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', recipes: 0 },
        { id: 9, name: 'Francesca Marino', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 0 },
        { id: 10, name: 'Matteo Greco', role: 'Member', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', recipes: 0 },
        { id: 11, name: 'Elena Lombardi', role: 'Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', recipes: 0 },
        { id: 12, name: 'Luca Gallo', role: 'Member', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', recipes: 0 }
      ],
      recipes: [
        { id: 1, name: 'Caesar Salad', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' },
        { id: 2, name: 'Spaghetti Carbonara', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
        { id: 3, name: 'Tiramisu', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
        { id: 10, name: 'Bruschetta', author: 'Chef David', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400' },
        { id: 11, name: 'Margherita Pizza', author: 'Chef David', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
        { id: 12, name: 'Panna Cotta', author: 'Chef David', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
        { id: 19, name: 'Risotto', author: 'Maria Rossi', image: 'https://images.unsplash.com/photo-1476124369491-c4f9c6c6c8c7?w=400' },
        { id: 20, name: 'Lasagna', author: 'Giovanni Bianchi', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400' }
      ]
    },
    2: {
      name: 'Kenyan Food Masters',
      description: 'Celebrating traditional and modern Kenyan cuisine',
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800',
      members: [
        { id: 13, name: 'Chef Wanjiku', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100', recipes: 4 },
        { id: 14, name: 'Kamau Njoroge', role: 'Member', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', recipes: 1 },
        { id: 15, name: 'Akinyi Odhiambo', role: 'Member', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', recipes: 0 },
        { id: 16, name: 'Mwangi Kariuki', role: 'Member', avatar: 'https://images.unsplash.com/photo-1619194617062-5a83b0c4a92a?w=100', recipes: 0 },
        { id: 17, name: 'Njeri Wambui', role: 'Member', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', recipes: 0 },
        { id: 18, name: 'Otieno Omondi', role: 'Member', avatar: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=100', recipes: 0 },
        { id: 19, name: 'Wangari Muthoni', role: 'Member', avatar: 'https://images.unsplash.com/photo-1598550487031-0d6eaf2e4b4b?w=100', recipes: 0 },
        { id: 20, name: 'Kipchoge Kimani', role: 'Member', avatar: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?w=100', recipes: 0 }
      ],
      recipes: [
        { id: 16, name: 'Samosas', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
        { id: 17, name: 'Nyama Choma & Ugali', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
        { id: 18, name: 'Tropical Fruit Salad', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400' },
        { id: 21, name: 'Chapati', author: 'Kamau Njoroge', image: 'https://images.unsplash.com/photo-1619221882018-04f8f7539bc9?w=400' },
        { id: 22, name: 'Githeri', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1587486937736-e7c6b76da0e9?w=400' }
      ]
    },
    3: {
      name: 'Dessert Enthusiasts',
      description: 'Sweet treats and desserts from around the world',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
      members: [
        { id: 21, name: 'Chef Grace', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100', recipes: 3 },
        { id: 22, name: 'Emma Watson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', recipes: 2 },
        { id: 23, name: 'Sophie Martin', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 1 },
        { id: 24, name: 'Oliver Brown', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 1 },
        { id: 25, name: 'Isabella Garcia', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', recipes: 1 },
        { id: 26, name: 'Lucas Silva', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', recipes: 0 },
        { id: 27, name: 'Mia Johnson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', recipes: 0 },
        { id: 28, name: 'Noah Williams', role: 'Member', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', recipes: 0 },
        { id: 29, name: 'Ava Martinez', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', recipes: 0 },
        { id: 30, name: 'Ethan Davis', role: 'Member', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', recipes: 0 },
        { id: 31, name: 'Charlotte Lee', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100', recipes: 0 },
        { id: 32, name: 'James Wilson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', recipes: 0 },
        { id: 33, name: 'Amelia Taylor', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 0 },
        { id: 34, name: 'Benjamin Moore', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 0 },
        { id: 35, name: 'Harper Anderson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', recipes: 0 }
      ],
      recipes: [
        { id: 3, name: 'Tiramisu', author: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
        { id: 6, name: 'Chocolate Lava Cake', author: 'Chef John', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' },
        { id: 9, name: 'Mango Sticky Rice', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400' },
        { id: 12, name: 'Panna Cotta', author: 'Chef David', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
        { id: 15, name: 'Cheesecake', author: 'Chef Grace', image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400' },
        { id: 18, name: 'Tropical Fruit Salad', author: 'Chef Wanjiku', image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400' },
        { id: 23, name: 'Brownies', author: 'Emma Watson', image: 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=400' },
        { id: 24, name: 'Macarons', author: 'Sophie Martin', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400' },
        { id: 25, name: 'Crème Brûlée', author: 'Oliver Brown', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400' },
        { id: 26, name: 'Apple Pie', author: 'Isabella Garcia', image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=400' },
        { id: 27, name: 'Chocolate Mousse', author: 'Emma Watson', image: 'https://images.unsplash.com/photo-1541599468348-e96984315921?w=400' },
        { id: 28, name: 'Lemon Tart', author: 'Chef Grace', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400' }
      ]
    },
    4: {
      name: 'Quick Meals',
      description: 'Fast and delicious recipes for busy people',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      members: [
        { id: 36, name: 'Chef Mary', role: 'Admin', avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=100', recipes: 4 },
        { id: 37, name: 'John Smith', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', recipes: 2 },
        { id: 38, name: 'Sarah Johnson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', recipes: 1 },
        { id: 39, name: 'Michael Brown', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 1 },
        { id: 40, name: 'Emily Davis', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', recipes: 1 },
        { id: 41, name: 'David Wilson', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', recipes: 0 },
        { id: 42, name: 'Jessica Martinez', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', recipes: 0 },
        { id: 43, name: 'Daniel Garcia', role: 'Member', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', recipes: 0 },
        { id: 44, name: 'Ashley Rodriguez', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 0 },
        { id: 45, name: 'Matthew Lee', role: 'Member', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', recipes: 0 },
        { id: 46, name: 'Amanda White', role: 'Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', recipes: 0 },
        { id: 47, name: 'Christopher Harris', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 0 },
        { id: 48, name: 'Jennifer Clark', role: 'Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', recipes: 0 },
        { id: 49, name: 'Joshua Lewis', role: 'Member', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', recipes: 0 },
        { id: 50, name: 'Melissa Walker', role: 'Member', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100', recipes: 0 },
        { id: 51, name: 'Andrew Hall', role: 'Member', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', recipes: 0 },
        { id: 52, name: 'Stephanie Allen', role: 'Member', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', recipes: 0 },
        { id: 53, name: 'Ryan Young', role: 'Member', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', recipes: 0 },
        { id: 54, name: 'Nicole King', role: 'Member', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', recipes: 0 },
        { id: 55, name: 'Brandon Wright', role: 'Member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', recipes: 0 }
      ],
      recipes: [
        { id: 7, name: 'Spring Rolls', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400' },
        { id: 8, name: 'Chicken Fried Rice', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
        { id: 13, name: 'Chicken Tacos', author: 'Chef Grace', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
        { id: 29, name: 'Quesadillas', author: 'John Smith', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400' },
        { id: 30, name: 'Stir Fry', author: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' },
        { id: 31, name: 'Pasta Aglio e Olio', author: 'Michael Brown', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400' },
        { id: 32, name: 'Grilled Cheese', author: 'Emily Davis', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400' },
        { id: 33, name: 'Omelette', author: 'John Smith', image: 'https://images.unsplash.com/photo-1612240498936-65cfbcf07e92?w=400' },
        { id: 34, name: 'Avocado Toast', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400' },
        { id: 35, name: 'Smoothie Bowl', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400' },
        { id: 36, name: 'Wraps', author: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400' },
        { id: 37, name: 'Ramen', author: 'Michael Brown', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400' },
        { id: 38, name: 'Poke Bowl', author: 'Emily Davis', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
        { id: 39, name: 'Nachos', author: 'John Smith', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400' },
        { id: 40, name: 'Soup', author: 'Chef Mary', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' }
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
