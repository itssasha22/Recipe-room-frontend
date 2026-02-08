import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  
  const recipes = {
    1: { name: 'Pilau Rice', chef: 'Chef Sarah', time: '45 mins', servings: 4, rating: 5, ingredients: ['Rice', 'Meat', 'Spices', 'Onions', 'Tomatoes'], steps: ['Boil meat with spices', 'Fry onions and tomatoes', 'Add rice and stock', 'Simmer until cooked'] },
    2: { name: 'Chapati', chef: 'Chef John', time: '30 mins', servings: 6, rating: 5, ingredients: ['Flour', 'Water', 'Salt', 'Oil'], steps: ['Mix flour, water and salt', 'Knead dough', 'Roll into circles', 'Cook on hot pan'] },
    3: { name: 'Ugali & Sukuma', chef: 'Chef Mary', time: '25 mins', servings: 4, rating: 4, ingredients: ['Maize flour', 'Water', 'Kale', 'Tomatoes', 'Onions'], steps: ['Boil water', 'Add flour and stir', 'Fry kale with tomatoes', 'Serve together'] },
    4: { name: 'Mandazi', chef: 'Chef David', time: '40 mins', servings: 8, rating: 5, ingredients: ['Flour', 'Sugar', 'Coconut milk', 'Yeast', 'Cardamom'], steps: ['Mix ingredients', 'Let dough rise', 'Cut into triangles', 'Deep fry until golden'] },
    5: { name: 'Nyama Choma', chef: 'Chef Grace', time: '60 mins', servings: 6, rating: 5, ingredients: ['Goat meat', 'Salt', 'Lemon', 'Chili'], steps: ['Season meat', 'Grill over charcoal', 'Turn frequently', 'Serve with kachumbari'] }
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
              <h3 style={{ color: '#8b5cf6', marginBottom: '1rem' }}>👨‍🍳 Instructions</h3>
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