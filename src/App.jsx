import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Profile from './pages/Profile';
import Bookmarks from './pages/Bookmarks';
import PremiumRecipes from './pages/PremiumRecipes';
import PaymentSuccess from './pages/PaymentSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/premium" element={<PremiumRecipes />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/create" element={
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
        </Routes>
      </main>
    </div>
  );
}

export default App;