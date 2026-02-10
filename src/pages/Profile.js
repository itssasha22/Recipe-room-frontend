import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchUserProfile, logout} from '../store/authSlice';
import axios from 'axios';

const Profile = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
    });
    useEffect (() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if(user){
            setProfileData({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const token = localStorage.getItem('token');
        await axios.put('http://localhost:5000/profile', 
          { profile_image: reader.result },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        dispatch(fetchUserProfile());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put('http://localhost:5000/profile', profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(fetchUserProfile());
    setEditing(false);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      {user.profile_image && <img src={user.profile_image} alt="Profile" width="100" />}
      
      {editing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
          />
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
      
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Profile;
    

    
