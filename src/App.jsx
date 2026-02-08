import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';

function Home() {
  const featuredRecipes = [
    { name: 'Spaghetti Carbonara', chef: 'Chef Sarah', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600', time: '30 min' },
    { name: 'Grilled Salmon', chef: 'Chef Grace', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', time: '30 min' },
    { name: 'Margherita Pizza', chef: 'Chef David', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600', time: '40 min' },
    { name: 'Chicken Fried Rice', chef: 'Chef Mary', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600', time: '25 min' }
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      <section style={{ background: '#f8f9fa', padding: '5rem 2rem', borderBottom: '1px solid #e9ecef' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3rem', color: '#212529', marginBottom: '1.5rem', fontWeight: '700', lineHeight: '1.2' }}>
              Discover & Share<br/>Authentic Recipes
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#6c757d', marginBottom: '2rem', lineHeight: '1.8' }}>
              Join our community of home cooks and professional chefs. Browse thousands of recipes, save your favorites, and share your culinary creations.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/recipes" style={{ padding: '1rem 2rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '500', border: 'none' }}>
                Browse Recipes
              </Link>
              <Link to="/register" style={{ padding: '1rem 2rem', background: 'white', color: '#10b981', textDecoration: 'none', borderRadius: '6px', fontSize: '1rem', fontWeight: '500', border: '2px solid #10b981' }}>
                Sign Up Free
              </Link>
            </div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" alt="Cooking" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>Featured Recipes</h2>
          <p style={{ color: '#6c757d' }}>Popular dishes from our community</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {featuredRecipes.map((recipe, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e9ecef', transition: 'box-shadow 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
              <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>{recipe.name}</h3>
                <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '0.75rem' }}>by {recipe.chef}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #e9ecef' }}>
                  <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>🕐 {recipe.time}</span>
                  <span style={{ color: '#ffc107' }}>★★★★★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#f8f9fa', padding: '4rem 2rem', borderTop: '1px solid #e9ecef' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>Why Recipe Room?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
              <h3 style={{ fontSize: '1.2rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>Thousands of Recipes</h3>
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>Browse our extensive collection of recipes from cuisines around the world</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ fontSize: '1.2rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>Active Community</h3>
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>Connect with fellow food lovers and share your cooking experiences</p>
            </div>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h3 style={{ fontSize: '1.2rem', color: '#212529', marginBottom: '0.5rem', fontWeight: '600' }}>Rated & Reviewed</h3>
              <p style={{ color: '#6c757d', lineHeight: '1.6' }}>Read honest reviews and ratings from real home cooks</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', color: '#212529', marginBottom: '1rem', fontWeight: '600' }}>Start Your Culinary Journey Today</h2>
          <p style={{ color: '#6c757d', marginBottom: '2rem', fontSize: '1.1rem' }}>Join thousands of home cooks discovering new recipes every day</p>
          <Link to="/register" style={{ padding: '1rem 2.5rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '1.1rem', fontWeight: '500', display: 'inline-block' }}>
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
        <header style={{ background: 'white', borderBottom: '1px solid #e9ecef', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#212529', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🍽️</span>
              <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>Recipe Room</span>
            </Link>
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/recipes" style={{ color: '#6c757d', textDecoration: 'none', fontWeight: '500' }}>Recipes</Link>
              <Link to="/login" style={{ color: '#6c757d', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
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