import { useState } from 'react';
import PayDPayment from '../components/payment/PayDPayment';

const PremiumRecipes = () => {
  const [hasPremium, setHasPremium] = useState(false);

  const handlePaymentSuccess = (payment) => {
    setHasPremium(true);
    console.log('Payment successful:', payment);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <div className="premium-recipes">
      <h1>Premium Recipes</h1>
      
      {!hasPremium ? (
        <div className="premium-access">
          <h2>Unlock Premium Recipes</h2>
          <p>Get access to exclusive chef recipes and advanced features</p>
          <ul>
            <li>500+ Premium Recipes</li>
            <li>Video Tutorials</li>
            <li>Meal Planning</li>
            <li>Ad-free Experience</li>
          </ul>
          
          <PayDPayment
            amount={9.99}
            description="Premium Recipe Access"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      ) : (
        <div className="premium-content">
          <h2>Welcome to Premium!</h2>
          <p>You now have access to all premium recipes.</p>
        </div>
      )}
    </div>
  );
};

export default PremiumRecipes;