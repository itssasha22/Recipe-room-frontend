import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

// Get PayD API key from environment variables
// To get your API key: https://payd.com/developers/api-keys
const PAYD_PUBLIC_KEY = import.meta.env.VITE_PAYD_PUBLIC_KEY || '';
const API_URL = API_BASE_URL;
const MOCK_MODE = !PAYD_PUBLIC_KEY;

class PayDService {
  async initiatePayment(amount, description) {
    // Mock mode when API key is not configured
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
    // Mock mode
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