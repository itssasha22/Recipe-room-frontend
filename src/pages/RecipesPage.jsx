import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();
  
  const allRecipes = [
    { id: 1, name: 'Caesar Salad', chef: 'Chef Sarah', course: 'Starter', time: '15 mins', rating: 5 },
    { id: 2, name: 'Spaghetti Carbonara', chef: 'Chef Sarah', course: 'Main', time: '30 mins', rating: 5 },
    { id: 3, name: 'Tiramisu', chef: 'Chef Sarah', course: 'Dessert', time: '40 mins', rating: 5 },
    
    { id: 4, name: 'French Onion Soup', chef: 'Chef John', course: 'Starter', time: '45 mins', rating: 5 },
    { id: 5, name: 'Beef Burger', chef: 'Chef John', course: 'Main', time: '35 mins', rating: 5 },
    { id: 6, name: 'Chocolate Cake', chef: 'Chef John', course: 'Dessert', time: '25 mins', rating: 5 },
    
    { id: 7, name: 'Spring Rolls', chef: 'Chef Mary', course: 'Starter', time: '30 mins', rating: 4 },
    { id: 8, name: 'Fried Rice', chef: 'Chef Mary', course: 'Main', time: '25 mins', rating: 5 },
    { id: 9, name: 'Mango Rice', chef: 'Chef Mary', course: 'Dessert', time: '30 mins', rating: 5 },
    
    { id: 10, name: 'Bruschetta', chef: 'Chef David', course: 'Starter', time: '20 mins', rating: 5 },
    { id: 11, name: 'Pizza', chef: 'Chef David', course: 'Main', time: '40 mins', rating: 5 },
    { id: 12, name: 'Panna Cotta', chef: 'Chef David', course: 'Dessert', time: '35 mins', rating: 5 },
    
    { id: 13, name: 'Tacos', chef: 'Chef Grace', course: 'Starter', time: '25 mins', rating: 5 },
    { id: 14, name: 'Grilled Salmon', chef: 'Chef Grace', course: 'Main', time: '30 mins', rating: 5 },
    { id: 15, name: 'Cheesecake', chef: 'Chef Grace', course: 'Dessert', time: '50 mins', rating: 5 },
    
    { id: 16, name: 'Samosas', chef: 'Chef Wanjiku', course: 'Starter', time: '40 mins', rating: 5 },
    { id: 17, name: 'Nyama Choma', chef: 'Chef Wanjiku', course: 'Main', time: '60 mins', rating: 5 },
    { id: 18, name: 'Mandazi', chef: 'Chef Wanjiku', course: 'Dessert', time: '35 mins', rating: 5 }
  ];

  return (
    <div style={{ padding: '2rem', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#8b5cf6', textAlign: 'center', marginBottom: '2rem' }}>All Chefs & Recipes</h1>
        
        {['Chef Sarah', 'Chef John', 'Chef Mary', 'Chef David', 'Chef Grace', 'Chef Wanjiku'].map(chefName => {
          const chefRecipes = allRecipes.filter(r => r.chef === chefName);
          return (
            <div key={chefName} style={{ marginBottom: '3rem', background: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h2 style={{ color: '#10b981', marginBottom: '1.5rem' }}>
                👨🍳 {chefName} ({chefRecipes.length} recipes)
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {chefRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    style={{ 
                      padding: '1.5rem', 
                      background: '#f9fafb', 
                      borderRadius: '10px', 
                      border: '2px solid #10b981',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ fontSize: '0.75rem', color: 'white', background: recipe.course === 'Starter' ? '#fdba74' : recipe.course === 'Main' ? '#10b981' : '#8b5cf6', padding: '0.25rem 0.5rem', borderRadius: '10px', display: 'inline-block', marginBottom: '0.5rem' }}>
                      {recipe.course}
                    </div>
                    <h3 style={{ color: '#8b5cf6', margin: '0.5rem 0' }}>{recipe.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>⏱️ {recipe.time} • {'⭐'.repeat(recipe.rating)}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            ← Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;