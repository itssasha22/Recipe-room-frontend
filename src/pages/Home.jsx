import { Link } from 'react-router-dom';

const Home = () => {
  const contributors = [
    { name: 'Derrick Koome', country: 'Kenya', role: 'Kenyan Cuisine Specialist' },
    { name: 'Sasha Lisha', country: 'Kenya', role: 'Coastal Recipes Expert' },
    { name: 'Ian Nassore', country: 'Kenya', role: 'Traditional Chef' },
    { name: 'Alex Mureti', country: 'Kenya', role: 'Nyama Choma Master' },
    { name: 'Joy Kori', country: 'Kenya', role: 'Pastry & Baking Chef' }
  ];

  return (
    <div>
      {/* Hero Section with Logo */}
      <section className="hero-section">
        <div className="container">
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
            <img src="/flavorhub-logo.png" alt="FlavorHub Logo" style={{ height: '120px', width: 'auto' }} />
          </div>
          <h1 className="hero-title">Welcome to FlavorHub</h1>
          <p className="hero-subtitle" style={{ letterSpacing: '2px', fontWeight: '500' }}>
            TASTE THE WORLD
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
            <Link to="/register" className="btn btn-primary">
              Join Free Today
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipe Images Section */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--warm-brown)' }}>
            Discover Authentic Flavors
          </h2>
          <div className="grid-3" style={{ gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                height: '220px', 
                background: 'linear-gradient(135deg, #ff9a56, #ff6b35)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                marginBottom: '15px'
              }}>
                🍛
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>African Cuisine</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                Traditional dishes from Kenya, Nigeria, Ethiopia & more
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                height: '220px', 
                background: 'linear-gradient(135deg, #4CAF50, #2d6a4f)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                marginBottom: '15px'
              }}>
                🍜
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Asian Flavors</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                Authentic recipes from Thailand, India, Japan & China
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                height: '220px', 
                background: 'linear-gradient(135deg, #e74c3c, #c0392b)', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                marginBottom: '15px'
              }}>
                🥘
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Mediterranean</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                Delicious dishes from Italy, Greece, Spain & Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 20px', background: 'var(--cream-bg)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>
            Why Join FlavorHub?
          </h2>
          
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌍</div>
              <h3>Global Recipes</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '1rem' }}>
                Access authentic recipes from 23+ countries around the world
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍🍳</div>
              <h3>Easy to Follow</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '1rem' }}>
                Step-by-step instructions with prep times and serving sizes
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⭐</div>
              <h3>Community Rated</h3>
              <p style={{ color: 'var(--medium-gray)', fontSize: '1rem' }}>
                Real ratings and reviews from home cooks like you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Feature Section */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ff6b35, #ff9a56)',
            padding: '4px 16px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '1px',
            marginBottom: '20px'
          }}>
            PREMIUM FEATURE
          </div>
          <h2 style={{ marginBottom: '20px' }}>Unlock Exclusive Chef Recipes</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--medium-gray)',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            Get access to premium recipes from professional chefs with PayD secure payment
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '2.5rem' }}>🔒</div>
            <div style={{ fontSize: '2.5rem' }}>👨‍🍳</div>
            <div style={{ fontSize: '2.5rem' }}>📚</div>
            <div style={{ fontSize: '2.5rem' }}>💳</div>
          </div>
          <p style={{ marginTop: '20px', color: 'var(--medium-gray)', fontSize: '0.9rem' }}>
            Secure payments powered by <strong>PayD</strong> - Your trusted payment partner
          </p>
        </div>
      </section>

      {/* Featured Chefs Section */}
      <section style={{ padding: '60px 20px', background: 'var(--warm-brown)', color: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '15px', color: 'white' }}>
            Featured Chefs
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '40px', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem' }}>
            Discover authentic recipes from our talented Kenyan chefs 🇰🇪
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {contributors.map((contributor, index) => (
              <div 
                key={index}
                style={{ 
                  textAlign: 'center',
                  padding: '25px 15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease, background 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                  👨‍🍳
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '5px', color: 'white' }}>
                  {contributor.name}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--rust-orange)',
                  fontWeight: '600',
                  marginBottom: '5px'
                }}>
                  {contributor.role}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  📍 {contributor.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '60px 20px', 
        background: 'var(--cream-bg)',
        textAlign: 'center' 
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '20px' }}>Ready to Start Cooking?</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--medium-gray)',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            Join our community of food lovers and discover your next favorite recipe
          </p>
          <Link to="/register" className="btn btn-primary">
            Sign Up - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
