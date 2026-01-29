import axios from 'axios';

const PAYD_API_URL = process.env.REACT_APP_PAYD_API_URL || 'https://api.payd.com';
const PAYD_PUBLIC_KEY = process.env.REACT_APP_PAYD_PUBLIC_KEY;

class PayDService {
  async initializePayment(amount, currency = 'USD', description) {
    try {
      const response = await axios.post(`${PAYD_API_URL}/payments/initialize`, {
        amount,
        currency,
        description,
        public_key: PAYD_PUBLIC_KEY
      });
      return response.data;
    } catch (error) {
      throw new Error('Payment initialization failed');
    }
  }

  async verifyPayment(paymentId) {
    try {
      const response = await axios.get(`${PAYD_API_URL}/payments/${paymentId}/verify`);
      return response.data;
    } catch (error) {
      throw new Error('Payment verification failed');
    }
  }
}

export default new PayDService();