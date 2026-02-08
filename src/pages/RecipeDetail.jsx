import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const recipes = {
    1: { name: 'Caesar Salad', chef: 'Chef Sarah', time: '15 mins', servings: 4, rating: 5, image: 'https:
    2: { name: 'Spaghetti Carbonara', chef: 'Chef Sarah', time: '30 mins', servings: 4, rating: 5, image: 'https:
    3: { name: 'Tiramisu', chef: 'Chef Sarah', time: '40 mins', servings: 6, rating: 5, image: 'https:
    4: { name: 'French Onion Soup', chef: 'Chef John', time: '45 mins', servings: 4, rating: 5, image: 'https:
    5: { name: 'Beef Burger & Fries', chef: 'Chef John', time: '35 mins', servings: 4, rating: 5, image: 'https:
    6: { name: 'Chocolate Lava Cake', chef: 'Chef John', time: '25 mins', servings: 4, rating: 5, image: 'https:
    7: { name: 'Spring Rolls', chef: 'Chef Mary', time: '30 mins', servings: 6, rating: 4, image: 'https:
    8: { name: 'Chicken Fried Rice', chef: 'Chef Mary', time: '25 mins', servings: 4, rating: 5, image: 'https:
    9: { name: 'Mango Sticky Rice', chef: 'Chef Mary', time: '30 mins', servings: 4, rating: 5, image: 'https:
    10: { name: 'Bruschetta', chef: 'Chef David', time: '20 mins', servings: 6, rating: 5, image: 'https:
    11: { name: 'Margherita Pizza', chef: 'Chef David', time: '40 mins', servings: 4, rating: 5, image: 'https:
    12: { name: 'Panna Cotta', chef: 'Chef David', time: '35 mins', servings: 6, rating: 5, image: 'https:
    13: { name: 'Chicken Tacos', chef: 'Chef Grace', time: '25 mins', servings: 4, rating: 5, image: 'https:
    14: { name: 'Grilled Salmon', chef: 'Chef Grace', time: '30 mins', servings: 4, rating: 5, image: 'https:
    15: { name: 'Cheesecake', chef: 'Chef Grace', time: '50 mins', servings: 8, rating: 5, image: 'https:
    16: { name: 'Samosas', chef: 'Chef Wanjiku', time: '40 mins', servings: 8, rating: 5, image: 'https:
    17: { name: 'Nyama Choma & Ugali', chef: 'Chef Wanjiku', time: '60 mins', servings: 6, rating: 5, image: 'https:
    18: { name: 'Tropical Fruit Salad', chef: 'Chef Wanjiku', time: '15 mins', servings: 6, rating: 5, image: 'https:
  };

  const recipe = recipes[id] || recipes[1];
  const recipeUrl = window.location.href;
  const recipeText = `Check out this amazing recipe: ${recipe.name}`;

  const shareOnFacebook = () => {
    window.open(`https:
  };

  const shareOnTwitter = () => {
    window.open(`https:
  };

  const shareOnWhatsApp = () => {
    window.open(`https:
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    alert(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      alert('Recipe deleted!');
      navigate('/recipes');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#2c2c2c', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Link to="/recipes" style={{ color: '#fdba74', textDecoration: 'none', fontWeight: '600' }}>
            ← Back to Recipes
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={toggleBookmark} style={{ padding: '0.5rem 1rem', background: isBookmarked ? '#fdba74' : '#2a2a2a', color: 'white', border: '2px solid #fdba74', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              {isBookmarked ? '❤️ Saved' : '🤍 Save'}
            </button>
            <button onClick={() => navigate(`/edit-recipe/${id}`)} style={{ padding: '0.5rem 1rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              ✏️ Edit
            </button>
            <button onClick={handleDelete} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              🗑️ Delete
            </button>
          </div>
        </div>

        <div style={{ background: '#1e1e1e', borderRadius: '16px', boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)', overflow: 'hidden', border: '2px solid #8b5cf6' }}>
          <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
          
          <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', color: 'white' }}>{recipe.name}</h1>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>by {recipe.chef}</p>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem' }}>Share this recipe</h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={shareOnFacebook} style={{ padding: '0.75rem 1.5rem', background: '#1877f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  📘 Facebook
                </button>
                <button onClick={shareOnTwitter} style={{ padding: '0.75rem 1.5rem', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  🐦 Twitter
                </button>
                <button onClick={shareOnWhatsApp} style={{ padding: '0.75rem 1.5rem', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  💬 WhatsApp
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #fdba74' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>⏱️ {recipe.time}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Prep Time</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #10b981' }}>
                <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: '700' }}>👥 {recipe.servings}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Servings</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #8b5cf6' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{'⭐'.repeat(recipe.rating)}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Rating</div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>📝 Ingredients</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} style={{ padding: '0.75rem', background: '#2a2a2a', marginBottom: '0.5rem', borderRadius: '8px', border: '2px solid #10b981', color: '#aaa' }}>
                    ✓ {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>👨🍳 Instructions</h3>
              <ol style={{ padding: '0 0 0 1.5rem' }}>
                {recipe.steps.map((step, idx) => (
                  <li key={idx} style={{ padding: '0.75rem 0', color: '#aaa', lineHeight: '1.6', borderBottom: '1px solid #2a2a2a' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
