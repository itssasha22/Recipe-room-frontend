import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';

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
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#8b5cf6', textAlign: 'center', marginBottom: '2rem' }}>Discover Amazing Recipes</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {foodImages.map((img, idx) => (
          <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #10b981' }}>
            <img src={img} alt={`Food ${idx + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/login" style={{ margin: '10px', padding: '12px 24px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block', fontWeight: '600' }}>
          Login
        </Link>
        <Link to="/register" style={{ margin: '10px', padding: '12px 24px', background: '#8b5cf6', color: 'white', textDecoration: 'none', borderRadius: '8px', display: 'inline-block', fontWeight: '600' }}>
          Register
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', color: 'white', padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Recipe Room</h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>Share and discover simple recipes</p>
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;