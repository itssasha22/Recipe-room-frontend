import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedChef, setSelectedChef] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxServings, setMaxServings] = useState(100);
  const [searchIngredient, setSearchIngredient] = useState('');
  
  const allRecipes = [
    { id: 1, name: 'Caesar Salad', chef: 'Chef Sarah', course: 'Starter', time: '15 mins', rating: 5, servings: 4, country: 'Italy', ingredients: ['Romaine lettuce', 'Parmesan', 'Croutons'], image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', createdAt: '2024-01-15' },
    { id: 2, name: 'Spaghetti Carbonara', chef: 'Chef Sarah', course: 'Main Course', time: '30 mins', rating: 5, servings: 4, country: 'Italy', ingredients: ['Spaghetti', 'Eggs', 'Pancetta'], image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', createdAt: '2024-01-16' },
    { id: 3, name: 'Tiramisu', chef: 'Chef Sarah', course: 'Dessert', time: '40 mins', rating: 5, servings: 6, country: 'Italy', ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers'], image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', createdAt: '2024-01-17' },
    
    { id: 4, name: 'French Onion Soup', chef: 'Chef John', course: 'Starter', time: '45 mins', rating: 5, servings: 4, country: 'France', ingredients: ['Onions', 'Beef broth', 'Gruyere'], image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400', createdAt: '2024-01-18' },
    { id: 5, name: 'Beef Burger & Fries', chef: 'Chef John', course: 'Main Course', time: '35 mins', rating: 5, servings: 4, country: 'USA', ingredients: ['Beef', 'Buns', 'Potatoes'], image: 'https://images.unsplash.com/photo-1568901346375-23ac9450c58cd?w=400', createdAt: '2024-01-19' },
    { id: 6, name: 'Chocolate Lava Cake', chef: 'Chef John', course: 'Dessert', time: '25 mins', rating: 5, servings: 4, country: 'France', ingredients: ['Chocolate', 'Butter', 'Eggs'], image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400', createdAt: '2024-01-20' },
    
    { id: 7, name: 'Spring Rolls', chef: 'Chef Mary', course: 'Starter', time: '30 mins', rating: 4, servings: 6, country: 'Vietnam', ingredients: ['Rice paper', 'Shrimp', 'Vegetables'], image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400', createdAt: '2024-01-21' },
    { id: 8, name: 'Chicken Fried Rice', chef: 'Chef Mary', course: 'Main Course', time: '25 mins', rating: 5, servings: 4, country: 'China', ingredients: ['Rice', 'Chicken', 'Soy sauce'], image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', createdAt: '2024-01-22' },
    { id: 9, name: 'Mango Sticky Rice', chef: 'Chef Mary', course: 'Dessert', time: '30 mins', rating: 5, servings: 4, country: 'Thailand', ingredients: ['Sticky rice', 'Mango', 'Coconut milk'], image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400', createdAt: '2024-01-23' },
    
    { id: 10, name: 'Bruschetta', chef: 'Chef David', course: 'Starter', time: '20 mins', rating: 5, servings: 6, country: 'Italy', ingredients: ['Tomatoes', 'Basil', 'Bread'], image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400', createdAt: '2024-01-24' },
    { id: 11, name: 'Margherita Pizza', chef: 'Chef David', course: 'Main Course', time: '40 mins', rating: 5, servings: 4, country: 'Italy', ingredients: ['Dough', 'Mozzarella', 'Tomato sauce'], image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', createdAt: '2024-01-25' },
    { id: 12, name: 'Panna Cotta', chef: 'Chef David', course: 'Dessert', time: '35 mins', rating: 5, servings: 6, country: 'Italy', ingredients: ['Cream', 'Sugar', 'Gelatin'], image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', createdAt: '2024-01-26' },
    
    { id: 13, name: 'Chicken Tacos', chef: 'Chef Grace', course: 'Starter', time: '25 mins', rating: 5, servings: 4, country: 'Mexico', ingredients: ['Chicken', 'Tortillas', 'Salsa'], image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400', createdAt: '2024-01-27' },
    { id: 14, name: 'Grilled Salmon', chef: 'Chef Grace', course: 'Main Course', time: '30 mins', rating: 5, servings: 4, country: 'Norway', ingredients: ['Salmon', 'Lemon', 'Dill'], image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', createdAt: '2024-01-28' },
    { id: 15, name: 'Cheesecake', chef: 'Chef Grace', course: 'Dessert', time: '50 mins', rating: 5, servings: 8, country: 'USA', ingredients: ['Cream cheese', 'Graham crackers', 'Sugar'], image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400', createdAt: '2024-01-29' },
    
    { id: 16, name: 'Samosas', chef: 'Chef Wanjiku', course: 'Starter', time: '40 mins', rating: 5, servings: 8, country: 'Kenya', ingredients: ['Flour', 'Potatoes', 'Peas'], image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', createdAt: '2024-01-30' },
    { id: 17, name: 'Nyama Choma & Ugali', chef: 'Chef Wanjiku', course: 'Main Course', time: '60 mins', rating: 5, servings: 6, country: 'Kenya', ingredients: ['Goat meat', 'Maize flour', 'Salt'], image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', createdAt: '2024-01-31' },
    { id: 18, name: 'Tropical Fruit Salad', chef: 'Chef Wanjiku', course: 'Dessert', time: '15 mins', rating: 5, servings: 6, country: 'Kenya', ingredients: ['Pineapple', 'Mango', 'Papaya'], image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400', createdAt: '2024-02-01' }
  ];

  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || recipe.course === selectedCourse;
    const matchesChef = selectedChef === 'All' || recipe.chef === selectedChef;
    const matchesCountry = selectedCountry === 'All' || recipe.country === selectedCountry;
    const matchesRating = recipe.rating >= minRating;
    const matchesServings = recipe.servings <= maxServings;
    const matchesIngredient = !searchIngredient || recipe.ingredients.some(ing => ing.toLowerCase().includes(searchIngredient.toLowerCase()));
    return matchesSearch && matchesCourse && matchesChef && matchesCountry && matchesRating && matchesServings && matchesIngredient;
  });

  const chefs = ['All', 'Chef Sarah', 'Chef John', 'Chef Mary', 'Chef David', 'Chef Grace', 'Chef Wanjiku'];
  const courses = ['All', 'Starter', 'Main Course', 'Dessert'];
  const countries = ['All', 'Italy', 'France', 'USA', 'China', 'Thailand', 'Vietnam', 'Mexico', 'Norway', 'Kenya'];

  return (
    <div style={{ padding: '2rem', background: '#2c2c2c', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#fdba74', textAlign: 'center', marginBottom: '0.5rem', fontSize: '2.5rem' }}>Global Recipe Collection</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem', fontSize: '1.1rem' }}>Search, Filter & Discover Amazing Recipes</p>
        
        <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', marginBottom: '3rem', border: '2px solid #8b5cf6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🔍 Search Name</label>
              <input
                type="text"
                placeholder="Recipe name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🥗 Ingredient</label>
              <input
                type="text"
                placeholder="Search ingredient..."
                value={searchIngredient}
                onChange={(e) => setSearchIngredient(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🍽️ Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                {courses.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>👨🍳 Chef</label>
              <select
                value={selectedChef}
                onChange={(e) => setSelectedChef(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                {chefs.map(chef => <option key={chef} value={chef}>{chef}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>🌍 Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>⭐ Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              >
                <option value={0}>All Ratings</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>👥 Max Servings</label>
              <input
                type="number"
                value={maxServings}
                onChange={(e) => setMaxServings(Number(e.target.value))}
                min="1"
                max="100"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '2px solid #8b5cf6', background: '#2a2a2a', color: 'white', fontSize: '0.95rem' }}
              />
            </div>
          </div>
          
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#10b981', fontWeight: '600' }}>
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No recipes found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                style={{ 
                  background: '#1e1e1e',
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
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ padding: '0.25rem 0.75rem', background: recipe.course === 'Starter' ? '#fdba74' : recipe.course === 'Main Course' ? '#10b981' : '#8b5cf6', color: 'white', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600' }}>
                      {recipe.course}
                    </span>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#2a2a2a', color: '#aaa', borderRadius: '20px', fontSize: '0.7rem' }}>
                      {recipe.country}
                    </span>
                  </div>
                  <h3 style={{ color: '#fdba74', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{recipe.name}</h3>
                  <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '0.75rem' }}>by {recipe.chef}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.85rem' }}>⏱️ {recipe.time}</span>
                    <span style={{ color: '#fdba74', fontWeight: '600', fontSize: '0.85rem' }}>{'⭐'.repeat(recipe.rating)}</span>
                  </div>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>👥 Serves {recipe.servings}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/create-recipe')} style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            + Create Recipe
          </button>
          <button onClick={() => navigate('/')} style={{ padding: '1rem 2rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' }}>
            ← Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
