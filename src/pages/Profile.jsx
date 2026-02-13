import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../services/authService';
import recipeService from '../services/recipeService';

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [stats, setStats] = useState({
    recipesCount: 0,
    bookmarksCount: 0,
    ratingsCount: 0
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchProfileData();
  }, [currentUser, navigate]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's recipes
      const recipes = await recipeService.getAllRecipes();
      const myRecipes = recipes.filter(r => r.author_id === currentUser.id);
      setUserRecipes(myRecipes);
      
      // Fetch bookmarks
      const bookmarks = await recipeService.getBookmarks();
      
      setStats({
        recipesCount: myRecipes.length,
        bookmarksCount: bookmarks.length,
        ratingsCount: 0 // Can be calculated from recipes data if needed
      });
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--off-white)', minHeight: '100vh' }}>
      {/* Profile Header */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
        <div className="container" style={{ padding: '30px 15px' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            textAlign: 'center'
          }}>
            {/* Profile Icon */}
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'var(--primary-orange)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: 'white'
            }}>
              👤
            </div>

            <div>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '5px' }}>
                {currentUser?.username}
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--light-gray)' }}>
                {currentUser?.email}
              </p>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'flex', 
              gap: '30px',
              marginTop: '10px',
              fontSize: '14px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', fontSize: '20px', color: 'var(--primary-orange)' }}>
                  {stats.recipesCount}
                </p>
                <p style={{ color: 'var(--light-gray)' }}>Recipes</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600', fontSize: '20px', color: 'var(--primary-orange)' }}>
                  {stats.bookmarksCount}
                </p>
                <p style={{ color: 'var(--light-gray)' }}>Bookmarks</p>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="btn-secondary"
              style={{ marginTop: '10px' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <div className="grid-2" style={{ gap: '15px' }}>
          <Link to="/recipes/create" style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white',
              border: '1px solid var(--border-gray)',
              padding: '25px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s'
            }}
            className="hover-card"
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>📝</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-gray)' }}>Create Recipe</h3>
            </div>
          </Link>

          <Link to="/bookmarks" style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white',
              border: '1px solid var(--border-gray)',
              padding: '25px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'box-shadow 0.2s'
            }}
            className="hover-card"
            >
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>🔖</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-gray)' }}>My Bookmarks</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* User's Recipes */}
      {userRecipes.length > 0 && (
        <div className="container" style={{ paddingBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '20px',
            paddingLeft: '15px'
          }}>
            My Recipes
          </h2>
          
          <div className="grid-3">
            {userRecipes.map((recipe) => (
              <Link 
                key={recipe.id} 
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="recipe-card">
                  <img 
                    src={recipe.image_url || 'https://via.placeholder.com/400x300?text=Recipe'} 
                    alt={recipe.title}
                  />
                  <div className="recipe-card-content">
                    <h3 className="recipe-card-title">{recipe.title}</h3>
                    
                    <div className="recipe-card-meta">
                      <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                      {recipe.average_rating > 0 && (
                        <span>⭐ {recipe.average_rating.toFixed(1)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="container" style={{ padding: '20px 15px' }}>
          <div style={{ 
            background: '#fee',
            border: '1px solid var(--danger-red)',
            color: 'var(--danger-red)',
            padding: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
