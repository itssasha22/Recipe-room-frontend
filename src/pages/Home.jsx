import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import recipeService from '../services/recipeService';

const Home = () => {
  const navigate = useNavigate();
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        setLoading(true);
        // Fetch top 6 recipes
        const data = await recipeService.getAllRecipes({ sort_by: 'rating' });
        setFeaturedRecipes(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured recipes:', error);
        setFeaturedRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedRecipes();
  }, []);
  
  return (
    <div style={{ padding: '3rem 2rem', minHeight: '100vh', background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            background: 'linear-gradient(135deg, #fdba74, #8b5cf6)', 
            WebkitBackgroundClip: 'text', 
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            marginBottom: '1rem',
            fontWeight: '800'
          }}>
            Welcome to Recipe Room
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '2.5rem' }}>
            Discover, Share & Master Recipes from Around the World
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/recipes" 
              style={{ 
                padding: '1rem 2.5rem', 
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '12px', 
                fontSize: '1.1rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🍳 Browse Recipes
            </Link>
            <Link 
              to="/create-recipe"
              style={{ 
                padding: '1rem 2.5rem', 
                background: 'linear-gradient(135deg, #10b981, #059669)', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '12px', 
                fontSize: '1.1rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              ✨ Create Recipe
            </Link>
            <Link 
              to="/login" 
              style={{ 
                padding: '1rem 2.5rem', 
                background: 'transparent',
                border: '2px solid #fdba74',
                color: '#fdba74', 
                textDecoration: 'none', 
                borderRadius: '12px', 
                fontSize: '1.1rem',
                fontWeight: '700',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fdba74';
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#fdba74';
              }}
            >
              🔐 Login
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem', 
          marginBottom: '4rem' 
        }}>
          <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '2px solid #8b5cf6' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌍</div>
            <h3 style={{ color: '#fdba74', fontSize: '2rem', margin: '0' }}>16+</h3>
            <p style={{ color: '#aaa', margin: '0.5rem 0 0 0' }}>Global Recipes</p>
          </div>
          <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👨‍🍳</div>
            <h3 style={{ color: '#fdba74', fontSize: '2rem', margin: '0' }}>Easy</h3>
            <p style={{ color: '#aaa', margin: '0.5rem 0 0 0' }}>Step-by-Step</p>
          </div>
          <div style={{ background: '#1e1e1e', padding: '2rem', borderRadius: '16px', textAlign: 'center', border: '2px solid #fdba74' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐</div>
            <h3 style={{ color: '#fdba74', fontSize: '2rem', margin: '0' }}>Rate</h3>
            <p style={{ color: '#aaa', margin: '0.5rem 0 0 0' }}>& Comment</p>
          </div>
        </div>

        {/* Featured Recipes */}
        <div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#fdba74', 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontWeight: '700'
          }}>
            Featured Recipes
          </h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', color: '#aaa', padding: '3rem', fontSize: '1.2rem' }}>
              Loading featured recipes...
            </div>
          ) : featuredRecipes.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
              No featured recipes available yet.
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {featuredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  style={{
                    background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    border: '2px solid #8b5cf6',
                    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(253, 186, 116, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(139, 92, 246, 0.3)';
                  }}
                >
                  <img 
                    src={recipe.image_url || 'https://via.placeholder.com/400'} 
                    alt={recipe.title} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ color: '#fdba74', marginTop: '0', fontSize: '1.4rem', fontWeight: '700' }}>
                      {recipe.title}
                    </h3>
                    <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                      by {recipe.author || 'Unknown'}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #444'
                    }}>
                      <span style={{ color: '#fbbf24', fontSize: '1.1rem' }}>
                        {'⭐'.repeat(Math.round(recipe.avg_rating || 0))}
                      </span>
                      <span style={{ color: '#888', fontSize: '0.9rem' }}>
                        ⏱️ {recipe.prep_time + recipe.cook_time} mins
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;