import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();
  
  const allRecipes = [
    { id: 1, name: 'Caesar Salad', chef: 'Chef Sarah', course: 'Starter', time: '15 mins', rating: 5, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400' },
    { id: 2, name: 'Spaghetti Carbonara', chef: 'Chef Sarah', course: 'Main Course', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400' },
    { id: 3, name: 'Tiramisu', chef: 'Chef Sarah', course: 'Dessert', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400' },
    
    { id: 4, name: 'French Onion Soup', chef: 'Chef John', course: 'Starter', time: '45 mins', rating: 5, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
    { id: 5, name: 'Beef Burger & Fries', chef: 'Chef John', course: 'Main Course', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1568901346375-23ac9450c58cd?w=400' },
    { id: 6, name: 'Chocolate Lava Cake', chef: 'Chef John', course: 'Dessert', time: '25 mins', rating: 5, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' },
    
    { id: 7, name: 'Spring Rolls', chef: 'Chef Mary', course: 'Starter', time: '30 mins', rating: 4, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400' },
    { id: 8, name: 'Chicken Fried Rice', chef: 'Chef Mary', course: 'Main Course', time: '25 mins', rating: 5, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400' },
    { id: 9, name: 'Mango Sticky Rice', chef: 'Chef Mary', course: 'Dessert', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400' },
    
    { id: 10, name: 'Bruschetta', chef: 'Chef David', course: 'Starter', time: '20 mins', rating: 5, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400' },
    { id: 11, name: 'Margherita Pizza', chef: 'Chef David', course: 'Main Course', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' },
    { id: 12, name: 'Panna Cotta', chef: 'Chef David', course: 'Dessert', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
    
    { id: 13, name: 'Chicken Tacos', chef: 'Chef Grace', course: 'Starter', time: '25 mins', rating: 5, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
    { id: 14, name: 'Grilled Salmon', chef: 'Chef Grace', course: 'Main Course', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
    { id: 15, name: 'Cheesecake', chef: 'Chef Grace', course: 'Dessert', time: '50 mins', rating: 5, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400' },
    
    { id: 16, name: 'Samosas', chef: 'Chef Wanjiku', course: 'Starter', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
    { id: 17, name: 'Nyama Choma & Ugali', chef: 'Chef Wanjiku', course: 'Main Course', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
    { id: 18, name: 'Tropical Fruit Salad', chef: 'Chef Wanjiku', course: 'Dessert', time: '15 mins', rating: 5, image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400' }
  ];

  return (
    <div style={{ padding: '2rem', background: '#000', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fdba74', textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Global Three-Course Meals</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '3rem', fontSize: '1.1rem' }}>Starter • Main Course • Dessert</p>
        
        {['Chef Sarah', 'Chef John', 'Chef Mary', 'Chef David', 'Chef Grace', 'Chef Wanjiku'].map(chefName => {
          const chefRecipes = allRecipes.filter(r => r.chef === chefName);
          return (
            <div key={chefName} style={{ marginBottom: '4rem' }}>
              <h2 style={{ color: '#10b981', marginBottom: '1.5rem', fontSize: '1.8rem', paddingBottom: '0.5rem', borderBottom: '3px solid #10b981', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{chefName}</span>'s Three-Course Menu {chefName === 'Chef Wanjiku' && <span style={{ fontSize: '1rem', background: '#fdba74', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>🇰🇪 Kenyan</span>}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {chefRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    style={{ 
                      background: '#1a1a1a',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                      border: '2px solid #8b5cf6',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                    }}
                  >
                    <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: recipe.course === 'Starter' ? '#fdba74' : recipe.course === 'Main Course' ? '#10b981' : '#8b5cf6', color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                        {recipe.course}
                      </div>
                      <h3 style={{ color: '#fdba74', margin: '0 0 0.75rem 0', fontSize: '1.2rem' }}>{recipe.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.9rem' }}>⏱️ {recipe.time}</span>
                        <span style={{ color: '#fdba74', fontWeight: '600' }}>{'⭐'.repeat(recipe.rating)}</span>
                      </div>
                      <div style={{ marginTop: '1rem', padding: '0.625rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', textAlign: 'center', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                        View Recipe →
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            ← Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
