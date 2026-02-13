import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      // After registration, log in the user
      const loginData = await authService.login({ username: formData.username, password: formData.password });
      dispatch(loginSuccess(loginData));
      navigate('/recipes');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Registration failed. Please try again.');
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>Sign Up</h1>
          <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
            Join FlavorHub today
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
              placeholder="Choose a username"
              autoFocus
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontSize: '14px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              fontSize: '14px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="At least 6 characters"
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                onTouchStart={() => setShowPassword(true)}
                onTouchEnd={() => setShowPassword(false)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '5px'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              fontSize: '14px', 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Re-enter your password"
                style={{ paddingRight: '45px' }}
              />
              <button
                type="button"
                onMouseDown={() => setShowConfirmPassword(true)}
                onMouseUp={() => setShowConfirmPassword(false)}
                onMouseLeave={() => setShowConfirmPassword(false)}
                onTouchStart={() => setShowConfirmPassword(true)}
                onTouchEnd={() => setShowConfirmPassword(false)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  padding: '5px'
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
            style={{ 
              width: '100%', 
              marginBottom: '20px',
              padding: '18px 30px',
              fontSize: '18px'
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p style={{ 
            fontSize: '14px', 
            textAlign: 'center',
            color: 'var(--text-gray)'
          }}>
            Already have an account?{' '}
            <Link 
              to="/login"
              style={{ 
                color: 'var(--primary-orange)',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
