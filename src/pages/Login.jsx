import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(formData);
      navigate('/profile');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '450px', width: '100%', background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', border: '2px solid #10b981' }}>
        
        <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)', padding: '2rem', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍽️</div>
          <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '700' }}>Welcome Back!</h2>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Login to continue your culinary journey</p>
        </div>

        <div style={{ padding: '2rem' }}>
          {error && (
            <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                📧 Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '10px', border: '2px solid #10b981', fontSize: '1rem', transition: 'all 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#10b981'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#8b5cf6', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                🔒 Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '10px', border: '2px solid #10b981', fontSize: '1rem', transition: 'all 0.3s', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
                onBlur={(e) => e.target.style.borderColor = '#10b981'}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', padding: '1rem', background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #8b5cf6 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {loading ? '🔄 Logging in...' : '🚀 Login'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>Don't have an account?</p>
            <Link to="/register" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: '600', fontSize: '1.05rem' }}>
              Create Account →
            </Link>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/" style={{ color: '#10b981', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;