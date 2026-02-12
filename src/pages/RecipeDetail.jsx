import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const recipes = {
    1: { name: 'Caesar Salad', chef: 'Chef Sarah', time: '15 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800', ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing', 'Lemon', 'Black pepper'], steps: ['Wash and chop lettuce', 'Make Caesar dressing', 'Toss lettuce with dressing', 'Add croutons and parmesan', 'Serve immediately'] },
    2: { name: 'Spaghetti Carbonara', chef: 'Chef Sarah', time: '30 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800', ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta', 'Black pepper', 'Salt'], steps: ['Boil pasta until al dente', 'Fry pancetta until crispy', 'Mix eggs with parmesan', 'Combine hot pasta with egg mixture', 'Add pancetta and serve'] },
    3: { name: 'Tiramisu', chef: 'Chef Sarah', time: '40 mins', servings: 6, rating: 5, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800', ingredients: ['Ladyfinger biscuits', 'Mascarpone', 'Eggs', 'Coffee', 'Cocoa powder', 'Sugar'], steps: ['Make coffee and let cool', 'Beat eggs with sugar', 'Mix in mascarpone', 'Dip biscuits in coffee', 'Layer biscuits and cream', 'Dust with cocoa powder'] },
    4: { name: 'French Onion Soup', chef: 'Chef John', time: '45 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', ingredients: ['Onions', 'Beef broth', 'Butter', 'Bread', 'Gruyere cheese', 'Thyme'], steps: ['Caramelize onions slowly', 'Add beef broth and simmer', 'Toast bread slices', 'Pour soup into bowls', 'Top with bread and cheese', 'Broil until cheese melts'] },
    5: { name: 'Beef Burger & Fries', chef: 'Chef John', time: '35 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1568901346375-23ac9450c58cd?w=800', ingredients: ['Ground beef', 'Burger buns', 'Lettuce', 'Tomato', 'Cheese', 'Potatoes', 'Oil'], steps: ['Form beef into patties', 'Season with salt and pepper', 'Grill burgers to desired doneness', 'Cut potatoes into fries', 'Deep fry until golden', 'Assemble burgers and serve'] },
    6: { name: 'Chocolate Lava Cake', chef: 'Chef John', time: '25 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800', ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla'], steps: ['Melt chocolate and butter', 'Beat eggs with sugar', 'Fold in chocolate mixture', 'Add flour gently', 'Pour into ramekins', 'Bake until edges set'] },
    7: { name: 'Spring Rolls', chef: 'Chef Mary', time: '30 mins', servings: 6, rating: 4, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800', ingredients: ['Rice paper', 'Shrimp', 'Vegetables', 'Rice noodles', 'Mint', 'Dipping sauce'], steps: ['Cook shrimp and noodles', 'Prepare vegetables', 'Soak rice paper', 'Fill with ingredients', 'Roll tightly', 'Serve with sauce'] },
    8: { name: 'Chicken Fried Rice', chef: 'Chef Mary', time: '25 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800', ingredients: ['Rice', 'Chicken', 'Eggs', 'Vegetables', 'Soy sauce', 'Garlic'], steps: ['Cook rice and let cool', 'Dice chicken and vegetables', 'Scramble eggs', 'Stir fry chicken', 'Add rice and vegetables', 'Season with soy sauce'] },
    9: { name: 'Mango Sticky Rice', chef: 'Chef Mary', time: '30 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800', ingredients: ['Sticky rice', 'Coconut milk', 'Sugar', 'Mango', 'Salt', 'Sesame seeds'], steps: ['Soak rice overnight', 'Steam rice until tender', 'Heat coconut milk with sugar', 'Mix rice with coconut milk', 'Slice fresh mango', 'Serve rice with mango'] },
    10: { name: 'Bruschetta', chef: 'Chef David', time: '20 mins', servings: 6, rating: 5, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800', ingredients: ['Baguette', 'Tomatoes', 'Basil', 'Garlic', 'Olive oil', 'Balsamic'], steps: ['Slice and toast bread', 'Dice tomatoes', 'Chop fresh basil', 'Mix tomatoes with garlic', 'Top bread with mixture', 'Drizzle with olive oil'] },
    11: { name: 'Margherita Pizza', chef: 'Chef David', time: '40 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800', ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil', 'Olive oil', 'Salt'], steps: ['Roll out pizza dough', 'Spread tomato sauce', 'Add mozzarella slices', 'Bake at high heat', 'Add fresh basil', 'Drizzle with olive oil'] },
    12: { name: 'Panna Cotta', chef: 'Chef David', time: '35 mins', servings: 6, rating: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800', ingredients: ['Heavy cream', 'Sugar', 'Vanilla', 'Gelatin', 'Berries', 'Mint'], steps: ['Heat cream with sugar', 'Add vanilla extract', 'Dissolve gelatin', 'Mix into cream', 'Pour into molds', 'Chill until set'] },
    13: { name: 'Chicken Tacos', chef: 'Chef Grace', time: '25 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', ingredients: ['Chicken', 'Tortillas', 'Lettuce', 'Cheese', 'Salsa', 'Sour cream'], steps: ['Season and cook chicken', 'Shred chicken', 'Warm tortillas', 'Fill with chicken', 'Add toppings', 'Serve with salsa'] },
    14: { name: 'Grilled Salmon', chef: 'Chef Grace', time: '30 mins', servings: 4, rating: 5, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800', ingredients: ['Salmon fillets', 'Lemon', 'Dill', 'Garlic', 'Olive oil', 'Salt'], steps: ['Season salmon with salt', 'Marinate with lemon and dill', 'Preheat grill', 'Grill skin side down', 'Flip carefully', 'Serve with lemon wedges'] },
    15: { name: 'Cheesecake', chef: 'Chef Grace', time: '50 mins', servings: 8, rating: 5, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800', ingredients: ['Cream cheese', 'Graham crackers', 'Sugar', 'Eggs', 'Vanilla', 'Butter'], steps: ['Make graham cracker crust', 'Beat cream cheese with sugar', 'Add eggs one at a time', 'Pour into crust', 'Bake in water bath', 'Chill overnight'] },
    16: { name: 'Samosas', chef: 'Chef Wanjiku', time: '40 mins', servings: 8, rating: 5, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800', ingredients: ['Flour', 'Minced meat', 'Potatoes', 'Peas', 'Spices', 'Oil'], steps: ['Make dough and rest', 'Cook filling with spices', 'Roll dough thin', 'Fill and fold samosas', 'Deep fry until golden', 'Serve hot'] },
    17: { name: 'Nyama Choma & Ugali', chef: 'Chef Wanjiku', time: '60 mins', servings: 6, rating: 5, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', ingredients: ['Goat meat', 'Salt', 'Lemon', 'Maize flour', 'Water', 'Kachumbari'], steps: ['Season meat with salt', 'Grill over charcoal', 'Turn frequently', 'Boil water for ugali', 'Add flour and stir', 'Serve with kachumbari'] },
    18: { name: 'Tropical Fruit Salad', chef: 'Chef Wanjiku', time: '15 mins', servings: 6, rating: 5, image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=800', ingredients: ['Pineapple', 'Mango', 'Papaya', 'Watermelon', 'Passion fruit', 'Lime juice', 'Mint leaves'], steps: ['Dice all fruits into bite-sized pieces', 'Mix fruits in a large bowl', 'Squeeze lime juice over fruits', 'Toss gently to combine', 'Garnish with fresh mint', 'Chill and serve'] }
  };

  const recipe = recipes[id] || recipes[1];
  const recipeUrl = window.location.href;
  const recipeText = `Check out this amazing recipe: ${recipe.name}`;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(recipeText)}&url=${encodeURIComponent(recipeUrl)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(recipeText + ' ' + recipeUrl)}`, '_blank');
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
                  Facebook
                </button>
                <button onClick={shareOnTwitter} style={{ padding: '0.75rem 1.5rem', background: '#1da1f2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  Twitter
                </button>
                <button onClick={shareOnWhatsApp} style={{ padding: '0.75rem 1.5rem', background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                  WhatsApp
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #fdba74' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{recipe.time}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Prep Time</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #10b981' }}>
                <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: '700' }}>{recipe.servings}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Servings</div>
              </div>
              <div style={{ textAlign: 'center', background: '#2a2a2a', padding: '1rem 2rem', borderRadius: '10px', border: '2px solid #8b5cf6' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{recipe.rating}/5</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem' }}>Rating</div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>Ingredients</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} style={{ padding: '0.75rem', background: '#2a2a2a', marginBottom: '0.5rem', borderRadius: '8px', border: '2px solid #10b981', color: '#aaa' }}>
                    • {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#fdba74', marginBottom: '1rem', fontSize: '1.5rem' }}>Instructions</h3>
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
