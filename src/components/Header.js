import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🍳</span>
          Recipe Room
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/premium">Premium</Link>
          {user ? (
            <>
              <Link to="/create">Create Recipe</Link>
              <Link to="/bookmarks">Bookmarks</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={onLogout} className="btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;