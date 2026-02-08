import axios from 'axios';



const PAYD_PUBLIC_KEY = import.meta.env.VITE_PAYD_PUBLIC_KEY || '';
const API_URL = import.meta.env.VITE_API_URL || 'http:
const MOCK_MODE = !PAYD_PUBLIC_KEY;

class PayDService {
  async initiatePayment(amount, description) {
    
    if (MOCK_MODE) {
      console.warn('PayD API key not configured. Using mock payment.');
      return {
        success: true,
        paymentId: 'mock_' + Date.now(),
        message: 'Mock payment initiated (configure VITE_PAYD_PUBLIC_KEY in .env)'
      };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/payments/initiate`, {
        amount,
        description,
        paydApiKey: PAYD_PUBLIC_KEY
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Payment initialization failed');
    }
  }

  async getPaymentStatus(paymentId) {
    
    if (MOCK_MODE) {
      return { status: 'completed', paymentId };
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/payments/status/${paymentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Payment status check failed');
    }
  }
}

export default new PayDService();