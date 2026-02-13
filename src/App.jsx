import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './pages/RecipeDetail.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Groups from './pages/Groups.jsx';
import BrowseGroups from './pages/BrowseGroups.jsx';
import GroupDetail from './pages/GroupDetail.jsx';
import Bookmarks from './pages/Bookmarks.jsx';
import PremiumRecipes from './pages/PremiumRecipes.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import authService from './services/authService';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    const token = authService.getCurrentUser();
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location]);
  
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <header className={`site-header ${!isHomePage ? 'solid' : ''}`}>
      {/* Top Bar with Logo, Search, and Social Icons */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <Link to="/" className="site-logo">
              <img src="/flavorhub-logo.png" alt="FlavorHub Logo" />
              <span style={{ 
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ff6347 0%, #ff9a56 50%, #ffd700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none'
              }}>FlavorHub</span>
            </Link>
            
            {/* Search Bar */}
            <div className="search-bar-wrapper">
              <form className="search-bar" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search Recipes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">🔍</button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <button 
                onClick={toggleTheme}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  padding: '5px'
                }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <a href="https://instagram.com/flavorhub" target="_blank" rel="noopener noreferrer" className="social-icon social-instagram" title="Follow us on Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com/flavorhub" target="_blank" rel="noopener noreferrer" className="social-icon social-facebook" title="Like us on Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://pinterest.com/flavorhub" target="_blank" rel="noopener noreferrer" className="social-icon social-pinterest" title="Pin us on Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@flavorhub" target="_blank" rel="noopener noreferrer" className="social-icon social-youtube" title="Subscribe on YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navy Navigation Bar */}
      <nav className="site-nav">
        <div className="container">
          <div className="nav-content">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕ CLOSE' : '☰ MENU'}
            </button>

            {/* Navigation Links */}
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <li><Link to="/" className="nav-link">❤️ MY FLAVORHUB</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
                  <li><Link to="/premium" className="nav-link">Premium</Link></li>
                  <li><Link to="/recipes/create" className="nav-link">Share Recipe</Link></li>
                  <li><Link to="/bookmarks" className="nav-link">My Saved</Link></li>
                  <li><Link to="/groups" className="nav-link">Groups</Link></li>
                  <li><Link to="/profile" className="nav-link">Profile</Link></li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="nav-link"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
                  <li><Link to="/login" className="nav-link">Sign In</Link></li>
                  <li><Link to="/register" className="nav-link">Join Free</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; 2025 FlavorHub. All rights reserved.</p>
        <p style={{ marginTop: '10px', fontSize: '13px', letterSpacing: '1px' }}>
          TASTE THE WORLD
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/recipes" element={
              <ProtectedRoute>
                <RecipesPage />
              </ProtectedRoute>
            } />
            <Route path="/recipes/:id" element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            } />
            <Route path="/recipes/create" element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/bookmarks" element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            } />
            <Route path="/groups" element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            } />
            <Route path="/groups/browse" element={
              <ProtectedRoute>
                <BrowseGroups />
              </ProtectedRoute>
            } />
            <Route path="/groups/:id" element={
              <ProtectedRoute>
                <GroupDetail />
              </ProtectedRoute>
            } />
            <Route path="/premium" element={
              <ProtectedRoute>
                <PremiumRecipes />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
