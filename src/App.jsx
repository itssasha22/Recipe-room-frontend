import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import RecipesPage from './pages/RecipesPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header>
            <h1>Recipe Room</h1>
            <p>Share and discover simple recipes</p>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;