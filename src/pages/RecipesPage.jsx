import { Link } from 'react-router-dom';

const RecipesPage = () => {
  const recipes = [
    { id: 1, name: 'Pilau Rice', chef: 'Chef Sarah', time: '45 mins', rating: 5, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400' },
    { id: 2, name: 'Biryani', chef: 'Chef Sarah', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
    { id: 3, name: 'Samosas', chef: 'Chef Sarah', time: '40 mins', rating: 4, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400' },
    
    { id: 4, name: 'Chapati', chef: 'Chef John', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: 5, name: 'Naan Bread', chef: 'Chef John', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400' },
    { id: 6, name: 'Roti', chef: 'Chef John', time: '25 mins', rating: 4, image: 'https://images.unsplash.com/photo-1619221882018-1c6e0f12e3c3?w=400' },
    
    { id: 7, name: 'Ugali & Sukuma', chef: 'Chef Mary', time: '25 mins', rating: 4, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { id: 8, name: 'Githeri', chef: 'Chef Mary', time: '50 mins', rating: 5, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400' },
    { id: 9, name: 'Mukimo', chef: 'Chef Mary', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400' },
    
    { id: 10, name: 'Mandazi', chef: 'Chef David', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
    { id: 11, name: 'Mahamri', chef: 'Chef David', time: '45 mins', rating: 5, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
    { id: 12, name: 'Kaimati', chef: 'Chef David', time: '50 mins', rating: 4, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400' },
    
    { id: 13, name: 'Nyama Choma', chef: 'Chef Grace', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' },
    { id: 14, name: 'Fish Fry', chef: 'Chef Grace', time: '35 mins', rating: 5, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { id: 15, name: 'Chicken Stew', chef: 'Chef Grace', time: '55 mins', rating: 5, image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' }
  ];

  const chefs = ['Chef Sarah', 'Chef John', 'Chef Mary', 'Chef David', 'Chef Grace'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Browse Recipes</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Discover delicious recipes from our talented chefs</p>
        </div>

        {chefs.map((chef) => (
          <div key={chef} style={{ marginBottom: '4rem' }}>
            <h2 style={{ color: '#10b981', fontSize: '1.8rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '3px solid #10b981' }}>
              👨🍳 {chef}'s Recipes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {recipes.filter(r => r.chef === chef).map((recipe) => (
                <Link 
                  key={recipe.id} 
                  to={`/recipe/${recipe.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #10b981', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer' }}
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
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/" style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '10px', fontWeight: '600' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;