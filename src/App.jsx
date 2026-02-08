import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';

function Home() {
  const foodImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400'
  ];

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#8b5cf6', marginBottom: '1rem', fontWeight: '700' }}>Welcome to Recipe Room</h2>
        <p style={{ fontSize: '1.3rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
          Discover simple, delicious recipes from around the world. Share your culinary creations and connect with food lovers!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" style={{ padding: '14px 32px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'transform 0.2s' }}>
            Get Started
          </Link>
          <Link to="/register" style={{ padding: '14px 32px', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)', transition: 'transform 0.2s' }}>
            Sign Up Free
          </Link>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '2rem', color: '#8b5cf6', textAlign: 'center', marginBottom: '3rem' }}>Why Choose Recipe Room?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍳</div>
            <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Simple Recipes</h4>
            <p style={{ color: '#666' }}>Easy-to-follow recipes for everyday cooking</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #fdba74' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Global Cuisine</h4>
            <p style={{ color: '#666' }}>Explore dishes from around the world</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Share & Connect</h4>
            <p style={{ color: '#666' }}>Share your recipes with the community</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', background: '#f9fafb' }}>
        <h3 style={{ fontSize: '2rem', color: '#8b5cf6', textAlign: 'center', marginBottom: '2rem' }}>Featured Recipes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {foodImages.map((img, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #10b981', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={img} alt={`Recipe ${idx + 1}`} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>Delicious Recipe {idx + 1}</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>⭐⭐⭐⭐⭐ • 30 mins</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Start Cooking?</h3>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>Join thousands of home cooks sharing their favorite recipes</p>
        <Link to="/register" style={{ padding: '14px 32px', background: '#fdba74', color: 'white', textDecoration: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          Join Recipe Room Today
        </Link>
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', padding: '1.5rem 2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <h1 style={{ margin: 0, fontSize: '1.8rem' }}>🍽️ Recipe Room</h1>
            </Link>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', fontWeight: '500' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', fontWeight: '500' }}>Register</Link>
            </div>
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
      </div>
    </Router>
  );
}

export default App;