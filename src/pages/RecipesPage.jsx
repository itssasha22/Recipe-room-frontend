import { Link } from 'react-router-dom';

const RecipesPage = () => {
  const recipes = [
    { id: 1, name: 'Pilau Rice', chef: 'Chef Sarah', time: '45 mins', rating: 5, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400' },
    { id: 2, name: 'Chapati', chef: 'Chef John', time: '30 mins', rating: 5, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: 3, name: 'Ugali & Sukuma', chef: 'Chef Mary', time: '25 mins', rating: 4, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { id: 4, name: 'Mandazi', chef: 'Chef David', time: '40 mins', rating: 5, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400' },
    { id: 5, name: 'Nyama Choma', chef: 'Chef Grace', time: '60 mins', rating: 5, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Browse Recipes</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Discover delicious recipes from our talented chefs</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {recipes.map((recipe) => (
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
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: '#8b5cf6', margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>{recipe.name}</h3>
                  <p style={{ color: '#666', margin: '0 0 1rem 0', fontSize: '0.95rem' }}>👨🍳 {recipe.chef}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>⏱️ {recipe.time}</span>
                    <span style={{ color: '#fdba74', fontWeight: '600' }}>{'⭐'.repeat(recipe.rating)}</span>
                  </div>
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', textAlign: 'center', borderRadius: '8px', fontWeight: '600' }}>
                    View Recipe →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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