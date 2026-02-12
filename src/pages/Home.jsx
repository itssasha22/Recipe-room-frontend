import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
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

      {/* Features Section */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>
            Why Join FlavorHub?
          </h2>
          
          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🌍</div>
              <h3>Global Recipes</h3>
              <p style={{ color: 'var(--medium-gray)' }}>
                Access authentic recipes from 23+ countries around the world
              </p>
            </div>
            
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👨‍🍳</div>
              <h3>Easy to Follow</h3>
              <p style={{ color: 'var(--medium-gray)' }}>
                Step-by-step instructions with prep times and serving sizes
              </p>
            </div>
            
            <div style={{ fontSize: '3rem', marginBottom: '20px', textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⭐</div>
              <h3>Community Rated</h3>
              <p style={{ color: 'var(--medium-gray)' }}>
                Real ratings and reviews from home cooks like you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '60px 20px', 
        background: 'var(--off-white)',
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
