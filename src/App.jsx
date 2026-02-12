import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetail.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import authService from './services/authService';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in
    const token = authService.getCurrentUser();
    setIsLoggedIn(!!token);
  }, [location]); // Re-check on route change
  
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/');
  };
  
  return (
    <header style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)', borderBottom: '2px solid #8b5cf6', padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#fdba74', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🍽️</span>
          <span style={{ fontSize: '1.3rem', fontWeight: '700' }}>FlavorHub</span>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/recipes" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Recipes</Link>
          <Link to="/groups" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Groups</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/bookmarks" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>🔖 Bookmarks</Link>
              <Link to="/create-recipe" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>➕ Create</Link>
              <Link to="/profile" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>👤 Profile</Link>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '0.5rem 1.25rem', 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '6px', 
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
              <Link to="/register" style={{ padding: '0.5rem 1.25rem', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '500' }}>Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:id" element={<GroupDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>

        <footer style={{ background: '#212529', color: 'white', padding: '3rem 2rem', marginTop: '4rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>FlavorHub</p>
            <p style={{ color: '#adb5bd', fontSize: '0.9rem' }}>© 2026 FlavorHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;