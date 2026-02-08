import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetail.jsx';

function Home() {
  const featuredRecipes = [
    { name: 'Spaghetti Carbonara', chef: 'Chef Sarah', image: 'https:
    { name: 'Beef Burger', chef: 'Chef John', image: 'https:
    { name: 'Chicken Fried Rice', chef: 'Chef Mary', image: 'https:
    { name: 'Margherita Pizza', chef: 'Chef David', image: 'https:
    { name: 'Grilled Salmon', chef: 'Chef Grace', image: 'https:
    { name: 'Nyama Choma', chef: 'Chef Wanjiku', image: 'https:
  ];

  const chefs = [
    { name: 'Chef Sarah', specialty: 'Italian Cuisine', image: 'https:
    { name: 'Chef John', specialty: 'American & French', image: 'https:
    { name: 'Chef Mary', specialty: 'Asian Fusion', image: 'https:
    { name: 'Chef David', specialty: 'Mediterranean', image: 'https:
    { name: 'Chef Grace', specialty: 'International', image: 'https:
    { name: 'Chef Wanjiku', specialty: 'Kenyan Traditional', image: 'https:
  ];

  return (
    <div style={{ background: '#000000' }}>
      <section style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1.5rem', fontWeight: '700', lineHeight: '1.2' }}>
              Discover & Share<br/>Authentic Recipes
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', lineHeight: '1.8' }}>
              Join our community of home cooks and professional chefs. Browse thousands of recipes, save your favorites, and share your culinary creations.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/recipes" style={{ padding: '1rem 2rem', background: '#fdba74', color: '#000', textDecoration: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600' }}>
                Browse Recipes
              </Link>
              <Link to="/register" style={{ padding: '1rem 2rem', background: 'white', color: '#8b5cf6', textDecoration: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600' }}>
                Sign Up Free
              </Link>
            </div>
          </div>
          <div>
            <img src="https:
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: '#1a1a1a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '700' }}>Featured Recipes</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Popular dishes from our community</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {featuredRecipes.map((recipe, idx) => (
              <div key={idx} style={{ background: '#2a2a2a', borderRadius: '12px', overflow: 'hidden', border: '2px solid #8b5cf6', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ background: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>{recipe.cuisine}</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'white', margin: '1rem 0 0.5rem 0', fontWeight: '600' }}>{recipe.name}</h3>
                  <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '0.75rem' }}>by {recipe.chef}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #444' }}>
                    <span style={{ color: '#fdba74', fontSize: '0.9rem', fontWeight: '600' }}>🕐 {recipe.time}</span>
                    <span style={{ color: '#fdba74' }}>★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', background: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#8b5cf6', marginBottom: '0.5rem', fontWeight: '700' }}>Meet Our Chefs</h2>
            <p style={{ color: '#aaa', fontSize: '1.1rem' }}>Expert culinary professionals from around the world</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {chefs.map((chef, idx) => (
              <div key={idx} style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '2px solid #10b981', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src={chef.image} alt={chef.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #8b5cf6', marginBottom: '1rem' }} />
                <h3 style={{ color: '#fdba74', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>{chef.name}</h3>
                <p style={{ color: '#10b981', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: '600' }}>{chef.specialty}</p>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{chef.recipes} Recipes</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#1a1a1a', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '0.5rem', fontWeight: '700' }}>Why Recipe Room?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem', background: '#2a2a2a', borderRadius: '12px', border: '2px solid #8b5cf6' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Thousands of Recipes</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Browse our extensive collection of recipes from cuisines around the world</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', background: '#2a2a2a', borderRadius: '12px', border: '2px solid #10b981' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Active Community</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Connect with fellow food lovers and share your cooking experiences</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem', background: '#2a2a2a', borderRadius: '12px', border: '2px solid #fdba74' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h3 style={{ fontSize: '1.2rem', color: '#fdba74', marginBottom: '0.5rem', fontWeight: '600' }}>Rated & Reviewed</h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>Read honest reviews and ratings from real home cooks</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem', fontWeight: '700' }}>Start Your Culinary Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontSize: '1.1rem' }}>Join thousands of home cooks discovering new recipes every day</p>
          <Link to="/register" style={{ padding: '1rem 2.5rem', background: '#fdba74', color: '#000', textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '600', display: 'inline-block' }}>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', borderBottom: '2px solid #8b5cf6', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fdba74', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🍽️</span>
              <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>Recipe Room</span>
            </Link>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/recipes" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Recipes</Link>
              <Link to="/groups" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Groups</Link>
              <Link to="/login" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
              <Link to="/register" style={{ padding: '0.5rem 1.25rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '500' }}>Sign Up</Link>
            </nav>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupDetail />} />
        </Routes>

        <footer style={{ background: '#212529', color: 'white', padding: '3rem 2rem', marginTop: '4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Recipe Room</p>
            <p style={{ color: '#adb5bd', fontSize: '0.9rem' }}>© 2024 Recipe Room. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;