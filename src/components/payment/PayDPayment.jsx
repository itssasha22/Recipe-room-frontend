import { useState } from 'react';
import paydService from '../../services/paydService';

const PayDPayment = ({ amount, description, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payment = await paydService.initializePayment(amount, 'USD', description);
      
      // Redirect to PayD payment page
      window.location.href = payment.payment_url;
      
      onSuccess(payment);
    } catch (error) {
      onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payd-payment">
      <button 
        onClick={handlePayment} 
        disabled={loading}
        className="pay-button"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </div>
  );
};

export default PayDPayment;