import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import paydService from '../services/paydService';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  
  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    
    if (paymentId) {
      verifyPayment(paymentId);
    }
  }, [searchParams]);

  const verifyPayment = async (paymentId) => {
    try {
      const result = await paydService.verifyPayment(paymentId);
      if (result.status === 'success') {
        setStatus('success');
      } else {
        setStatus('failed');
      }
    } catch (error) {
      setStatus('failed');
    }
  };

  return (
    <div className="payment-result">
      {status === 'verifying' && <p>Verifying payment...</p>}
      {status === 'success' && (
        <div>
          <h2>Payment Successful!</h2>
          <p>You now have access to premium features.</p>
        </div>
      )}
      {status === 'failed' && (
        <div>
          <h2>Payment Failed</h2>
          <p>Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;