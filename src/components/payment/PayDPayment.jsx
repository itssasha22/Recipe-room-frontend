import { useState } from 'react';
import paydService from '../../services/paydService';

const PayDPayment = ({ amount = 9.99, description = 'FlavorHub Premium Subscription', onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payment = await paydService.initializePayment(amount, 'USD', description);
      
      if (payment.payment_url) {
        window.location.href = payment.payment_url;
      } else {
        onSuccess(payment);
      }
    } catch (error) {
      onError(error.response?.data?.error || error.message || 'Payment failed');
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