import { Link } from 'react-router-dom';

const Home = () => {
  const featuredRecipes = [
    {
      title: 'Chapatti & Beef Stew',
      image: 'https://i.pinimg.com/736x/63/a6/65/63a6659d40c699abb63d3d9f5cbdd6f6.jpg',
      description: 'Traditional comfort food at its finest'
    },
    {
      title: 'Swahili Pilau',
      image: 'https://i.pinimg.com/736x/83/63/6e/83636e0b1a2c91568ac18268c9055676.jpg',
      description: 'Aromatic spiced rice with tender meat'
    },
    {
      title: 'Pan-Fried Fish',
      image: 'https://i.pinimg.com/1200x/15/30/e4/1530e4c9cc16b1777092a1e358c62de7.jpg',
      description: 'Crispy golden fish with fresh herbs'
    }
  ];

  return (
    <div style={{ paddingTop: '0' }}>
      {/* Hero Section - RecipeTin Eats Style with Large Image */}
      <section className="hero-section">
        <img 
          src="https://i.pinimg.com/736x/63/a6/65/63a6659d40c699abb63d3d9f5cbdd6f6.jpg"
          alt="Chapatti & Beef Stew"
          className="hero-background"
        />
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-panel">
            <h1 className="hero-title">Chapatti & Beef Stew</h1>
            <p className="hero-subtitle">
              The soul-warming dish that brings families together. Tender beef in rich gravy, paired with soft, flaky chapattis.
            </p>
            <div className="hero-buttons">
              <Link to="/recipes" className="btn btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
                GET THE RECIPE →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Craving Section */}
      <section className="craving-section">
        <div className="container">
          <div className="craving-header">
            <img 
              src="/flavorhub-logo.png" 
              alt="FlavorHub" 
              className="craving-avatar"
            />
            <h2 className="craving-title">WHAT I'M CRAVING</h2>
          </div>
          
          <div className="grid-3">
            {featuredRecipes.map((recipe, index) => (
              <Link to="/recipes" key={index} style={{ textDecoration: 'none' }}>
                <div className="recipe-card">
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="recipe-card-content">
                    <h3 className="recipe-card-title">{recipe.title}</h3>
                    <p className="recipe-card-meta">{recipe.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Subscription Section */}
      <section className="section-padding" style={{ 
        background: 'linear-gradient(135deg, #ff6347 0%, #ff9a56 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '20px', fontWeight: '800' }}>Go Premium</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
            Unlock exclusive recipes, meal plans, and ad-free browsing with FlavorHub Premium
          </p>
          <div className="grid-3" style={{ maxWidth: '900px', margin: '40px auto', textAlign: 'left' }}>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              padding: '30px', 
              backdropFilter: 'blur(10px)',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🔓</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '700', color: 'white' }}>Exclusive Recipes</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}>
                Access premium recipes from top chefs worldwide
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              padding: '30px', 
              backdropFilter: 'blur(10px)',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📅</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '700', color: 'white' }}>Meal Planning</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}>
                Weekly meal plans with automatic shopping lists
              </p>
            </div>

            <div style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              padding: '30px', 
              backdropFilter: 'blur(10px)',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚫</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: '700', color: 'white' }}>Ad-Free Experience</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}>
                Enjoy distraction-free cooking experience
              </p>
            </div>
          </div>
          <Link to="/premium" className="btn" style={{ 
            background: 'white',
            color: '#ff6347',
            fontSize: '16px',
            padding: '14px 40px',
            fontWeight: '800',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            UPGRADE TO PREMIUM →
          </Link>
        </div>
      </section>

      {/* Simple Features */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why FlavorHub?</h2>
            <p className="section-subtitle">Join thousands of home cooks worldwide</p>
          </div>
          
          <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌍</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '700' }}>Global Recipes</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-gray)' }}>
                Discover authentic dishes from 23+ countries
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚡</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '700' }}>Quick & Easy</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-gray)' }}>
                Step-by-step guides for perfect results
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⭐</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: '700' }}>Community Rated</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-gray)' }}>
                Real reviews from home cooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ 
        background: 'linear-gradient(135deg, var(--dark-navy), var(--navy-blue))', 
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '20px', color: 'white', fontSize: '2rem' }}>Ready to Start Cooking?</h2>
          <p style={{ 
            fontSize: '1.1rem',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            Join FlavorHub today and discover recipes that will transform your kitchen
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary">Sign Up Free</Link>
            <Link to="/login" className="btn btn-secondary">Sign In</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
