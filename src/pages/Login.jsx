import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import authService from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await authService.login({ username: formData.username, password: formData.password });
      dispatch(loginSuccess(data));
      navigate('/recipes');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'var(--off-white)', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white',
        border: '1px solid var(--border-gray)',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="/flavorhub-logo.png" 
            alt="FlavorHub" 
            style={{ height: '60px', marginBottom: '10px' }}
          />
          <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>Login</h1>
          <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
            Welcome back to FlavorHub
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ 
              background: '#fee', 
              border: '1px solid var(--danger-red)',
              color: 'var(--danger-red)',
              padding: '12px',
              marginBottom: '20px',
              fontSize: '14px',
              borderRadius: '3px'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontSize: '14px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              fontSize: '14px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p style={{ 
            fontSize: '14px', 
            textAlign: 'center',
            color: 'var(--text-gray)'
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register"
              style={{ 
                color: 'var(--primary-orange)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
