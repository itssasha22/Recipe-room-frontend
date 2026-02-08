import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  
  const recipes = {
    1: { name: 'Pilau Rice', chef: 'Chef Sarah', time: '45 mins', servings: 4, rating: 5, ingredients: ['2 cups rice', '500g meat', 'Pilau masala', '2 onions', '3 tomatoes', 'Garlic', 'Ginger'], steps: ['Boil meat with spices until tender', 'Fry onions until golden', 'Add tomatoes, garlic and ginger', 'Add rice and meat stock', 'Simmer until rice is cooked'] },
    2: { name: 'Biryani', chef: 'Chef Sarah', time: '60 mins', servings: 6, rating: 5, ingredients: ['Basmati rice', 'Chicken', 'Yogurt', 'Saffron', 'Spices', 'Onions'], steps: ['Marinate chicken in yogurt and spices', 'Cook rice halfway', 'Layer rice and chicken', 'Cook on low heat until done'] },
    3: { name: 'Samosas', chef: 'Chef Sarah', time: '40 mins', servings: 8, rating: 4, ingredients: ['Flour', 'Minced meat', 'Potatoes', 'Peas', 'Spices', 'Oil'], steps: ['Make dough and rest', 'Cook filling with spices', 'Fill and fold samosas', 'Deep fry until golden'] },
    
    4: { name: 'Chapati', chef: 'Chef John', time: '30 mins', servings: 6, rating: 5, ingredients: ['3 cups flour', 'Water', 'Salt', 'Oil'], steps: ['Mix flour, water and salt', 'Knead until smooth', 'Roll into circles', 'Cook on hot pan with oil'] },
    5: { name: 'Naan Bread', chef: 'Chef John', time: '35 mins', servings: 8, rating: 5, ingredients: ['Flour', 'Yogurt', 'Yeast', 'Sugar', 'Butter'], steps: ['Mix ingredients and let rise', 'Divide into portions', 'Roll and cook in hot pan', 'Brush with butter'] },
    6: { name: 'Roti', chef: 'Chef John', time: '25 mins', servings: 6, rating: 4, ingredients: ['Whole wheat flour', 'Water', 'Salt', 'Ghee'], steps: ['Make soft dough', 'Roll thin circles', 'Cook on griddle', 'Apply ghee'] },
    
    7: { name: 'Ugali & Sukuma', chef: 'Chef Mary', time: '25 mins', servings: 4, rating: 4, ingredients: ['Maize flour', 'Water', 'Kale', 'Tomatoes', 'Onions'], steps: ['Boil water', 'Add flour and stir vigorously', 'Fry kale with tomatoes and onions', 'Serve together'] },
    8: { name: 'Githeri', chef: 'Chef Mary', time: '50 mins', servings: 6, rating: 5, ingredients: ['Maize', 'Beans', 'Tomatoes', 'Onions', 'Spices'], steps: ['Boil maize and beans', 'Fry onions and tomatoes', 'Mix everything together', 'Simmer for 10 minutes'] },
    9: { name: 'Mukimo', chef: 'Chef Mary', time: '40 mins', servings: 5, rating: 5, ingredients: ['Potatoes', 'Maize', 'Beans', 'Pumpkin leaves', 'Salt'], steps: ['Boil all ingredients', 'Mash together', 'Add salt to taste', 'Serve hot'] },
    
    10: { name: 'Mandazi', chef: 'Chef David', time: '40 mins', servings: 8, rating: 5, ingredients: ['Flour', 'Sugar', 'Coconut milk', 'Yeast', 'Cardamom'], steps: ['Mix all ingredients', 'Let dough rise for 30 mins', 'Cut into triangles', 'Deep fry until golden brown'] },
    11: { name: 'Mahamri', chef: 'Chef David', time: '45 mins', servings: 10, rating: 5, ingredients: ['Flour', 'Coconut milk', 'Sugar', 'Yeast', 'Cardamom'], steps: ['Mix and knead dough', 'Let rise', 'Roll and cut into shapes', 'Deep fry'] },
    12: { name: 'Kaimati', chef: 'Chef David', time: '50 mins', servings: 12, rating: 4, ingredients: ['Flour', 'Yeast', 'Sugar', 'Cardamom', 'Syrup'], steps: ['Make batter and let rise', 'Deep fry small balls', 'Make sugar syrup', 'Coat in syrup'] },
    
    13: { name: 'Nyama Choma', chef: 'Chef Grace', time: '60 mins', servings: 6, rating: 5, ingredients: ['2kg goat meat', 'Salt', 'Lemon', 'Chili powder'], steps: ['Season meat with salt and spices', 'Grill over charcoal fire', 'Turn frequently', 'Serve with kachumbari'] },
    14: { name: 'Fish Fry', chef: 'Chef Grace', time: '35 mins', servings: 4, rating: 5, ingredients: ['Tilapia fish', 'Flour', 'Spices', 'Lemon', 'Oil'], steps: ['Clean and season fish', 'Coat with spiced flour', 'Deep fry until crispy', 'Serve with lemon'] },
    15: { name: 'Chicken Stew', chef: 'Chef Grace', time: '55 mins', servings: 5, rating: 5, ingredients: ['Chicken pieces', 'Tomatoes', 'Onions', 'Potatoes', 'Spices'], steps: ['Brown chicken pieces', 'Add onions and tomatoes', 'Add potatoes and water', 'Simmer until cooked'] }
  };

  const recipe = recipes[id] || recipes[1];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link to="/recipes" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '600', marginBottom: '1rem', display: 'inline-block' }}>
          ← Back to Recipes
        </Link>

        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '2px solid #10b981' }}>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', padding: '3rem 2rem', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>{recipe.name}</h1>
            <p style={{ margin: 0, opacity: 0.9 }}>by {recipe.chef}</p>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#8b5cf6', fontWeight: '700' }}>⏱️ {recipe.time}</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Prep Time</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#10b981', fontWeight: '700' }}>👥 {recipe.servings}</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Servings</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: '#fdba74', fontWeight: '700' }}>{'⭐'.repeat(recipe.rating)}</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>Rating</div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>📝 Ingredients</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} style={{ padding: '0.75rem', background: '#f9fafb', marginBottom: '0.5rem', borderRadius: '8px', border: '2px solid #10b981' }}>
                    ✓ {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>👨🍳 Instructions</h3>
              <ol style={{ padding: '0 0 0 1.5rem' }}>
                {recipe.steps.map((step, idx) => (
                  <li key={idx} style={{ padding: '0.75rem 0', color: '#666', lineHeight: '1.6', borderBottom: '1px solid #e5e7eb' }}>
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