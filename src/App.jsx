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
import ProtectedRoute from './components/ProtectedRoute.jsx';
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
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="site-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px', fontWeight: '800' }}>FLAVORHUB</span>
        </Link>
        
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              <li><Link to="/recipes" className="nav-link">Recipes</Link></li>
              <li><Link to="/create-recipe" className="nav-link">Share Recipe</Link></li>
              <li><Link to="/bookmarks" className="nav-link">My Saved</Link></li>
              <li><Link to="/profile" className="nav-link">Profile</Link></li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="btn"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link">Sign In</Link></li>
              <li>
                <Link to="/register" className="btn" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  Join Free
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; 2026 FlavorHub. All rights reserved.</p>
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
            
            {/* Protected Routes - Require Login */}
            <Route 
              path="/recipes" 
              element={
                <ProtectedRoute>
                  <RecipesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recipes/:id" 
              element={
                <ProtectedRoute>
                  <RecipeDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-recipe" 
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/bookmarks" 
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/groups" 
              element={
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/groups/:id" 
              element={
                <ProtectedRoute>
                  <GroupDetail />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
