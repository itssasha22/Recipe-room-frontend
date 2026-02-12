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
    const token = authService.getCurrentUser();
    setIsLoggedIn(!!token);
  }, [location]);
  
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/');
  };
  
  return (
    <header style={{ 
      background: 'linear-gradient(135deg, rgba(255,107,53,0.95) 0%, rgba(230,57,70,0.95) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '3px solid #ff6b35',
      padding: '1.25rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '2rem' }}>🍽️</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.5px' }}>FlavorHub</span>
            <span style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: 500 }}>Global Kitchen Collection</span>
          </div>
        </Link>
        
        <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <Link to="/recipes" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '1.05rem',
            transition: 'all 0.2s',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent'
          }} 
          onMouseEnter={(e) => e.target.style.borderBottom = '2px solid white'}
          onMouseLeave={(e) => e.target.style.borderBottom = '2px solid transparent'}>
            Recipes
          </Link>
          <Link to="/groups" style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '1.05rem',
            transition: 'all 0.2s',
            padding: '0.5rem 0',
            borderBottom: '2px solid transparent'
          }}
          onMouseEnter={(e) => e.target.style.borderBottom = '2px solid white'}
          onMouseLeave={(e) => e.target.style.borderBottom = '2px solid transparent'}>
            Communities
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/bookmarks" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '1.05rem' 
              }}>
                🔖 Saved
              </Link>
              <Link to="/create-recipe" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '1.05rem' 
              }}>
                ➕ Share Recipe
              </Link>
              <Link to="/profile" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '1.05rem' 
              }}>
                👤 Profile
              </Link>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '0.65rem 1.5rem', 
                  background: 'rgba(255,255,255,0.2)', 
                  color: 'white', 
                  border: '2px solid white',
                  borderRadius: '8px', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#e63946';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.color = 'white';
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: '600',
                fontSize: '1.05rem' 
              }}>
                Login
              </Link>
              <Link to="/register" style={{ 
                padding: '0.65rem 1.5rem', 
                background: 'white', 
                color: '#ff6b35', 
                textDecoration: 'none', 
                borderRadius: '8px', 
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}>
                Join Now
              </Link>
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

        <footer style={{ 
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', 
          color: 'white', 
          padding: '4rem 0 2rem',
          marginTop:  'auto',
          borderTop: '4px solid #ff6b35'
        }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '3rem',
              marginBottom: '3rem'
            }}>
              <div>
                <h3 style={{ color: '#ff6b35', marginBottom: '1rem', fontSize: '1.5rem' }}>🍽️ FlavorHub</h3>
                <p style={{ color: '#aaa', lineHeight: '1.8' }}>
                  Discover authentic recipes from every corner of the globe. Share your culinary creations and connect with food lovers worldwide.
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem', color: 'white' }}>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link to="/recipes" style={{ color: '#aaa', textDecoration: 'none' }}>Browse Recipes</Link>
                  <Link to="/groups" style={{ color: '#aaa', textDecoration: 'none' }}>Join Communities</Link>
                  <Link to="/create-recipe" style={{ color: '#aaa', textDecoration: 'none' }}>Share Your Recipe</Link>
                </div>
              </div>
              <div>
                <h4 style={{ marginBottom: '1rem', color: 'white' }}>Categories</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ color: '#aaa' }}>🌍 International Cuisines</span>
                  <span style={{ color: '#aaa' }}>🥗 Healthy Eating</span>
                  <span style={{ color: '#aaa' }}>🍰 Desserts & Baking</span>
                  <span style={{ color: '#aaa' }}>⚡ Quick Meals</span>
                </div>
              </div>
            </div>
            <div style={{ 
              textAlign: 'center', 
              paddingTop: '2rem', 
              borderTop: '1px solid #444',
              color: '#888'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>© 2026 FlavorHub. Bringing the world to your kitchen.</p>
              <p style={{ fontSize: '0.9rem' }}>Made with ❤️ for food lovers everywhere</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;