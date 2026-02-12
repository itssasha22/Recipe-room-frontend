import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Welcome to Recipe Room</h2>
      <p>Share and discover simple recipes</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/recipes" style={{ margin: '10px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Browse Recipes
        </Link>
        <Link to="/create-recipe" style={{ margin: '10px', padding: '10px 20px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Create Recipe
        </Link>
        <Link to="/login" style={{ margin: '10px', padding: '10px 20px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;