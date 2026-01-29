import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../store/authSlice';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  await dispatch(login(formData));
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input>
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
</input>
      <input>
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      </input>

      <button type="submit">Login</button>
</form>
  );
};

export default Login;