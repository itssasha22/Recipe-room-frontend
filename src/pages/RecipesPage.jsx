import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();
  
  const recipes = [
    { id: 1, name: 'Samosas', chef: 'Chef Sarah', course: 'Starter', time: '40 mins', rating: 4, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
    { id: 2, name: 'Pilau Rice', chef: 'Chef Sarah', course: 'Main Course', time: '45 mins', rating: 5, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400' },
    { id: 3, name: 'Kheer (Rice Pudding)', chef: 'Chef Sarah', course: 'Dessert', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
    
    { id: 4, name: 'Vegetable Soup', chef: 'Chef John', course: 'Starter', time: '25 mins', rating: 4, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400' },
    { id: 5, name: 'Chapati & Curry', chef: 'Chef John', course: 'Main Course', time: '50 mins', rating: 5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: 6, name: 'Gulab Jamun', chef: 'Chef John', course: 'Dessert', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400' },
    
    { id: 7, name: 'Kachumbari Salad', chef: 'Chef Mary', course: 'Starter', time: '15 mins', rating: 4, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
    { id: 8, name: 'Ugali & Sukuma Wiki', chef: 'Chef Mary', course: 'Main Course', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { id: 9, name: 'Fruit Salad', chef: 'Chef Mary', course: 'Dessert', time: '20 mins', rating: 4, image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400' },
    
    { id: 10, name: 'Bhajia', chef: 'Chef David', course: 'Starter', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
    { id: 11, name: 'Biryani', chef: 'Chef David', course: 'Main Course', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
    { id: 12, name: 'Mandazi', chef: 'Chef David', course: 'Dessert', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
    
    { id: 13, name: 'Chicken Wings', chef: 'Chef Grace', course: 'Starter', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400' },
    { id: 14, name: 'Nyama Choma', chef: 'Chef Grace', course: 'Main Course', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
    { id: 15, name: 'Ice Cream Sundae', chef: 'Chef Grace', course: 'Dessert', time: '10 mins', rating: 5, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400' }
  ];

  const chefs = ['Chef Sarah', 'Chef John', 'Chef Mary', 'Chef David', 'Chef Grace'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Three-Course Meals</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Starter • Main Course • Dessert</p>
        </div>

        {chefs.map((chef) => (
          <div key={chef} style={{ marginBottom: '4rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.8rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '3px solid #10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👨🍳 {chef}'s Three-Course Menu
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {recipes.filter(r => r.chef === chef).map((recipe) => (
                <div 
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #10b981', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                  <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: recipe.course === 'Starter' ? '#fdba74' : recipe.course === 'Main Course' ? '#10b981' : '#8b5cf6', color: 'white', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                      {recipe.course}
                    </div>
                    <h3 style={{ color: '#8b5cf6', margin: '0 0 0.75rem 0', fontSize: '1.2rem' }}>{recipe.name}</h3>
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
        ))}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;