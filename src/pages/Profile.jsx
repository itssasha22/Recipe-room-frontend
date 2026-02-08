import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '12px', border: '2px solid #10b981' }}>
      <h2 style={{ color: '#8b5cf6', marginBottom: '1.5rem' }}>My Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>Username:</strong> User</p>
        <p><strong>Email:</strong> user@example.com</p>
      </div>
      <button onClick={handleLogout} style={{ padding: '0.75rem 2rem', background: '#fdba74', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;