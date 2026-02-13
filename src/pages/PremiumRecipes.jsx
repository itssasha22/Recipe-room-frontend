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
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {!hasPremium ? (
        <div>
          {/* Hero Section */}
          <section style={{ 
            background: 'white',
            borderBottom: '1px solid var(--border-gray)',
            padding: '60px 20px',
            textAlign: 'center'
          }}>
            <div className="container" style={{ maxWidth: '700px' }}>
              <div style={{ 
                display: 'inline-block',
                background: 'var(--primary-orange)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                marginBottom: '20px'
              }}>
                ⭐ PREMIUM ACCESS
              </div>
              <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>
                Unlock Premium Recipes
              </h1>
              <p style={{ fontSize: '15px', marginBottom: '25px', color: 'var(--text-gray)' }}>
                Take your cooking to the next level with exclusive chef recipes
              </p>
              <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                <span style={{ fontWeight: '700' }}>$9.99</span>
                <span style={{ fontSize: '1rem', color: 'var(--light-gray)' }}> / month</span>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section style={{ padding: '50px 20px' }}>
            <div className="container">
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '40px',
                fontSize: '1.5rem'
              }}>
                What's Included
              </h2>
              
              <div className="grid-3" style={{ marginBottom: '50px' }}>
                {premiumFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '25px',
                      background: 'white',
                      border: '1px solid var(--border-gray)',
                      textAlign: 'center'
                    }}
                    className="hover-card"
                  >
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: 'var(--light-gray)', fontSize: '13px' }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              <div style={{ 
                maxWidth: '500px', 
                margin: '0 auto',
                background: 'white',
                border: '1px solid var(--border-gray)',
                padding: '30px'
              }}>
                <h3 style={{ 
                  textAlign: 'center', 
                  marginBottom: '20px',
                  fontSize: '1.25rem'
                }}>
                  Subscribe Now
                </h3>
                
                {paymentError && (
                  <div style={{ 
                    background: '#fee', 
                    border: '1px solid var(--danger-red)',
                    color: 'var(--danger-red)',
                    padding: '12px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    textAlign: 'center'
                  }}>
                    {paymentError}
                  </div>
                )}

                <PayDPayment 
                  onSuccess={handlePaymentSuccess} 
                  onError={handlePaymentError} 
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* Premium Access Granted */
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-gray)' }}>
          <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>
              Welcome to Premium!
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-gray)', marginBottom: '30px' }}>
              You now have access to all premium features
            </p>
            
            <div style={{ 
              background: 'var(--off-white)',
              padding: '30px',
              border: '1px solid var(--border-gray)',
              marginTop: '40px',
              maxWidth: '600px',
              margin: '40px auto 0'
            }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Your Premium Benefits</h2>
              <ul style={{ 
                textAlign: 'left', 
                fontSize: '14px',
                lineHeight: '2',
                listStyle: 'none',
                padding: 0
              }}>
                {premiumFeatures.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <span style={{ marginRight: '10px' }}>{feature.icon}</span>
                    <strong>{feature.title}</strong> - {feature.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
              <button 
                onClick={() => {
                  localStorage.removeItem('premium_access');
                  setHasPremium(false);
                }}
                className="btn-secondary"
                style={{ marginRight: '10px' }}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumRecipes;
