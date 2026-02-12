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
    <div className="home-page">
      {/* Hero Section with Background */}
      <section className="hero-section" style={{
        background: 'linear-gradient(rgba(255, 107, 53, 0.85), rgba(230, 57, 70, 0.85)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '8rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: '800',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: '1.2'
          }}>
            Discover Recipes That <br />Tell Stories
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
            marginBottom: '3rem',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            From grandmother's secret ingredients to modern kitchen innovations, <br />
            explore authentic flavors from every corner of the globe
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/recipes" className="btn btn-primary" style={{ fontSize: '1.15rem' }}>
              Explore Recipes
            </Link>
            <Link to="/create-recipe" className="btn" style={{ 
              background: 'white',
              color: 'var(--tomato-red)',
              fontSize: '1.15rem',
              border: 'none'
            }}>
              Share Your Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section style={{ 
        padding: '5rem 2rem',
        background: 'var(--cream-white)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--charcoal-black)',
            marginBottom: '3rem',
            fontWeight: '700'
          }}>
            Why Home Cooks Love Us
          </h2>
          
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1rem',
                filter: 'drop-shadow(0 2px 4px rgba(255,107,53,0.2))'
              }}>🌍</div>
              <h3 style={{ 
                color: 'var(--tomato-red)', 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '700'
              }}>Authentic & Global</h3>
              <p style={{ color: 'var(--stone-gray)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                37+ recipes from 23 countries with real stories and traditional preparation methods passed down through generations
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1rem',
                filter: 'drop-shadow(0 2px 4px rgba(45,106,79,0.2))'
              }}>👨‍🍳</div>
              <h3 style={{ 
                color: 'var(--herb-green)', 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '700'
              }}>Easy to Follow</h3>
              <p style={{ color: 'var(--stone-gray)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                Step-by-step instructions with prep times, serving sizes, and ingredient lists that make cooking stress-free
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1rem',
                filter: 'drop-shadow(0 2px 4px rgba(252,191,73,0.2))'
              }}>⭐</div>
              <h3 style={{ 
                color: 'var(--golden-yellow)', 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '700'
              }}>Community Tested</h3>
              <p style={{ color: 'var(--stone-gray)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                Real ratings, honest reviews, and helpful comments from home cooks who've tried each recipe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section style={{ 
        padding: '5rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--charcoal-black)',
              marginBottom: '0.5rem',
              fontWeight: '700'
            }}>
              Top Rated Recipes
            </h2>
            <p style={{ 
              color: 'var(--stone-gray)', 
              fontSize: '1.15rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Tried, tested, and loved by our community of passionate home cooks
            </p>
          </div>
          
          {loading ? (
            <div className="loading-spinner" style={{ margin: '4rem auto' }} />
          ) : featuredRecipes.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--stone-gray)', padding: '3rem' }}>
              <p style={{ fontSize: '1.2rem' }}>No featured recipes available yet.</p>
              <Link to="/create-recipe" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Be the first to share a recipe!
              </Link>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '2.5rem' }}>
              {featuredRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="card"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'} 
                      alt={recipe.title}
                      style={{ 
                        width: '100%', 
                        height: '240px', 
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {recipe.avg_rating >= 4 && (
                      <span className="badge badge-orange" style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem'
                      }}>
                        Top Rated
                      </span>
                    )}
                  </div>
                  
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ 
                      color: 'var(--charcoal-black)', 
                      marginTop: 0, 
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem'
                    }}>
                      {recipe.title}
                    </h3>
                    
                    <p style={{ 
                      color: 'var(--stone-gray)', 
                      fontSize: '0.95rem',
                      margin: '0.5rem 0'
                    }}>
                      by {recipe.author || 'Community Chef'}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '1.25rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid #e8e8e8'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i}
                            style={{ 
                              color: i < Math.round(recipe.avg_rating || 0) ? '#fcbf49' : '#ddd',
                              fontSize: '1.2rem'
                            }}
                          >
                            ★
                          </span>
                        ))}
                        <span style={{ 
                          color: 'var(--stone-gray)', 
                          fontSize: '0.9rem',
                          marginLeft: '0.4rem'
                        }}>
                          ({recipe.avg_rating?.toFixed(1) || '0.0'})
                        </span>
                      </div>
                      
                      <span style={{ 
                        color: 'var(--stone-gray)', 
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <span>🕐</span> {recipe.prep_time + recipe.cook_time} min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/recipes" className="btn" style={{ fontSize: '1.1rem' }}>
              View All Recipes →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(135deg, var(--herb-green), var(--spice-orange))',
        padding: '5rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1.5rem'
          }}>
            Got a Recipe to Share?
          </h2>
          <p style={{ 
            fontSize: '1.2rem',
            marginBottom: '2rem',
            lineHeight: '1.7',
            opacity: 0.95
          }}>
            Your family recipe could be someone's new favorite meal. Join our community 
            of home cooks and share the dishes that make your kitchen special.
          </p>
          <Link 
            to="/register" 
            className="btn"
            style={{ 
              background: 'white',
              color: 'var(--herb-green)',
              fontSize: '1.15rem',
              border: 'none',
              fontWeight: '700'
            }}
          >
            Join Free Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;