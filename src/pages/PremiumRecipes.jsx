import { useState } from 'react';
import PayDPayment from '../components/payment/PayDPayment';

const PremiumRecipes = () => {
  const [hasPremium, setHasPremium] = useState(
    localStorage.getItem('premium_access') === 'true'
  );
  const [paymentError, setPaymentError] = useState('');

  const handlePaymentSuccess = (payment) => {
    setHasPremium(true);
    localStorage.setItem('premium_access', 'true');
    console.log('Payment successful:', payment);
  };

  const handlePaymentError = (error) => {
    setPaymentError(error);
    console.error('Payment failed:', error);
  };

  const premiumFeatures = [
    { icon: '📚', title: '500+ Premium Recipes', desc: 'Exclusive recipes from professional chefs' },
    { icon: '🎥', title: 'Video Tutorials', desc: 'Step-by-step cooking videos' },
    { icon: '📅', title: 'Meal Planning', desc: 'Plan your weekly meals effortlessly' },
    { icon: '🎯', title: 'Ad-free Experience', desc: 'Enjoy cooking without distractions' },
    { icon: '💾', title: 'Offline Access', desc: 'Download recipes for offline use' },
    { icon: '👥', title: 'Private Community', desc: 'Join exclusive cooking groups' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream-bg)' }}>
      {!hasPremium ? (
        <div>
          {/* Hero Section */}
          <section style={{ 
            background: 'linear-gradient(135deg, var(--olive-green), var(--warm-brown))',
            padding: '80px 20px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div className="container">
              <div style={{ 
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '1px',
                marginBottom: '20px'
              }}>
                ⭐ PREMIUM ACCESS
              </div>
              <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: 'white' }}>
                Unlock Premium Recipes
              </h1>
              <p style={{ fontSize: '1.3rem', marginBottom: '30px', color: 'rgba(255, 255, 255, 0.9)' }}>
                Take your cooking to the next level with exclusive chef recipes
              </p>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                <span style={{ fontWeight: '700', fontSize: '2.5rem' }}>$9.99</span>
                <span style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.8)' }}> / month</span>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section style={{ padding: '60px 20px', background: 'white' }}>
            <div className="container">
              <h2 style={{ textAlign: 'center', marginBottom: '50px', color: 'var(--warm-brown)' }}>
                What's Included
              </h2>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px',
                marginBottom: '50px'
              }}>
                {premiumFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '30px',
                      background: 'var(--cream-bg)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease',
                      border: '2px solid var(--border-gray)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ marginBottom: '10px', color: 'var(--warm-brown)' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--medium-gray)', fontSize: '0.95rem' }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '40px',
                background: 'var(--cream-bg)',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px solid var(--rust-orange)'
              }}>
                <h3 style={{ marginBottom: '20px', color: 'var(--warm-brown)' }}>
                  Get Started Today
                </h3>
                <p style={{ color: 'var(--medium-gray)', marginBottom: '25px' }}>
                  Secure payment powered by PayD
                </p>
                
                <PayDPayment
                  amount={9.99}
                  description="Premium Recipe Access"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />

                {paymentError && (
                  <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    background: '#ffebee',
                    color: '#c62828',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}>
                    {paymentError}
                  </div>
                )}

                <p style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--medium-gray)', 
                  marginTop: '20px' 
                }}>
                  🔒 Secure payment • Cancel anytime • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section style={{ padding: '60px 20px', background: 'var(--cream-bg)' }}>
            <div className="container">
              <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>
                What Our Premium Members Say
              </h2>
              
              <div className="grid-3" style={{ gap: '30px' }}>
                <div style={{ 
                  padding: '25px',
                  background: 'white',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--rust-orange)'
                }}>
                  <div style={{ marginBottom: '15px', color: 'var(--rust-orange)' }}>
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p style={{ color: 'var(--medium-gray)', marginBottom: '15px', fontStyle: 'italic' }}>
                    "The video tutorials are amazing! I've learned so many new techniques."
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--warm-brown)' }}>
                    - Sarah M., Nairobi
                  </p>
                </div>

                <div style={{ 
                  padding: '25px',
                  background: 'white',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--rust-orange)'
                }}>
                  <div style={{ marginBottom: '15px', color: 'var(--rust-orange)' }}>
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p style={{ color: 'var(--medium-gray)', marginBottom: '15px', fontStyle: 'italic' }}>
                    "Premium recipes are absolutely worth it. My family loves every dish!"
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--warm-brown)' }}>
                    - John K., Mombasa
                  </p>
                </div>

                <div style={{ 
                  padding: '25px',
                  background: 'white',
                  borderRadius: '8px',
                  borderLeft: '4px solid var(--rust-orange)'
                }}>
                  <div style={{ marginBottom: '15px', color: 'var(--rust-orange)' }}>
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p style={{ color: 'var(--medium-gray)', marginBottom: '15px', fontStyle: 'italic' }}>
                    "The meal planning feature saves me hours every week. Game changer!"
                  </p>
                  <p style={{ fontWeight: '600', color: 'var(--warm-brown)' }}>
                    - Grace W., Kisumu
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section style={{ padding: '80px 20px', textAlign: 'center' }}>
          <div className="container">
            <div style={{ 
              maxWidth: '600px',
              margin: '0 auto',
              padding: '50px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
              <h1 style={{ marginBottom: '20px', color: 'var(--warm-brown)' }}>
                Welcome to Premium!
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--medium-gray)', marginBottom: '30px' }}>
                You now have access to all premium recipes and features.
              </p>
              <div style={{ 
                padding: '20px',
                background: 'var(--cream-bg)',
                borderRadius: '8px',
                marginBottom: '30px'
              }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--medium-gray)' }}>
                  ✅ 500+ Premium Recipes<br />
                  ✅ Video Tutorials<br />
                  ✅ Meal Planning Tools<br />
                  ✅ Ad-free Experience<br />
                  ✅ Offline Access<br />
                  ✅ Private Community
                </p>
              </div>
              <a 
                href="/recipes" 
                className="btn btn-primary"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                Browse Premium Recipes
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PremiumRecipes;
