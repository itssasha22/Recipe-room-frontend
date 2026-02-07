import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class PayDService {
  async initiatePayment(amount, description) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/payments/initiate`, {
        amount,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error('Payment initialization failed');
    }
  }

  async getPaymentStatus(paymentId) {
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